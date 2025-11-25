import React, { useCallback, useState } from "react";
import { Container } from "../../types/container";
import Header from "./Header";
import { TableToolbar } from "./TableToolbar";
import { TableRow } from "./TableRow";
import { TableDetailsModal } from "./TableDetailsModal";
import { useContainerTable } from "../../hooks/useContainerTable";

type Props = {
  data: Container[];
};

const MainTable: React.FC<Props> = ({ data }) => {
  const {
    searchInput,
    statusFilter,
    selectedIds,
    isDetailsModalOpen,
    openDetailsModal,
    closeDetailsModal,
    handleSearchChange,
    handleStatusChange,
    handleDeleteSelected,
    toggleSelection,
    toggleSelectAll,
  } = useContainerTable();

  const [activeContainer, setActiveContainer] = useState<Container | null>(
    null
  );

  const currentIds = data.map((item) => item.id);

  const allSelected =
    currentIds.length > 0 &&
    currentIds.every((id) => selectedIds.includes(id));

  const someSelected =
    !allSelected &&
    currentIds.some((id) => selectedIds.includes(id));

  const handleRowOpenDetails = useCallback(
    (container: Container) => {
      setActiveContainer(container);
      openDetailsModal();
    },
    [openDetailsModal]
  );

  return (
    <div className="">
      <TableToolbar
        selectedCount={selectedIds.length}
        statusValue={statusFilter}
        searchValue={searchInput}
        onStatusChange={handleStatusChange}
        onSearchChange={handleSearchChange}
        onDeleteSelected={handleDeleteSelected}
      />
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default dark:bg-slate-900 dark:border-slate-800">
        <table className="w-full min-w-[640px] text-xs sm:text-sm text-left rtl:text-right text-body">
          <Header
            allSelected={allSelected}
            someSelected={someSelected}
            onToggleAll={() => toggleSelectAll(currentIds)}
          />
          <tbody>
            {data.map((item) => {
              return (
                <TableRow
                  key={item.id}
                  item={item}
                  isSelected={selectedIds.includes(item.id)}
                  onToggleSelection={toggleSelection}
                  onOpenDetails={() => handleRowOpenDetails(item)}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <TableDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        container={activeContainer}
      />
    </div>
  );
};

export default MainTable;
