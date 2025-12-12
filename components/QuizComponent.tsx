
import React, { useState, useEffect } from 'react';
import { Quiz, QuizQuestion } from '../types';
import { uiStrings } from '../constants';
import TextFormatter from '../utils/TextFormatter'; // Import TextFormatter

interface QuizComponentProps {
  quiz: Quiz;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    // Reset quiz state when a new quiz is loaded
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  }, [quiz]);

  const currentQuestion: QuizQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (!submitted) {
      setSelectedOptionIndex(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOptionIndex !== null) {
      setSubmitted(true);
      if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
        setScore(prev => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const getOptionClasses = (optionIndex: number) => {
    let classes = "block w-full text-left p-3 border rounded-md transition-colors";
    if (!submitted) {
      classes += " bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer";
      if (selectedOptionIndex === optionIndex) {
        classes += " border-purple-500 dark:border-purple-400 ring-2 ring-purple-500";
      } else {
        classes += " border-slate-300 dark:border-slate-600";
      }
    } else {
      // After submission
      if (optionIndex === currentQuestion.correctAnswerIndex) {
        classes += " bg-green-500 text-white border-green-600"; // Correct answer
      } else if (selectedOptionIndex === optionIndex) {
        classes += " bg-red-500 text-white border-red-600"; // User's incorrect answer
      } else {
        classes += " bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"; // Other options
      }
      classes += " cursor-not-allowed";
    }
    return classes;
  };

  if (quizFinished) {
    return (
      <div className="bg-slate-100 dark:bg-dark-surface rounded-lg p-6 border border-slate-300 dark:border-slate-700/80 animate-fade-in text-center">
        <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">{uiStrings.quizResult}</h3>
        <p className="text-lg text-slate-700 dark:text-slate-300">
          {uiStrings.score}: {score} / {quiz.questions.length}
        </p>
        <div className="mt-4 flex justify-center gap-4">
            <p className="text-green-600 dark:text-green-400 font-semibold">{uiStrings.correct}: {score}</p>
            <p className="text-red-600 dark:text-red-400 font-semibold">{uiStrings.incorrect}: {quiz.questions.length - score}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap"><TextFormatter text={quiz.description} /></p>
      
      <div className="bg-slate-100 dark:bg-dark-surface rounded-lg p-6 border border-slate-300 dark:border-slate-700/80 animate-fade-in">
        <p className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">
          سوال {currentQuestionIndex + 1} از {quiz.questions.length}: <TextFormatter text={currentQuestion.question} />
        </p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={submitted}
              className={getOptionClasses(index)}
              aria-pressed={selectedOptionIndex === index}
            >
              <TextFormatter text={option} />
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOptionIndex === null}
              className="px-5 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-dark-bg focus:ring-indigo-500"
            >
              {uiStrings.checkAnswer}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-dark-bg focus:ring-purple-500"
            >
              {currentQuestionIndex < quiz.questions.length - 1 ? uiStrings.nextQuestion : uiStrings.showResults}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;