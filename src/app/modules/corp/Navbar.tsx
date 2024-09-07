import React from "react";
import { Logo } from "./Logo";
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
    {
      title: "Sign In",
      href: "/",
      description:
        "Sign in to view your edit, customize, and deploy your site",
    },
    {
      title: "Create New Site",
      href: "/",
      description:
        "Create a new custom club site!",
    },
]

export function Navbar() {
    return (
        <NavigationMenu>
          <NavigationMenuList className="scale-105 md:scale-125 pr-12 md:pr-32">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent">For Clubs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-[250px] gap-3 p-4">
                  {components.map((component: any) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent hover:bg-transparent focus:bg-transparent">
                  For Brands
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"