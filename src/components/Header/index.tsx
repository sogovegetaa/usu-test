import React from "react";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
      <div className="flex items-center justify-between sm:justify-start gap-4 w-full">
        <span className="font-semibold tracking-tight text-base sm:text-lg">
          УСУ - flow
        </span>
        <div className="sm:hidden">
          <ThemeToggle />
        </div>
      </div>
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
