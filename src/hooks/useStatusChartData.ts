import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { STATUS_MAP } from "../components/StatusChart/constants";

export type StatusChartPoint = {
  label: string;
  value: number;
  color: string;
};

export const useStatusChartData = (): StatusChartPoint[] => {
  const allItems = useSelector((state: RootState) => state.containers.allItems);

  return useMemo(() => {
    const statusCounts = allItems.reduce<Record<string, number>>((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    return STATUS_MAP.map((item) => ({
      label: item.label,
      color: item.color,
      value: statusCounts[item.key] || 0,
    })).filter((item) => item.value > 0);
  }, [allItems]);
};


