import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";
import GlobalDamSelector from "@/components/GlobalDamSelector";
import DamProvider from "@/components/Providers/DamProvider";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <DamProvider>
        <main className="p-5 w-full">
          {/* <SidebarTrigger /> */}

          <GlobalDamSelector />
          {/* <div className="h-10"></div> */}
          <Outlet />
        </main>
      </DamProvider>
    </SidebarProvider>
  );
}
