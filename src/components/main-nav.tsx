"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  Bot,
  Globe,
  Home,
  Languages,
  Map,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/virtual-tours", label: "Virtual Tours", icon: Globe },
  { href: "/interactive-map", label: "Interactive Map", icon: Map },
  { href: "/digital-archives", label: "Digital Archives", icon: Archive },
  { href: "/tour-planner", label: "AI Tour Planner", icon: Bot },
  { href: "/audio-guide", label: "Audio Guide", icon: Languages },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
