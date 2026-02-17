import React from 'react';
import Chart from 'react-apexcharts';

const HEALTH_CONFIG = {
    0: { label: "Óptimo", color: "#15803d" },
    1: { label: "Aceptable", color: "#84cc16" },
    2: { label: "Atención", color: "#f97316" },
    3: { label: "Peligro", color: "#ef4444" },
};

export default function HealthTimeline({ events }: { events: any[] }) {
  const series = React.useMemo(() => {
    const healthEvents = events
      .filter((e:any) => e.type === "health_change")
      .sort((a:any, b:any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (healthEvents.length === 0) return [];

    const lastEventDate = new Date(healthEvents[healthEvents.length - 1].date).getTime();
    
    const dataByLevel = { 0: [], 1: [], 2: [], 3: [] };

    for (let i = 0; i < healthEvents.length; i++) {
      const start = new Date(healthEvents[i].date).getTime();
      
      // Si no hay siguiente evento, el "fin" de este bloque es el mismo que su "inicio"
      // (o una duración mínima para que sea visible, ej. + 1 hora)
      // Pero para seguir la lógica de línea de tiempo, el penúltimo termina donde empieza el último.
      const nextEvent = healthEvents[i + 1];
      const end = nextEvent 
        ? new Date(nextEvent.date).getTime() 
        : start + (1000 * 60 * 60 * 2); // Si es el último, le damos 2 horas de ancho visual

      const level = healthEvents[i].data.current_health;
      
      if (dataByLevel[level] !== undefined) {
        dataByLevel[level].push({
          x: HEALTH_CONFIG[level].label,
          y: [start, end]
        });
      }
    }

    return Object.keys(dataByLevel).reverse().map(level => ({
      name: HEALTH_CONFIG[level].label,
      data: dataByLevel[level],
      color: HEALTH_CONFIG[level].color
    }));
  }, [events]);

  const options = {
  chart: {
    type: 'rangeBar',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '60%',
      rangeBarGroupRows: true,
      borderRadius: 4
    }
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 8, 
    labels: {
      rotate: 0, 
      hideOverlappingLabels: true,
      style: {
        fontSize: '11px',
        colors: '#64748b'
      },
      datetimeUTC: false, 
      format: 'd MMM', 
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: {
      style: {
        fontWeight: 600,
        fontSize: '12px',
        colors: '#334155'
      }
    }
  },
  grid: {
    borderColor: '#f1f5f9',
    xaxis: {
      lines: { show: true } 
    },
    row: {
      colors: ['#f8fafc', 'transparent'],
      opacity: 0.8
    }
  },
    tooltip: {
      x: { format: 'dd MMM HH:mm' }
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded border border-gray-200">

      <Chart
        options={options}
        series={series}
        type="rangeBar"
        height={280}
      />
    </div>
  );
}