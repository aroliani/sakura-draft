import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import CopyrightFooter from "./CopyrightFooter";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar />
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        <div className="flex-1"><Outlet /></div>
        <CopyrightFooter />
      </main>
    </div>
  );
}
