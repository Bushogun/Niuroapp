import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import MachineGrid from "../../components/ContainerCardsKPI";
import Notification from "../../components/Notification/Notification";
import { useMachineHealthNotification } from "../../Hooks/useMachineHealthNotification";
import PlantCanvas from "../../components/PlantCanvas";
import { useMemo } from "react";

function Dashboard() {
  const { machines } = useSelector((state: RootState) => state.machines);
  const machinesWarning = useSelector(
    (state: RootState) => state.machines.machines,
  );
  const { message, close } = useMachineHealthNotification(machinesWarning);
  const { fromDate, toDate } = useSelector((state: RootState) => state.ui);

  const filteredMachines = useMemo(() => {
    if (!fromDate || !toDate) return machines;

    const start = new Date(fromDate);
    const end = new Date(toDate);
    return machines.filter((machine) =>
      machine.events.some((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= start && eventDate <= end;
      }),
    );
  }, [machines, fromDate, toDate]);

  return (
    <>
      {message && <Notification message={message} onClose={close} />}
      <MachineGrid machines={filteredMachines} />
      <div className="mt-10">
        <PlantCanvas machines={filteredMachines} />
      </div>
    </>
  );
}

export default Dashboard;
