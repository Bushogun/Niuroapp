import { useEffect, useRef, useState } from "react";
import type { Machine } from "../interfaces/IMachine";

function getCurrentHealth(machine: Machine): number | null {
  const healthEvent = machine.events.find(
    (e) => e.type === "health_change"
  );

  return healthEvent ? healthEvent.data.current_health : null;
}

export function useMachineHealthNotification(machines: Machine[]) {
  const notified = useRef(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!machines.length || notified.current) return;

    const warningMachines = machines.filter((machine) => {
      const health = getCurrentHealth(machine);
      return  health === 3;
    });

    if (warningMachines.length > 0) {
      notified.current = true;
      const names = warningMachines.map((m) => m.name).join(", ");
      setMessage(`⚠ Máquinas en estado crítico: ${names}`);
    }
  }, [machines]);

  const close = () => setMessage(null);

  return { message, close };
}
