import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { NavigationMenuLinker } from "./ui/navigation-link"

export function NavBar() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLinker goto="/" displayName="Home" />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLinker goto="/catalog" displayName="Catalog" />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
