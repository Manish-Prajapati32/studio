
import type { ReactNode } from "react";
import { AdminHeader } from "@/components/admin-header";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <AdminHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}

    