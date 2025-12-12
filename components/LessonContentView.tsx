
import React from 'react';
import { LessonContent } from '../types';
import TextFormatter from '../utils/TextFormatter'; // Import TextFormatter

interface LessonContentViewProps {
  lesson: LessonContent;
}

const LessonContentView: React.FC<LessonContentViewProps> = ({ lesson }) => {
  return (
    <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
      <p><TextFormatter text={lesson.content} /></p> {/* Use TextFormatter here */}
    </div>
  );
};

export default LessonContentView;