import type { Machine, MachineEvent } from "../../../interfaces/IMachine";
import { useNavigate } from "react-router-dom";
import { healthStyles } from "../../../constants/healthStyles";
import { healthStatus } from "../../../constants/healthStatus";

type Props = {
  machine: Machine;
};

export default function MachineCard({ machine }: Props) {
  const navigate = useNavigate();

  const healthChanges = machine.events.filter(
    (e): e is Extract<MachineEvent, { type: "health_change" }> =>
      e.type === "health_change"
  );

  const interventions = machine.events.filter(
    (e): e is Extract<MachineEvent, { type: "intervention" }> =>
      e.type === "intervention"
  );

  const currentHealth =
    healthChanges.length > 0
      ? healthChanges[0].data.current_health
      : 1;

  const healthConfig = healthStyles[currentHealth as 0 | 1 | 2 | 3];
  const healthLabel = healthStatus[currentHealth as 0 | 1 | 2 | 3];

  const lastIntervention =
    interventions.length > 0
      ? interventions[0].data.details
      : "Sin intervenciones";

  return (
    <div
      onClick={() => navigate(`/machine-detail/${machine.id}`)}
      className={`
        cursor-pointer
        flex flex-col justify-between
        min-h-[170px]
        min-w-[300px]
        rounded-2xl p-5 border-2
        transition-all duration-200 ease-in-out
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        active:scale-[0.98]
        ${healthConfig.card}
      `}
    >
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold truncate">
            {machine.name}
          </h3>

          <span
            className={`
              text-white text-xs px-3 py-1 rounded-full
              ${healthConfig.badge}
            `}
          >
            {healthLabel}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <strong>ID:</strong> {machine.id}
          </p>

          <p>
            <strong>Eventos:</strong> {machine.events.length}
          </p>

          <p>
            <strong>Intervenciones:</strong> {interventions.length}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mt-3 line-clamp-2">
        <strong>Última intervención:</strong> {lastIntervention}
      </p>

      <span className="text-gray-400 self-end mt-2 transition-transform group-hover:translate-x-1">
        →
      </span>
    </div>
  );
}
