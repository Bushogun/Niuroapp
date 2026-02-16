import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import type { MachineEvent } from "../../interfaces/IMachine";
import MachineGrid from "../../components/ContainerCardsKPI";
import { healthStatus, type HealthLevel } from "../../constants/healthStatus";
import { healthStyles } from "../../constants/healthStyles";
import { formatDate } from "../../utils/formatDate";
import { FaTools } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";

export default function MachineDetail() {
  const { id } = useParams();
  const machines = useSelector((state: RootState) => state.machines.machines);

  if (!id) {
    return (
      <div className="p-6">
        <MachineGrid machines={machines} />
      </div>
    );
  }

  const machine = machines.find((m) => m.id === Number(id));

  if (!machine) {
    return <div className="p-6">Máquina no encontrada</div>;
  }

  const healthEvents = machine.events.filter(
    (e): e is Extract<MachineEvent, { type: "health_change" }> =>
      e.type === "health_change"
  );

  const currentHealth: HealthLevel =
    healthEvents.length > 0
      ? (healthEvents[0].data.current_health as HealthLevel)
      : 1;

  const style = healthStyles[currentHealth];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{machine.name}</h2>

        <span
          className={`text-white text-sm px-3 py-1 rounded-full w-fit ${style.badge}`}
        >
          {healthStatus[currentHealth]}
        </span>
      </div>

      {/* Info card */}
      <div
        className={`rounded-2xl shadow-sm p-6 border-2 ${style.card}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p>
            <strong>ID:</strong> {machine.id}
          </p>
          <p>
            <strong>Total eventos:</strong> {machine.events.length}
          </p>
        </div>
      </div>

      {/* Historial */}
      <h3 className="text-lg md:text-xl font-semibold mt-8 mb-4">
        Historial de eventos
      </h3>

      <div className="space-y-4">
        {machine.events.map((event: MachineEvent, index: number) => {
          
          if (event.type === "health_change") {

            const currentLevel = event.data.current_health as HealthLevel;
            const previousLevel = event.data.previous_health as HealthLevel;

            const currentStyle = healthStyles[currentLevel];
            const previousStyle = healthStyles[previousLevel];

            return (
              <div
                key={index}
                className={`border-l-4 rounded-xl p-4 shadow-sm ${currentStyle.card}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MdMonitorHeart className="text-lg" />
                  <p className="font-semibold">Cambio de salud</p>
                </div>

                <p className="text-xs opacity-70 mb-3">
                  {formatDate(event.date)}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-sm">
                  
                  {/* Estado anterior con color */}
                  <span
                    className={`text-white text-xs px-2 py-1 rounded ${previousStyle.badge}`}
                  >
                    {healthStatus[previousLevel]}
                  </span>

                  <span>→</span>

                  {/* Estado nuevo */}
                  <span
                    className={`text-white text-xs px-2 py-1 rounded ${currentStyle.badge}`}
                  >
                    {healthStatus[currentLevel]}
                  </span>
                </div>
              </div>
            );
          }

          // 🔧 Intervención
          return (
            <div
              key={index}
              className="border-l-4 border-gray-300 rounded-xl p-4 bg-gray-50 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaTools className="text-gray-600" />
                <p className="font-semibold">Intervención</p>
              </div>

              <p className="text-xs text-gray-500 mb-2">
                {formatDate(event.date)}
              </p>

              <p className="text-sm text-gray-700">
                {event.data.details}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
