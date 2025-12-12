
import React, { useState, useEffect, useCallback } from 'react';
import { Chapter, ChapterItem, ConsoleOutput, LessonContent, Quiz, PracticalAssignment } from './types';
import { lessons } from './content/lessons';
import { uiStrings } from './constants';
import Header from './components/Header';
import LessonPanel from './components/LessonPanel';
import EditorPanel from './components/EditorPanel';
import { usePyodide } from './hooks/usePyodide';
import { explainError } from './services/geminiService';

// Define AIStudio interface locally to avoid global declaration conflicts.
interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0); // Renamed from activeLessonIndex
  const [editorCode, setEditorCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<ConsoleOutput[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [aiError, setAiError] = useState('');
  const [apiKeyReady, setApiKeyReady] = useState(false);

  const { pyodide, isPyodideLoading, runPython } = usePyodide();

  const activeChapter: Chapter = lessons[activeChapterIndex];
  const activeItem: ChapterItem = activeChapter.items[activeItemIndex];

  useEffect(() => {
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';
    
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  useEffect(() => {
      const checkApiKey = async () => {
          const aistudio = (window as any).aistudio as AIStudio | undefined;
          if (aistudio) {
              // In AI Studio environment, use its key management
              const hasKey = await aistudio.hasSelectedApiKey();
              setApiKeyReady(hasKey);
          } else {
              // Outside AI Studio (e.g., cPanel), check for process.env.API_KEY or window.GEMINI_API_KEY
              const hasKey = !!process.env.API_KEY || !!(window as any).GEMINI_API_KEY;
              setApiKeyReady(hasKey);
          }
      };
      checkApiKey();
  }, []);

  useEffect(() => {
    // Reset editor code and AI panel when active item changes
    if (activeItem.type === 'lesson' || activeItem.type === 'practical') {
        setEditorCode(activeItem.initialCode);
    } else {
        setEditorCode(''); // Clear editor for quizzes
    }
    setConsoleOutput([]);
    setAiResponse('');
    setAiError('');
  }, [activeItem]);

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSelectItem = (chapterIdx: number, itemIdx: number) => { // Renamed from handleSelectLesson
    setActiveChapterIndex(chapterIdx);
    setActiveItemIndex(itemIdx);
    if (window.innerWidth < 768) {
        setSidebarOpen(false);
    }
  };

  const handleRunCode = async (codeToRun: string = editorCode) => {
    if (!pyodide) return;
    setConsoleOutput([{ type: 'info', text: uiStrings.runningCode }]);
    const output = await runPython(codeToRun);
    setConsoleOutput(output);
    return output;
  };
  
  const getMostRecentError = (): string | null => {
      const error = consoleOutput.find(o => o.type === 'error');
      return error ? error.text : null;
  }

  const handleAiAction = useCallback(async (action: 'debug' | 'hint') => {
    setAiResponse('');
    setAiError('');

    if (action === 'hint') {
        // AI Assistant provides hint for current lesson/practical
        if (activeItem.type === 'lesson' || activeItem.type === 'practical') {
            setAiResponse(activeItem.hint);
        } else if (activeItem.type === 'quiz') {
            setAiResponse(activeItem.hint || uiStrings.aiWelcome); // Provide quiz hint if available
        }
        return;
    }

    // AI-powered actions start here
    setAiLoading(true);
    const aistudio = (window as any).aistudio as AIStudio | undefined;

    try {
        if (!apiKeyReady) {
            if (aistudio) {
                await aistudio.openSelectKey();
                setApiKeyReady(true); // Optimistically set to true
            } else {
                // Not in AI Studio and no key found. Guide user to set it manually.
                setAiError(uiStrings.cPanelApiKeyMissing);
                setAiLoading(false);
                return;
            }
        }

        const error = getMostRecentError();
        if (error) {
            const response = await explainError(editorCode, error);
            setAiResponse(response);
        } else {
            setAiResponse(uiStrings.noError);
        }

    } catch (err: any) {
        console.error("AI Action failed:", err);
        
        if (aistudio) {
            // AI Studio environment error handling
            if (err.message?.includes("Requested entity was not found.")) {
                setAiError(uiStrings.apiKeyError);
                setApiKeyReady(false); // Mark key as not ready for AI Studio retry
                await aistudio.openSelectKey();
                setApiKeyReady(true); // Optimistically assume success for future calls
            } else {
                setAiError(uiStrings.aiError);
                setApiKeyReady(false); // Mark key as not ready for AI Studio retry
                await aistudio.openSelectKey();
                setApiKeyReady(true); // Optimistically assume success for future calls
            }
        } else {
            // cPanel/Static Hosting environment error handling
            const hasKey = !!process.env.API_KEY || !!(window as any).GEMINI_API_KEY;
            if (!hasKey) {
                // This shouldn't happen if apiKeyReady check passed, but as a fallback
                setAiError(uiStrings.cPanelApiKeyMissing);
            } else {
                // Key is present, but API call failed. Provide specific guidance.
                const errorMessage = err.message || JSON.stringify(err);
                // Check for common API errors related to permissions/authentication
                if (errorMessage.includes("403") || errorMessage.includes("permission denied") || errorMessage.includes("authentication")) {
                    setAiError(`${uiStrings.cPanelApiCallFailedGuidance}\n\nجزئیات خطا: ${errorMessage}`);
                } else {
                    // Fallback for other errors, still include details
                    setAiError(`${uiStrings.aiError}\n\nجزئیات خطا: ${errorMessage}`);
                }
            }
        }
    } finally {
        setAiLoading(false);
    }
  }, [apiKeyReady, editorCode, getMostRecentError, activeItem]);

  const handleCloseAiPanel = () => {
    setAiResponse('');
    setAiError('');
  };

  return (
    <div className="flex flex-col h-screen">
      <Header 
        theme={theme} 
        onThemeToggle={handleThemeToggle} 
        onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1 overflow-hidden">
        <LessonPanel 
          lessons={lessons} // `lessons` now represents `chapters`
          activeItemIndex={activeItemIndex} // Renamed prop
          activeChapterIndex={activeChapterIndex}
          onSelectItem={handleSelectItem} // Renamed prop
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto">
            <EditorPanel 
                activeItem={activeItem} // Pass the active ChapterItem
                editorCode={editorCode}
                setEditorCode={setEditorCode}
                consoleOutput={consoleOutput}
                onRunCode={handleRunCode}
                isPyodideLoading={isPyodideLoading}
                onAiAction={handleAiAction}
                aiResponse={aiResponse}
                aiLoading={aiLoading}
                aiError={aiError}
                hasError={!!getMostRecentError()}
                onCloseAiPanel={handleCloseAiPanel}
                pyodide={pyodide} // Pass pyodide instance to EditorPanel for PracticalAssignment
            />
        </main>
      </div>
    </div>
  );
};

export default App;