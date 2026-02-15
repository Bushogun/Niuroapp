export const healthStatus = {
  0: "Óptimo",
  1: "Aceptable",
  2: "Atención",
  3: "Peligro",
} as const;

export type HealthLevel = keyof typeof healthStatus;
