import React from "react";
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from '@/app/authState';

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
      href: "/login",
      description:
        "Sign in to access the Dashboard",
    },
    {
      title: "Create New Site",
      href: "/questionnaire",
      description:
        "Create a new custom club site!",
    },
]

export function Navbar() {
  const { user, loading } = useAuth();

  return (
      <NavigationMenu>
        <NavigationMenuList className="scale-105 md:scale-125 mr-5 md:mr-16">
          <NavigationMenuItem className="md:mr-3">
            {!user && (
              <div>
                <NavigationMenuTrigger className="bg-transparent focus:text-orange-500 hover:bg-transparent hover:text-orange-500 focus:bg-transparent text-entourage-orange">For Clubs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col w-[250px] gap-3 p-3">
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
              </div>
            )}
            {user && (
              <div>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className="bg-transparent hover:bg-transparent hover:text-orange-500 focus:bg-transparent text-entourage-orange mr-2 md:mr-5">
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </div>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="bg-transparent hover:bg-transparent hover:text-orange-500 focus:bg-transparent text-entourage-orange">
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