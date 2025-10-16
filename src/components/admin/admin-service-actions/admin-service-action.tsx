import React from "react";
import styles from "./admin-service-action.module.css";

interface AdminActionsProps {
  onDelete: (id: string) => void;
  serviceId?: string;
  serviceTitle?: string;
}

export const AdminActions = ({ onDelete, serviceId, serviceTitle }: AdminActionsProps) => {
  return (
    <div className={styles.adminActions}>
      {serviceId && (
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(serviceId)}
          aria-label="Delete service"
          title="Delete service"
        ></button>
      )}
    </div>
  );
};
