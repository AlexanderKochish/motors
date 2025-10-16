"use client";

import { useState, useEffect } from "react";
import styles from "./settings-manager.module.css";
import { useCompanyContact } from "@/hooks/useCompanyContact";
import SettingContacts from "../setting-contacts/setting-contacts";
import TabHeader from "../tab-header/tab-header";
import SettingSecurity from "../setting-security/setting-security";

interface SettingsData {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  workingHours: string;

  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  marketingEmails: boolean;

  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsManager() {
  const [activeTab, setActiveTab] = useState<"contacts" | "security">("contacts");

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your company settings and preferences</p>
      </div>

      <div className={styles.settingsLayout}>
        <div className={styles.sidebar}>
          <button
            className={`${styles.tabButton} ${activeTab === "contacts" ? styles.active : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            <span className={styles.tabIcon}>📞</span>
            Contact Information
          </button>

          <button
            className={`${styles.tabButton} ${activeTab === "security" ? styles.active : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <span className={styles.tabIcon}>🔒</span>
            Security
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === "contacts" && (
            <div className={styles.tabContent}>
              <TabHeader
                title="Contact Information"
                description="Update your company contact details that will be displayed on the website"
              />
              <SettingContacts />
            </div>
          )}

          {activeTab === "security" && (
            <div className={styles.tabContent}>
              <TabHeader
                title="Security Settings"
                description=" Change your password and manage account security"
              />
              <SettingSecurity />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
