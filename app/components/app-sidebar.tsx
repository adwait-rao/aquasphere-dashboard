import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Home from "@/routes/home";
import {
  ClipboardPlus,
  DropletsIcon,
  Monitor,
  TrendingUpDown,
  Waves,
} from "lucide-react";
import { M } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { Link } from "react-router";

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Monitor,
  },
  {
    title: "Predictive Analysis",
    url: "/dashboard/predictive-analysis",
    icon: TrendingUpDown,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: ClipboardPlus,
  },
  {
    title: "Simulations",
    url: "/dashboard/simulations",
    icon: Waves,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="h-10"></div>
          {/* <SidebarGroupLabel>Aquasphere</SidebarGroupLabel> */}
          <p className="flex justify-center gap-2 items-center tracking-widest w-full py-3 mb-7 text-center text-3xl">
            Aquasphere <DropletsIcon />
          </p>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
