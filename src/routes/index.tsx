import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import MachineDetail from "../pages/machine-detail";

export default function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/machine-detail", element: <MachineDetail /> },
    { path: "/machine-detail/:id", element: <MachineDetail /> },
  ]);
}
