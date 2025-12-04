import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/app/utils/cn"

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuLinker({goto, displayName}) {
    const location = useLocation()

    return(
        <Link to={goto}>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                location.pathname === goto && "bg-blue-500 text-white"
            )}
            >
                {displayName}
            </NavigationMenuLink>
        </Link>
    )
}