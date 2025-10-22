import React from "react";
import styles from "./control-panel.module.css";
import { NavSection } from "@/features/services/components/services-manager/services-manager";

interface Props {
  activeSection?: NavSection;
  onSectionChange: (section: NavSection) => void;
}

const ControlPanel = ({ activeSection, onSectionChange }: Props) => {
  const getButtonConfig = () => {
    const baseConfig = [
      { key: "create" as NavSection, label: "Add", icon: "➕" },
      { key: "update" as NavSection, label: "Edit", icon: "✏️" },
      { key: "delete" as NavSection, label: "Delete", icon: "🗑️" },
    ];

    return baseConfig;
  };

  const buttons = getButtonConfig();

  return (
    <div className={styles.controlPanel}>
      <div className={styles.buttonGroup}>
        {buttons.map((button) => (
          <button
            key={button.key}
            onClick={() => onSectionChange(button.key)}
            className={`${styles.controlButton} ${
              activeSection === button.key ? styles.active : ""
            }`}
            title={button.label}
          >
            <span className={styles.icon}>{button.icon}</span>
            <span className={styles.label}>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
