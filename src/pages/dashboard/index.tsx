import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import MachineGrid from "../../components/ContainerCardsKPI";
import Notification from "../../components/Notification/Notification";
import { useMachineHealthNotification } from "../../Hooks/useMachineHealthNotification";
import PlantCanvas from "../../components/PlantCanvas";

function Dashboard() {
    const { machines } = useSelector((state: RootState) => state.machines);
    const machinesWarning = useSelector((state: RootState) => state.machines.machines);
    const { message, close } = useMachineHealthNotification(machinesWarning);

  return (
    <>
    {message && (
      <Notification message={message} onClose={close} />
    )}
      <MachineGrid machines={machines} />
      {/* <PlantCanvas /> */}
    </>
  );
}

export default Dashboard;
