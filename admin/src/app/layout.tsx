import type { ReactNode } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "@/styles/globals.css";
import "@/styles/admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="admin-shell">
          <AdminSidebar />
          <div className="admin-main">
            <AdminHeader />
            <main className="admin-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
