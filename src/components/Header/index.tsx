import React from "react";
import ThemeToggle from "../ThemeToggle";
import { SearchIcon } from "../Icons/SearchIcon";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
      <div className="flex items-center gap-4">
        <span className="font-semibold tracking-tight">УСУ - flow</span>
        <div className="flex items-center gap-2 text-md text-slate-500 dark:text-slate-300 p-1">
          <label htmlFor="input-group-1" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              id="input-group-1"
              className="block w-full max-w-96 ps-9 pe-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
