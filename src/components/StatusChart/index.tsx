import React, { useEffect, useRef } from "react";
import type { Chart } from "chart.js/auto";

type StatusPoint = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  data: StatusPoint[];
};

const StatusChart: React.FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isCancelled = false;

    const setupChart = async () => {
      const { default: ChartJS } = await import("chart.js/auto");
      if (isCancelled) return;

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new ChartJS(canvas, {
        type: "pie",
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              data: data.map((d) => d.value),
              backgroundColor: data.map((d) => d.color),
              borderWidth: 0,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed as number;
                  const percent = ((value / total) * 100).toFixed(1);
                  return `${context.label}: ${percent}%`;
                },
              },
            },
          },
        },
      });
    };

    setupChart();

    return () => {
      isCancelled = true;
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [data, total]);

  return (
    <section className="mt-8 flex flex-col gap-4 rounded-base border border-default bg-white p-4 shadow-xs dark:bg-slate-900 dark:border-slate-700">
      <h2 className="text-sm font-semibold text-heading dark:text-slate-100">
        Статистика по статусам контейнеров
      </h2>

      <div className="flex flex-col items-center gap-6">
        <div className="relative h-40 w-40">
          <canvas ref={canvasRef} />
        </div>

        <div className="flex flex-1 flex-col gap-2 text-xs text-body dark:text-slate-300">
          {data.map((item) => {
            const percent = ((item.value / total) * 100).toFixed(1);
            return (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-heading dark:text-slate-100">
                    {item.label}
                  </span>
                </div>
                <span className="tabular-nums">{percent}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatusChart;