import { Outlet } from "react-router";
import SideBarDashboard from "../components/layout/SideBarDashboard";

export default function DasboardLayout() {
  return (
    <div className="flex min-h-screen bg-sky-50">
      <SideBarDashboard />
      <main className="flex-1 min-w-0 p-6 md:p-10 lg:p-12">
        <div className="mx-auto w-full max-w-[110rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
