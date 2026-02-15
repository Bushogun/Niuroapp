import type { Machine } from "./IMachine";

export interface MachineState {
  machines: Machine[];
  loading: boolean;
  error: string | null;
}
