import React, { useEffect, useState } from "react";

type Zone = {
  id: string;
  utilization: number;
};

const GRID_SIZE = 10;
const TOTAL_ZONES = GRID_SIZE * GRID_SIZE;

const createInitialZones = (): Zone[] =>
  Array.from({ length: TOTAL_ZONES }, (_, index) => ({
    id: `Z-${index + 1}`,
    utilization: Math.floor(Math.random() * 100),
  }));

const getZoneColor = (utilization: number): string => {
  if (utilization === 0) {
    return "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500";
  }

  if (utilization <= 30) {
    return "bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100";
  }

  if (utilization <= 70) {
    return "bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100";
  }

  return "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100";
};

const YardMap: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>(createInitialZones);

  useEffect(() => {
    const interval = setInterval(() => {
      setZones((prev) =>
        prev.map((zone) => {
          const delta = Math.floor(Math.random() * 21) - 10;
          const next = Math.max(0, Math.min(100, zone.utilization + delta));
          return { ...zone, utilization: next };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-8">
      <div className="flex items-center mb-3">
        <h2 className="text-sm font-semibold text-heading dark:text-slate-100">
          Карта площадки
        </h2>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="inline-block rounded-base border border-default bg-slate-100 p-2 dark:bg-slate-900 dark:border-slate-700">
          <div className="grid grid-cols-10 gap-[1px] bg-slate-300 dark:bg-slate-700">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className={`relative aspect-square min-w-[20px] min-h-[20px] flex items-center justify-center text-[9px] border border-slate-200 ${getZoneColor(
                  zone.utilization
                )}`}
              >
                <span className="font-medium">
                  {Math.round(zone.utilization)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-body dark:text-slate-300">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-emerald-100 border border-emerald-300 dark:bg-emerald-900 dark:border-emerald-500" />
          <span>Низкая загрузка</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-amber-100 border border-amber-300 dark:bg-amber-900 dark:border-amber-500" />
          <span>Средняя</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-red-100 border border-red-300 dark:bg-red-900 dark:border-red-500" />
          <span>Высокая</span>
        </div>
      </div>
    </section>
  );
};

export default YardMap;
