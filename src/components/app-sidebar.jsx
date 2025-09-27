import * as React from "react"
import {
  BookOpen,
  Bot,
  MapIcon,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  FilePlus,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavHistory } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const PageTypes = {
  MapPage: 'Map',
  UploadPage: 'Upload',
  SettingsPage: 'Settings'
};
Object.freeze(PageTypes);
export { PageTypes };

const data = {
  user: {
    name: "Quentin Briand",
    email: "quentin.briand@epitech.eu",
    avatar: "https://i1.sndcdn.com/avatars-ylM4tanwBXJZhjWb-X76mWw-t240x240.jpg",
  },
  navMain: [
    { title: "Map", page: PageTypes.MapPage, icon: MapIcon },
    { title: "Upload new documents", page: PageTypes.UploadPage, icon: FilePlus },
    { title: "Settings", page: PageTypes.SettingsPage, icon: Settings2 },
  ],
  history: [
    {
      name: "Design Engineering", icon: Frame },
    { name: "Sales & Marketing", icon: PieChart },
    { name: "Travel", icon: Map },
  ],
}

export function AppSidebar({ changeScreen, ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-primary/80">
        <TeamSwitcher/>
      </SidebarHeader>
      <SidebarContent className="bg-primary/80">
        <NavMain changeScreen={changeScreen} items={data.navMain} />
        <NavHistory history={data.history} />
      </SidebarContent>
      <SidebarFooter className="bg-primary/80">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
