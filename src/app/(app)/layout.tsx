import type { ReactNode } from "react";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { MainNav } from "@/components/main-nav";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Logo className="size-8 text-primary" />
            <div className="flex flex-col">
              <h2 className="font-headline text-lg font-semibold tracking-tight">
                Sikkim Serenity
              </h2>
            </div>
          </Link>
        </SidebarHeader>
        <Separator />
        <SidebarContent className="p-2">
          <MainNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Sikkim Serenity
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
