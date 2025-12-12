
import React from 'react';
import { ChapterItem, ConsoleOutput, LessonContent } from '../types';
import { uiStrings } from '../constants';
import { Play, Terminal, Lightbulb, ShieldAlert, BotMessageSquare, X } from 'lucide-react';
import LessonContentView from './LessonContentView';
import QuizComponent from './QuizComponent';
import PracticalAssignmentComponent from './PracticalAssignmentComponent';
import TextFormatter from '../utils/TextFormatter'; // Import TextFormatter

interface EditorPanelProps {
  activeItem: ChapterItem;
  editorCode: string;
  setEditorCode: (code: string) => void;
  consoleOutput: ConsoleOutput[];
  onRunCode: (code?: string) => Promise<ConsoleOutput[]>;
  isPyodideLoading: boolean;
  onAiAction: (action: 'debug' | 'hint') => void;
  aiResponse: string;
  aiLoading: boolean;
  aiError: string;
  hasError: boolean;
  onCloseAiPanel: () => void;
  pyodide: any;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center gap-2 text-slate-400">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
        {uiStrings.aiLoading}
    </div>
);


const EditorPanel: React.FC<EditorPanelProps> = ({
  activeItem,
  editorCode,
  setEditorCode,
  consoleOutput,
  onRunCode,
  isPyodideLoading,
  onAiAction,
  aiResponse,
  aiLoading,
  aiError,
  hasError,
  onCloseAiPanel,
  pyodide,
}) => {
  const showAiPanel = aiLoading || !!aiError || !!aiResponse;
  const isLessonType = activeItem.type === 'lesson';
  const isPracticalType = activeItem.type === 'practical';

  const renderCurrentItemContent = () => {
    switch (activeItem.type) {
      case 'lesson':
        return (
          // LessonContentView now renders the lesson content text, which uses TextFormatter internally
          <LessonContentView lesson={activeItem as LessonContent} /> 
        );
      case 'quiz':
        return <QuizComponent quiz={activeItem} />;
      case 'practical':
        return (
          <PracticalAssignmentComponent
            assignment={activeItem}
            editorCode={editorCode}
            setEditorCode={setEditorCode}
            consoleOutput={consoleOutput}
            onRunCode={onRunCode}
            pyodide={pyodide}
            isPyodideLoading={isPyodideLoading}
          />
        );
      default:
        return <p>نوع محتوا نامشخص است.</p>;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Dynamic Content Area (Lesson, Quiz, Practical) */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-3 text-purple-600 dark:text-purple-400">{activeItem.title}</h2>
        {renderCurrentItemContent()}

        {/* Removed Lesson Hint from here. Hints are now exclusively in the AI Assistant Panel. */}
      </div>

      {/* Code Editor and Run Button for LESSONS ONLY */}
      {isLessonType && (
        <div className="flex-grow flex flex-col p-4 relative">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                ویرایشگر کد
            </h3>
            <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                className="w-full h-48 md:h-64 bg-dark-surface border border-slate-700/80 rounded-lg p-4 font-mono text-sm text-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-left transition"
                spellCheck="false"
                dir="ltr"
                placeholder="کد پایتون خود را اینجا بنویسید..."
            />
            <div className="mt-4">
                <button
                    onClick={() => onRunCode()}
                    disabled={isPyodideLoading}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 disabled:from-slate-600 disabled:to-slate-700 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-dark-bg focus:ring-purple-500"
                >
                    {isPyodideLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            {uiStrings.pyodideLoading}
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5"/>
                            {uiStrings.runCode}
                        </>
                    )}
                </button>
            </div>
        </div>
      )}

      {/* AI Response and Console - Always visible */}
      <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 p-4 space-y-4">
        {/* AI Assistant Buttons (always visible for relevant item types) */}
        {(isLessonType || isPracticalType || activeItem.type === 'quiz') && (
            <div className="flex flex-wrap items-center gap-3">
                <button
                onClick={() => onAiAction('hint')}
                disabled={aiLoading}
                className="flex items-center justify-center gap-2 p-2 bg-slate-200 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                <Lightbulb className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                {uiStrings.getHint}
                </button>
                {(isLessonType || isPracticalType) && ( // Only show debug for editable code (lessons/practicals)
                    <button
                        onClick={() => onAiAction('debug')}
                        disabled={aiLoading || !hasError}
                        className="flex items-center justify-center gap-2 p-2 bg-slate-200 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        <ShieldAlert className="w-4 h-4 text-red-500 dark:text-red-400" />
                        {uiStrings.explainError}
                    </button>
                )}
            </div>
        )}

        {/* AI Response Area (Conditional) */}
        {showAiPanel && (
            <div className="bg-slate-200/50 dark:bg-dark-surface rounded-lg p-4 border border-slate-300 dark:border-slate-700/80 animate-fade-in">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-purple-600 dark:text-purple-400">
                        <BotMessageSquare className="w-5 h-5" />
                        {uiStrings.aiAssistant}
                    </h3>
                    <button 
                        onClick={onCloseAiPanel}
                        className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
                        aria-label={uiStrings.close}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {aiLoading ? (
                    <LoadingSpinner />
                ) : aiError ? (
                    <p className="text-red-500 dark:text-red-400">{aiError}</p>
                ) : (
                    // Use TextFormatter for aiResponse here
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed"><TextFormatter text={aiResponse} /></p>
                )}
            </div>
        )}

        {/* Console Output (Always visible) */}
        <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Terminal className="w-5 h-5"/>
                {uiStrings.console}
            </h3>
            <pre className="bg-dark-surface rounded-lg p-4 h-32 overflow-y-auto text-sm font-mono whitespace-pre-wrap border border-slate-700/80">
              {consoleOutput.map((line, index) => (
                <div key={index} className={line.type === 'error' ? 'text-red-400' : 'text-slate-300'}>
                    {line.text}
                </div>
              ))}
            </pre>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;