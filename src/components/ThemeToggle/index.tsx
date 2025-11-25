import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
    let theme = 'light';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
        theme = stored;
    }
    return theme as Theme;
};

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const isDark = theme === 'dark';

  const handleToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-800 dark:text-slate-100 shadow-sm hover:bg-slate-50 hover:dark:bg-slate-800 transition-colors"
    >
      <span
        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-yellow-300 dark:bg-slate-700 text-[10px]"
        aria-hidden="true"
      >
        {isDark ? '🌙' : '☀️'}
      </span>
      <span className="hidden sm:inline">
        {isDark ? 'Тёмная тема' : 'Светлая тема'}
      </span>
    </button>
  );
};

export default ThemeToggle;


