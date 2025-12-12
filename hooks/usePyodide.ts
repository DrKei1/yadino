
import { useState, useEffect } from 'react';
import { ConsoleOutput } from '../types';

interface Pyodide {
  runPython: (code: string) => any;
  runPythonAsync: (code: string) => Promise<any>;
  loadPackage: (packages: string[]) => Promise<void>;
  pyimport: (pkg: string) => any;
  setStdout: (options: { batched: (output: string) => void }) => void;
  setStderr: (options: { batched: (output: string) => void }) => void;
}

declare global {
  interface Window {
    loadPyodide: (options?: { indexURL?: string }) => Promise<Pyodide>;
  }
}

// Global variable to store the promise. This ensures loadPyodide is called only once.
let pyodidePromise: Promise<Pyodide> | null = null;

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<Pyodide | null>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // If the download hasn't started yet, start it now.
        if (!pyodidePromise) {
             pyodidePromise = window.loadPyodide();
        }
        
        // Wait for the download/initialization to finish (or use the already loaded instance)
        const pyodideInstance = await pyodidePromise;
        
        // Only update state if component is still mounted (React best practice, though less critical with singleton)
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
        // If loading fails, reset the promise so we can try again later if needed
        pyodidePromise = null; 
      } finally {
        setIsPyodideLoading(false);
      }
    };
    load();
  }, []);

  const runPython = async (code: string): Promise<ConsoleOutput[]> => {
    if (!pyodide) {
      return [{ type: 'error', text: 'Pyodide is not loaded yet.' }];
    }

    const output: ConsoleOutput[] = [];
    
    pyodide.setStdout({
      batched: (stdout: string) => {
        if (stdout) output.push({ type: 'log', text: stdout });
      },
    });

    pyodide.setStderr({
      batched: (stderr: string) => {
        if (stderr) output.push({ type: 'error', text: stderr });
      },
    });

    try {
      await pyodide.runPythonAsync(code);
    } catch (error: any) {
        // This catches syntax errors and other exceptions during execution
        output.push({ type: 'error', text: error.message });
    }
    
    pyodide.setStdout({ batched: () => {} });
    pyodide.setStderr({ batched: () => {} });

    return output;
  };

  return { pyodide, isPyodideLoading, runPython };
};