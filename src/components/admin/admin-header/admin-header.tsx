"use client";

import { useTheme } from "@/hooks/useTheme";
import styles from "./admin-header.module.css";
import SystemStatus from "@/components/ui/system-status/system-status";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/app/actions/login";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

interface AdminHeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export default function AdminHeader({ onMenuToggle, isSidebarOpen }: AdminHeaderProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: admin } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("role", "admin")
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
  };

  if (!mounted) {
    return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.skeletonHeader}></div>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerInner}>
          <div className={styles.brandSection}>
            <div className={styles.brand}>
              <div className={styles.logo}>
                <span>MM</span>
              </div>
              <div className={styles.brandText}>
                <h1>Monksland Motors Admin</h1>
                <p>Auto Service Management</p>
              </div>
              <span className={styles.liveBadge}>Live</span>
            </div>
          </div>
          <div className={styles.actions}>
            <SystemStatus />

            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* <button className={styles.supportButton}>Support</button> */}
            <div className={styles.avatarContainer} ref={dropdownRef}>
              <button
                className={styles.avatar}
                onClick={handleAvatarClick}
                aria-label="User menu"
                aria-expanded={isDropdownOpen}
              >
                <span>A</span>
              </button>

              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.userInfo}>
                    <p className={styles.userName}>Admin User</p>
                    <p className={styles.userEmail}>{admin?.email}</p>
                  </div>
                  <div className={styles.dropdownDivider}></div>
                  {/* <button className={`${styles.dropdownItem} ${styles.profileItem}`}>
                    Profile
                  </button>
                  <button className={`${styles.dropdownItem} ${styles.settingsItem}`}>
                    Settings
                  </button>
                  <div className={styles.dropdownDivider}></div> */}
                  <button
                    className={`${styles.dropdownItem} ${styles.logoutItem}`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>{" "}
          <button
            className={styles.mobileMenuButton}
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <span className={styles.menuIcon}>{isSidebarOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
