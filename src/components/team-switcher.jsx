import * as React from "react"
import { GalleryVerticalEnd, PanelLeftIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({}) {
  const { toggleSidebar, open } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          onClick={(e) => {
            e.stopPropagation()
            toggleSidebar()
          }}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-20"
        >
          {open ? (
            <div className="text-sidebar-primary-foreground flex aspect-square size-16 items-center justify-center rounded-lg">
                <img src="logo.png" alt="Logo"/>
            </div>
          ) : (
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <img src="logo.png" alt="Logo"/>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
