"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import {
  Archive,
  Bot,
  Globe,
  Home,
  Languages,
  Map,
  Menu,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/virtual-tours", label: "Virtual Tours", icon: Globe },
  { href: "/interactive-map", label: "Interactive Map", icon: Map },
  { href: "/digital-archives", label: "Digital Archives", icon: Archive },
  { href: "/tour-planner", label: "AI Tour Planner", icon: Bot },
  { href: "/audio-guide", label: "Audio Guide", icon: Languages },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <Link href="/dashboard" className="flex items-center gap-3">
        <Logo className="size-8 text-primary" />
        <h2 className="font-headline text-xl font-semibold tracking-tight">
          Sikkim Serenity
        </h2>
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.label}
            {pathname === item.href && (
              <motion.span
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </Link>
        ))}
      </nav>
      
      <div className="flex items-center gap-4">
         <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md p-2 text-lg font-medium",
                       pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative size-9 rounded-full"
            >
              <Avatar className="size-9">
                <AvatarImage src="https://picsum.photos/100" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Visitor</p>
                <p className="text-xs leading-none text-muted-foreground">
                  visitor@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile"><User className="mr-2"/>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings"><Settings className="mr-2"/>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/logout"><LogOut className="mr-2"/>Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
