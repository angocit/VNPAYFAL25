import { Outlet } from "react-router-dom";
import ClientHeader from "./components/ClientHeader";
import ClientFooter from "./components/ClientFooter";

const ClientLayout = () => {
  return (
    <main className="min-h-screen">
      <ClientHeader />

      <div className="max-w-7xl mx-auto relative my-8 px-4 flex-1">
        <Outlet />
      </div>

      <ClientFooter />
    </main>
  );
};

export default ClientLayout;
