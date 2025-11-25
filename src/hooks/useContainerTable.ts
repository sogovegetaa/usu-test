import React, { useCallback, useMemo, useState } from "react";
import debounce from "just-debounce-it";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { deleteContainers, fetchContainers } from "../store/containersSlice";

type UseContainerTableResult = {
  searchInput: string;
  statusFilter: string | null;
  selectedIds: string[];
  isDetailsModalOpen: boolean;
  openDetailsModal: () => void;
  closeDetailsModal: () => void;
  handleSearchChange: (value: string) => void;
  handleStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDeleteSelected: () => void;
  toggleSelection: (id: string) => void;
};

export const useContainerTable = (): UseContainerTableResult => {
  const dispatch = useDispatch<AppDispatch>();
  const { search, status } = useSelector(
    (state: RootState) => state.containers
  );

  const [searchInput, setSearchInput] = useState(search);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const debouncedFetch = useMemo(
    () =>
      debounce((value: string, currentStatus: string | null) => {
        dispatch(
          fetchContainers({
            search: value.trim(),
            status: currentStatus ?? null,
          })
        );
      }, 1000),
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      debouncedFetch(value, status);
    },
    [debouncedFetch, status]
  );

  const handleStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value || null;

      dispatch(
        fetchContainers({
          search: searchInput.trim(),
          status: value,
        })
      );
    },
    [dispatch, searchInput]
  );

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (!selectedIds.length) return;

    dispatch(deleteContainers(selectedIds))
      .unwrap()
      .then(() => {
        setSelectedIds([]);
      });
  }, [dispatch, selectedIds]);

  const openDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(true);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
  }, []);

  return {
    searchInput,
    statusFilter: status,
    selectedIds,
    isDetailsModalOpen,
    openDetailsModal,
    closeDetailsModal,
    handleSearchChange,
    handleStatusChange,
    handleDeleteSelected,
    toggleSelection,
  };
};
