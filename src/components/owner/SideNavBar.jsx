import {
  Bike,
  Building,
  ChevronRight,
  ClipboardList,
  Cog,
  LayoutDashboard,
  List,
  Plus,
} from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Link } from "react-router-dom";

// Menu items
const items = [
  {
    type: "simple",
    title: "Dashboard",
    to: "/owner/",
    icon: LayoutDashboard,
  },
  {
    type: "extended",
    title: "Parts",
    icon: Cog,
    children: [
      {
        title: "Part list",
        to: "/owner/parts",
        icon: ClipboardList,
      },
      {
        title: "Add part",
        to: "/owner/parts/add",
        icon: Plus,
      },
    ],
  },
  {
    type: "extended",
    title: "Models",
    icon: Bike,
    children: [
      {
        title: "Model List",
        to: "/owner/models",
        icon: ClipboardList,
      },
      {
        title: "Add model",
        to: "/owner/models/add",
        icon: Plus,
      },
    ],
  },
  {
    type: "extended",
    title: "Brands",
    icon: Building,
    children: [
      {
        title: "Brand list",
        to: "/owner/brands",
        icon: ClipboardList,
      },
      {
        title: "Add brand",
        to: "/owner/brands/add",
        icon: Plus,
      },
    ],
  },
];

export function SideNavBar() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (title) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  return (
    <Sidebar>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => {
              if (item.type === "simple") {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.to}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              if (item.type === "extended") {
                const isOpen = openItems.has(item.title);

                return (
                  <Collapsible
                    key={item.title}
                    open={isOpen}
                    onOpenChange={() => toggleItem(item.title)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="cursor-pointer">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton asChild>
                                <Link to={child.to}>
                                  <child.icon className="h-4 w-4" />
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
}
