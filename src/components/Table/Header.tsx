import React from "react";

const Header: React.FC = (): React.ReactElement => {
  return (
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input
              id="table-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft dark:bg-slate-900 dark:border-slate-600"
            />
            <label htmlFor="table-checkbox" className="sr-only">
              Table checkbox
            </label>
          </div>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          #
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Зона хранения
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Статус
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Обновлено
        </th>
      </tr>
    </thead>
  );
};

export default Header;
