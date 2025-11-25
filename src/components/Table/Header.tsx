import React, { useEffect, useRef } from "react";

type HeaderProps = {
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
};

const Header: React.FC<HeaderProps> = ({
  allSelected,
  someSelected,
  onToggleAll,
}): React.ReactElement => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  return (
    <thead className="text-xs sm:text-sm text-body bg-neutral-secondary-medium border-b border-default-medium dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700">
      <tr>
        <th scope="col" className="p-3 sm:p-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              ref={checkboxRef}
              checked={allSelected}
              onChange={onToggleAll}
              className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft dark:bg-slate-900 dark:border-slate-600"
            />
          </div>
        </th>
        <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 font-medium whitespace-nowrap">
          #
        </th>
        <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 font-medium whitespace-nowrap">
          Зона хранения
        </th>
        <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 font-medium whitespace-nowrap">
          Статус
        </th>
        <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 font-medium whitespace-nowrap">
          Обновлено
        </th>
      </tr>
    </thead>
  );
};

export default Header;
