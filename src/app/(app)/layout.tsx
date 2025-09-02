import type { ReactNode } from "react";
import { Header } from "@/components/header";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      <footer className="p-4 text-center text-xs text-muted-foreground">
        © 2024 Sikkim Serenity
      </footer>
    </div>
  );
}
