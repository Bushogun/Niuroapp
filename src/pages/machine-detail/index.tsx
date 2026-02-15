import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import type { MachineEvent } from "../../interfaces/IMachine";
import MachineGrid from "../../components/ContainerCardsKPI";
import { healthStatus } from "../../constants/healthStatus";

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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{machine.name}</h2>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <p>
          <strong>ID:</strong> {machine.id}
        </p>
        <p>
          <strong>Total eventos:</strong> {machine.events.length}
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4">Historial de eventos</h3>

      <div className="space-y-4">
        {machine.events.map((event: MachineEvent, index: number) => (
          <div key={index} className="border rounded-xl p-4 bg-gray-50">
            <p className="text-sm text-gray-500">{event.date}</p>

            {event.type === "health_change" ? (
              <div>
                <p className="font-medium">Cambio de Salud</p>
                <p>
                  {healthStatus[event.data.previous_health as keyof typeof healthStatus]} →{" "}
                  {healthStatus[event.data.current_health as keyof typeof healthStatus]}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-medium">Intervención</p>
                <p>{event.data.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
