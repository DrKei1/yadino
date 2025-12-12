
export type LocalizedString = string;

export interface LessonContent {
  type: 'lesson';
  title: LocalizedString;
  content: LocalizedString;
  initialCode: LocalizedString;
  hint: LocalizedString;
}

export interface QuizQuestion {
  question: LocalizedString;
  options: LocalizedString[];
  correctAnswerIndex: number; // 0-indexed
}

export interface Quiz {
  type: 'quiz';
  title: LocalizedString;
  description: LocalizedString;
  questions: QuizQuestion[];
  hint: LocalizedString; // For the entire quiz, or general guidance
}

export interface PracticalAssignment {
  type: 'practical';
  title: LocalizedString;
  description: LocalizedString;
  initialCode: LocalizedString; // User starts with this code
  testCode: LocalizedString; // Hidden code to run for validation (e.g., assertions)
  expectedOutputExample?: LocalizedString; // Example of what successful output looks like
  hint: LocalizedString; // Hint for the assignment
}

// A chapter can contain a mix of lessons, quizzes, and practicals
export type ChapterItem = LessonContent | Quiz | PracticalAssignment;

export interface Chapter {
    title: LocalizedString;
    items: ChapterItem[];
}

export interface ConsoleOutput {
  type: 'log' | 'error' | 'info';
  text: string;
}
