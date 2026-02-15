import type { HealthLevel } from "./healthStatus";

export const healthStyles: Record<
  HealthLevel,
  {
    card: string;
    badge: string;
  }
> = {
  0: {
    card: "border-green-500 bg-green-50",
    badge: "bg-green-500",
  },
  1: {
    card: "border-blue-500 bg-blue-50",
    badge: "bg-blue-500",
  },
  2: {
    card: "border-yellow-500 bg-yellow-50",
    badge: "bg-yellow-500",
  },
  3: {
    card: "border-red-500 bg-red-50",
    badge: "bg-red-500",
  },
};
