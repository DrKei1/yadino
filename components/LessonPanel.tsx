
import React from 'react';
import { Chapter, ChapterItem } from '../types';
import { uiStrings } from '../constants';
import { X, BookText, CircleHelp, CodeSquare } from 'lucide-react';

interface LessonPanelProps {
  lessons: Chapter[]; // Renamed to chapters for clarity
  activeItemIndex: number; // Renamed from activeLessonIndex
  activeChapterIndex: number;
  onSelectItem: (chapterIndex: number, itemIndex: number) => void; // Renamed from onSelectLesson
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const getItemIcon = (item: ChapterItem) => {
    switch (item.type) {
        case 'lesson':
            return <BookText className="h-4 w-4 rtl:ml-2 rtl:mr-0 text-slate-500 dark:text-slate-400" />;
        case 'quiz':
            return <CircleHelp className="h-4 w-4 rtl:ml-2 rtl:mr-0 text-amber-500 dark:text-amber-400" />;
        case 'practical':
            return <CodeSquare className="h-4 w-4 rtl:ml-2 rtl:mr-0 text-emerald-500 dark:text-emerald-400" />;
        default:
            return null;
    }
}

const LessonPanel: React.FC<LessonPanelProps> = ({
  lessons, // Now chapters
  activeItemIndex,
  activeChapterIndex,
  onSelectItem,
  isOpen,
  setIsOpen
}) => {
  const baseClasses = "absolute md:static top-0 rtl:right-0 h-full bg-slate-100/80 dark:bg-dark-bg/80 backdrop-blur-sm border-slate-300 dark:border-slate-700 rtl:border-l w-64 md:w-72 flex-shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out z-20";
  const openClasses = "translate-x-0";
  const closedClasses = "rtl:translate-x-full";

  return (
    <>
    {isOpen && <div className="fixed inset-0 bg-black/60 z-10 md:hidden" onClick={() => setIsOpen(false)}></div>}
    <aside className={`${baseClasses} ${isOpen ? openClasses : closedClasses}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-purple-600 dark:text-purple-400">{uiStrings.lessons}</h2>
            <button onClick={() => setIsOpen(false)} className="md:hidden p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700">
                <X className="h-5 w-5" />
            </button>
        </div>
        {lessons.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="mb-6">
            <h3 className="font-semibold text-slate-600 dark:text-slate-300 mb-2 px-2">{chapter.title}</h3>
            <ul>
              {chapter.items.map((item, itemIndex) => { // Iterate over items
                const isActive = chapterIndex === activeChapterIndex && itemIndex === activeItemIndex;
                return (
                  <li key={itemIndex}>
                    <button
                      onClick={() => onSelectItem(chapterIndex, itemIndex)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm relative flex items-center ${
                        isActive
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-300 font-semibold'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {isActive && <div className="absolute top-1 bottom-1 rtl:right-0 w-1 bg-purple-500 dark:bg-purple-400 rounded-full"></div>}
                      {getItemIcon(item)}
                      <span className="rtl:mr-2">{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
    </>
  );
};

export default LessonPanel;