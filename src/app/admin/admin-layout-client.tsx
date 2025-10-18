"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/admin-header/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar/admin-sidebar";
import styles from "./layout.module.css";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.dashboard}>
      <AdminHeader onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={styles.container}>
        <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className={styles.main}>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </div>
  );
}
