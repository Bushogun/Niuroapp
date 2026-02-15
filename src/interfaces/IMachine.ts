export interface MachinesResponse {
  machines: Machine[];
}

export interface Machine {
  id: number;
  name: string;
  events: MachineEvent[];
}

export type MachineEvent = HealthChangeEvent | InterventionEvent;

export interface BaseEvent {
  type: string;
  date: string;
}

export interface HealthChangeEvent extends BaseEvent {
  type: "health_change";
  data: {
    previous_health: number;
    current_health: number;
  };
}

export interface InterventionEvent extends BaseEvent {
  type: "intervention";
  data: {
    details: string;
  };
}