import React, { memo, useCallback } from "react";
import moment from "moment";
import { Container } from "../../types/container";
import { getStatusMeta } from "../../utils/status";

type TableRowProps = {
  item: Container;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onOpenDetails: () => void;
};

export const TableRow: React.FC<TableRowProps> = memo(
  ({ item, isSelected, onToggleSelection, onOpenDetails }) => {
    const handleRowClick = useCallback(() => {
      onOpenDetails();
    }, [onOpenDetails]);

    const handleCheckboxClick = useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
        onToggleSelection(item.id.toString());
      },
      [item.id, onToggleSelection]
    );

    const statusMeta = getStatusMeta(item.status);

    return (
      <tr
        className="bg-white dark:bg-slate-900 border-b border-default dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
        onClick={handleRowClick}
      >
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onClick={handleCheckboxClick}
              readOnly
              className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft dark:bg-slate-900 dark:border-slate-600"
            />
          </div>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-heading whitespace-nowrap"
        >
          {item.number}
        </th>
        <td className="px-6 py-4">{item.storageArea}</td>
        <td className="px-6 py-4">
          {statusMeta ? (
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: statusMeta.color }}
              />
              <span>{statusMeta.label}</span>
            </span>
          ) : (
            item.status
          )}
        </td>
        <td className="px-6 py-4">
          {moment.unix(item.updatedAt).format("DD-MM-YYYY HH:ss")}
        </td>
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";


