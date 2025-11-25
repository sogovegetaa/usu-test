import React, { memo, useCallback } from "react";
import Button from "../Button";
import DeleteIcon from "../Icons/DeleteIcon";
import TextField from "../TextField";
import { SearchIcon } from "../Icons/SearchIcon";
import { STATUS_MAP } from "../StatusChart/constants";

type TableToolbarProps = {
  selectedCount: number;
  statusValue: string | null;
  searchValue: string;
  onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (value: string) => void;
  onDeleteSelected: () => void;
};

export const TableToolbar: React.FC<TableToolbarProps> = memo(
  ({
    selectedCount,
    statusValue,
    searchValue,
    onStatusChange,
    onSearchChange,
    onDeleteSelected,
  }) => {
    const handleSearchInputChange = useCallback(
      (value: string) => {
        onSearchChange(value);
      },
      [onSearchChange]
    );

    return (
      <div className="flex justify-between items-center p-4 border-t border-l border-r border-default bg-white dark:border-slate-800 dark:bg-slate-900">
        <Button
          icon={<DeleteIcon />}
          className="bg-red-200 hover:bg-red-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-100"
          disabled={!selectedCount}
          onClick={onDeleteSelected}
        >
          Удалить
        </Button>
        <div className="flex items-center gap-3">
          <select
            value={statusValue ?? ""}
            onChange={onStatusChange}
            className="block rounded-base border border-default-medium bg-neutral-secondary-medium px-3 py-2 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-brand-soft dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
          >
            <option value="">Все статусы</option>
            {STATUS_MAP.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <TextField
            icon={<SearchIcon />}
            label="Поиск"
            placeholder="Поиск"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
    );
  }
);

TableToolbar.displayName = "TableToolbar";


