import React from "react";
import styles from "./filter-panel.module.css";
import { AppointmentStatus } from "@/types";

interface FilterOption {
  id: AppointmentStatus;
  label: string;
  count?: number;
}

interface FilterPanelProps {
  activeFilter?: AppointmentStatus;
  onFilterChange?: (filter: AppointmentStatus) => void;
  filters?: FilterOption[];
}

const FilterPanel = ({ activeFilter = "pending", onFilterChange, filters }: FilterPanelProps) => {
  return (
    <div className={styles.segmentedControl}>
      {filters &&
        filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange?.(filter.id)}
            className={`
            ${styles.segment}
            ${activeFilter === filter.id ? styles.segmentActive : ""}
          `}
          >
            <span className={styles.segmentLabel}>{filter.label}</span>
            {filter.count !== undefined && (
              <span className={styles.segmentCount}>{filter.count}</span>
            )}
          </button>
        ))}
    </div>
  );
};

export default FilterPanel;
