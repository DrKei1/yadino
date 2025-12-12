
import React from 'react';
import { uiStrings } from '../constants';
import { Menu, Sun, Moon, CodeSquare } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle, onMenuClick }) => {
  return (
    <header className="sticky top-0 flex items-center justify-between p-3 bg-slate-100/80 dark:bg-dark-bg/50 backdrop-blur-lg border-b border-slate-300/50 dark:border-slate-700/50 shadow-md flex-shrink-0 z-30">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="md:hidden p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rtl:ml-2">
            <Menu className="h-6 w-6"/>
        </button>
        <a href="#" className="text-xl font-bold text-purple-600 dark:text-purple-400">
            {uiStrings.headerTitle}
        </a>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onThemeToggle}
          className="p-2 text-sm font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-dark-bg focus:ring-purple-500"
          aria-label={theme === 'dark' ? 'فعال‌سازی حالت روشن' : 'فعال‌سازی حالت تاریک'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-purple-500" />}
        </button>
        <a
          href="#playground"
          className="p-2 text-sm font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-dark-bg focus:ring-purple-500"
          aria-label="رفتن به زمین بازی کد"
        >
          <CodeSquare className="h-5 w-5 text-purple-500" />
        </a>
      </div>
    </header>
  );
};

export default Header;