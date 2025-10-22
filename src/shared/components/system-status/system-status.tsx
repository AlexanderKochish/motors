"use client";

import { useSystemStatus } from "@/shared/hooks/useSystemStatus";
import styles from "./system-status.module.css";

export default function SystemStatus() {
  const { isOnline, isLoading } = useSystemStatus();

  if (isLoading) {
    return (
      <div className={styles.status}>
        <div className={styles.dot}></div>
        <span>Checking system status...</span>
      </div>
    );
  }

  return (
    <div className={styles.status}>
      <div className={`${styles.dot} ${isOnline ? styles.online : styles.offline}`}></div>
      <span>System {isOnline ? "Online" : "Offline"}</span>
    </div>
  );
}
