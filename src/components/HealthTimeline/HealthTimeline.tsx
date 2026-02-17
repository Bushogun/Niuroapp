import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const HEALTH_CONFIG: any = {
  0: { label: "Óptimo", color: "#15803d" },
  1: { label: "Aceptable", color: "#84cc16" },
  2: { label: "Atención", color: "#f97316" },
  3: { label: "Peligro", color: "#ef4444" },
};

export default function HealthTimeline({ events }: { events: any[] }) {
  const nDaysFilter = useSelector((state: any) => state.filters?.nDays) || 1;

  const series = React.useMemo(() => {
    if (!events || events.length === 0) return [];

    const healthEvents = [...events]
      .filter((e: any) => e.type === "health_change")
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (healthEvents.length === 0) return [];

    const uniqueTimeEvents: any[] = [];
    healthEvents.forEach((event) => {
      const last = uniqueTimeEvents[uniqueTimeEvents.length - 1];
      if (last && last.date === event.date) {
        last.data.current_health = event.data.current_health;
      } else {
        uniqueTimeEvents.push({ ...event, data: { ...event.data } });
      }
    });

    const nMs = nDaysFilter * 24 * 60 * 60 * 1000;
    const dataByLevel: any = { 0: [], 1: [], 2: [], 3: [] };

    for (let i = 0; i < uniqueTimeEvents.length; i++) {
      const current = uniqueTimeEvents[i];
      const start = new Date(current.date).getTime();
      let end: number;

      let nextStableIndex = i + 1;
      while (nextStableIndex < uniqueTimeEvents.length) {
        const nextDate = new Date(uniqueTimeEvents[nextStableIndex].date).getTime();
        if ((nextDate - start) >= nMs) {
          break;
        }
        nextStableIndex++;
      }

      if (nextStableIndex < uniqueTimeEvents.length) {
        end = new Date(uniqueTimeEvents[nextStableIndex].date).getTime();
      } else {
        const lastDate = new Date(uniqueTimeEvents[uniqueTimeEvents.length - 1].date).getTime();
        end = lastDate === start ? start + (1000 * 60 * 60 * 2) : lastDate;
      }

      const level = current.data.current_health;
      if (HEALTH_CONFIG[level]) {
        dataByLevel[level].push({
          x: HEALTH_CONFIG[level].label,
          y: [start, end]
        });
      }
      i = nextStableIndex - 1;
    }

    return Object.keys(dataByLevel)
      .reverse()
      .map((level) => ({
        name: HEALTH_CONFIG[level].label,
        data: dataByLevel[level],
        color: HEALTH_CONFIG[level].color,
      }));
  }, [events, nDaysFilter]);

  const options: any = {
    chart: { 
        type: 'rangeBar', 
        toolbar: { show: false },
        animations: { enabled: false } 
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '70%',
        rangeBarGroupRows: true,
        borderRadius: 4
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        format: 'dd MMM',
      },
    },
    tooltip: { x: { format: 'dd MMM HH:mm' } }
  };

  return (
    <div className="w-full bg-white p-4 rounded border border-gray-200">
      <div className="text-xs text-gray-400 mb-2">
        Mostrando estados con duración ≥ {nDaysFilter} {nDaysFilter === 1 ? 'día' : 'días'}
      </div>
      <Chart options={options} series={series} type="rangeBar" height={280} />
    </div>
  );
}