import { useRoutes, BrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/dashboard";
import Plant from "../pages/planta";
import MachineDetail from "../pages/machine-detail";
import Analytics from "../pages/analytics";


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/plant", element: <Plant /> },
    { path: "/machine-detail", element: <MachineDetail /> },
    { path: "/machine-detail/:id", element: <MachineDetail /> },
    { path: "/analytics", element: <Analytics /> },
  ]);
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;