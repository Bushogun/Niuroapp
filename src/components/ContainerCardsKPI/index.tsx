import MachineCard from "./MachineCard";
import type { Machine } from "../../interfaces/IMachine";

type Props = {
  machines: Machine[];
};

export default function MachineGrid({ machines }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {machines.map((machine) => (
        <div
          key={machine.id}
          className="
            w-full
            sm:w-[48%]
            lg:w-[31%]
            max-w-[420px]
            flex
          "
        >
          <MachineCard machine={machine} />
        </div>
      ))}
    </div>
  );
}
