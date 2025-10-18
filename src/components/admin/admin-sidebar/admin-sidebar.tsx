"use client";

import Link from "next/link";
import styles from "./admin-sidebar.module.css";
import { useParams, usePathname } from "next/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "appointments", label: "Appointments", icon: "📅" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
  { id: "services", label: "Services", icon: "🔧" },
  { id: "gallery", label: "Gallery", icon: "🖼️" },
  { id: "customers", label: "Customers", icon: "👥" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleItemClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={`${styles.mobileOverlay} ${isOpen ? styles.mobileOverlayVisible : ""}`}
        onClick={onClose}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <nav className={styles.nav}>
          <div className={styles.menu}>
            {menuItems.map((item) => {
              const isActive = pathname === `/admin/${item.id}`;
              return (
                <Link
                  href={`/admin/${item.id}`}
                  key={item.id}
                  className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ""}`}
                  onClick={handleItemClick}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* <div className={styles.statsSection}>
            <div className={styles.statsTitle}>Quick Stats</div>
            <div className={styles.statsCard}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Today</span>
                <span className={styles.statValue}>8</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>This Week</span>
                <span className={styles.statValue}>42</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Revenue</span>
                <span className={`${styles.statValue} ${styles.statRevenue}`}>€2,847</span>
              </div>
            </div>
          </div> */}
        </nav>
      </aside>
    </>
  );
}
