
import React, { useState, useEffect } from 'react';
import { ConsoleOutput } from '../types';
import { usePyodide } from '../hooks/usePyodide';
import { Play, Terminal, Sun, Moon, BookText } from 'lucide-react'; // Changed BookCopy to BookText
import { uiStrings } from '../constants'; // Import uiStrings for consistency

const PlaygroundPage: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('light');
    const [editorCode, setEditorCode] = useState('# به زمین بازی پایتون خوش آمدید\n# هر کدی که دوست دارید اینجا بنویسید و اجرا کنید\n\nfor i in range(5):\n    print(f"شماره {i}")');
    const [consoleOutput, setConsoleOutput] = useState<ConsoleOutput[]>([]);
    const { isPyodideLoading, runPython } = usePyodide();

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const handleRunCode = async () => {
        setConsoleOutput([{ type: 'info', text: uiStrings.runningCode }]);
        const output = await runPython(editorCode);
        setConsoleOutput(output);
    };

    const handleThemeToggle = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100 dark:bg-dark-bg font-persian">
            {/* Header */}
            <header className="flex items-center justify-between p-3 bg-slate-100/80 dark:bg-dark-bg/50 backdrop-blur-lg border-b border-slate-300/50 dark:border-slate-700/50 shadow-md flex-shrink-0 z-10">
                <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    زمین بازی پایتون
                </h1>
                <div className="flex items-center gap-2">
                    <a
                        href="#"
                        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-dark-bg focus:ring-purple-500"
                        aria-label="بازگشت به درس‌ها"
                    >
                         <BookText className="h-5 w-5 text-purple-500" />
                        <span>بازگشت به درس‌ها</span>
                    </a>
                    <button
                        onClick={handleThemeToggle}
                        className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-dark-bg focus:ring-purple-500"
                        aria-label={theme === 'dark' ? 'فعال‌سازی حالت روشن' : 'فعال‌سازی حالت تاریک'}
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-purple-500" />}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
                {/* Editor Section */}
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold text-slate-600 dark:text-slate-300">ویرایشگر کد</h2>
                        <button
                            onClick={handleRunCode}
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
                                    اجرا
                                </>
                            )}
                        </button>
                    </div>
                    <textarea
                        value={editorCode}
                        onChange={(e) => setEditorCode(e.target.value)}
                        className="w-full h-full flex-grow bg-dark-surface border border-slate-700/80 rounded-lg p-4 font-mono text-sm text-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-left transition"
                        spellCheck="false"
                        dir="ltr"
                    />
                </div>

                {/* Console Section */}
                <div className="h-48 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Terminal className="w-5 h-5"/>
                        کنسول
                    </h3>
                    <pre className="bg-dark-surface rounded-lg p-4 h-full overflow-y-auto text-sm font-mono whitespace-pre-wrap border border-slate-700/80 flex-grow">
                      {consoleOutput.map((line, index) => (
                        <div key={index} className={line.type === 'error' ? 'text-red-400' : 'text-slate-300'}>
                            {line.text}
                        </div>
                      ))}
                    </pre>
                </div>
            </main>
        </div>
    );
};

export default PlaygroundPage;