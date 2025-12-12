
import React, { useState, useEffect } from 'react';
import { PracticalAssignment, ConsoleOutput } from '../types';
import { uiStrings } from '../constants';
import { Play } from 'lucide-react';
import TextFormatter from '../utils/TextFormatter'; // Import TextFormatter

interface PracticalAssignmentComponentProps {
  assignment: PracticalAssignment;
  editorCode: string;
  setEditorCode: (code: string) => void;
  consoleOutput: ConsoleOutput[];
  onRunCode: (code: string) => Promise<ConsoleOutput[]>;
  pyodide: any;
  isPyodideLoading: boolean;
}

const PracticalAssignmentComponent: React.FC<PracticalAssignmentComponentProps> = ({
  assignment,
  editorCode,
  setEditorCode,
  consoleOutput,
  onRunCode,
  pyodide,
  isPyodideLoading,
}) => {
  const [testResult, setTestResult] = useState<'pass' | 'fail' | null>(null);
  const [testMessage, setTestMessage] = useState<string>('');

  useEffect(() => {
    // Reset test result when a new assignment is loaded
    setTestResult(null);
    setTestMessage('');
    setEditorCode(assignment.initialCode); // Ensure editor has initial code
  }, [assignment, setEditorCode]);

  const handleCheckCode = async () => {
    if (!pyodide || isPyodideLoading) return;

    setTestResult(null);
    setTestMessage('');

    // The testCode from lessons.ts is designed to wrap the user's code
    // and handle its own mocking of print/input internally,
    // finally printing "TEST_PASSED" or "TEST_FAILED" to the actual console.
    const fullCodeToRun = assignment.testCode.replace('\x7buser_code_placeholder\x7d', editorCode);
    
    // Execute the combined code (test harness + user's code)
    const outputs = await onRunCode(fullCodeToRun);

    // Analyze the outputs from the combined execution
    const passed = outputs.some(o => o.text.includes("TEST_PASSED"));
    const failed = outputs.some(o => o.text.includes("TEST_FAILED"));

    if (passed) {
      setTestResult('pass');
      setTestMessage(uiStrings.codeCorrect);
    } else if (failed) {
      setTestResult('fail');
      // Extract specific failure messages if available in testOutputs (excluding the TEST_FAILED marker itself)
      const failureMessages = outputs
        .filter(o => o.type === 'error' || (o.text.includes("TEST_FAILED") && !o.text.includes(uiStrings.codeIncorrect)))
        .map(o => o.text.replace("TEST_FAILED: ", "")) // Clean up the TEST_FAILED prefix for display
        .join('\n');
      setTestMessage(`${uiStrings.codeIncorrect}\n${failureMessages}`);
    } else {
        setTestResult('fail');
        setTestMessage(`${uiStrings.codeIncorrect}\nخروجی تست نامشخص بود. لطفاً کد خود را بررسی کنید.`);
    }
    // The consoleOutput state is already updated by onRunCode in App.tsx
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap"><TextFormatter text={assignment.description} /></p>
      
      {assignment.expectedOutputExample && (
        <div className="bg-slate-200/50 dark:bg-slate-800 rounded-lg p-4 border border-slate-300 dark:border-slate-700">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">{uiStrings.expectedOutputExample}</h4>
            {/* expectedOutputExample is typically code-like, so keeping it plain text monospace */}
            <pre className="text-sm font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{assignment.expectedOutputExample}</pre>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <textarea
          value={editorCode}
          onChange={(e) => setEditorCode(e.target.value)}
          className="w-full h-48 md:h-64 bg-dark-surface border border-slate-700/80 rounded-lg p-4 font-mono text-sm text-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-left transition"
          spellCheck="false"
          dir="ltr"
          placeholder="کد پایتون خود را اینجا بنویسید..."
        />
        <button
          onClick={handleCheckCode}
          disabled={isPyodideLoading}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-md hover:from-emerald-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105 disabled:from-slate-600 disabled:to-slate-700 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-dark-bg focus:ring-emerald-500"
        >
          {isPyodideLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              {uiStrings.pyodideLoading}
            </>
          ) : (
            <>
              <Play className="w-5 h-5"/>
              {uiStrings.checkCode}
            </>
          )}
        </button>
      </div>

      {testResult && (
        <div className={`p-4 rounded-lg animate-fade-in ${
          testResult === 'pass' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700' :
          'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700'
        }`}>
          <p className="font-semibold whitespace-pre-wrap">{testMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PracticalAssignmentComponent;