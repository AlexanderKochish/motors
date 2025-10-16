import React from "react";
import styles from "./appointment-card.module.css";
import TableCard from "@/components/ui/table-card/table-card";
import { Appointments } from "@/types";
import { getStatusVariant } from "@/utils/helpers/getStatusVariant";
import { useAppointments } from "@/hooks/useAppointments";

interface Props {
  appointment: Appointments;
}

const AppointmentCard = ({ appointment }: Props) => {
  const { id } = appointment;
  const { remove, updateStatus, isUpdateStatusPending, isRemovePending } = useAppointments(
    appointment.status,
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "confirmed":
        return "✅";
      case "completed":
        return "✓";
      case "cancelled":
        return "✕";
      default:
        return "📅";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TableCard key={id}>
      {/* Compact Header */}
      <div className={styles.cardHeader}>
        <div className={styles.mainInfo}>
          <div className={styles.avatar}>{appointment.first_name.charAt(0).toUpperCase()}</div>
          <div className={styles.customerMain}>
            <h3 className={styles.customerName}>{appointment.first_name}</h3>
            <span className={styles.phone}>{appointment.phone}</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={`${styles.statusBadge} ${styles[getStatusVariant(appointment.status)]}`}>
            {getStatusIcon(appointment.status)} {appointment.status}
          </span>
          <span className={styles.date}>{formatDate(appointment.created_at)}</span>
        </div>
      </div>

      {/* Service Info */}
      <div className={styles.serviceSection}>
        <span className={styles.serviceLabel}>Service:</span>
        <span className={styles.serviceType}>{appointment.service_type}</span>
      </div>

      {/* Message if exists */}
      {appointment.message && (
        <div className={styles.messageSection}>
          <p className={styles.messageText}>{appointment.message}</p>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actionsSection}>
        <div className={styles.statusActions}>
          {appointment.status === "pending" && (
            <div className={styles.actionGroup}>
              <button
                disabled={isUpdateStatusPending}
                onClick={() => updateStatus({ id, status: "confirmed" })}
                className={`${styles.actionButton} ${styles.confirmButton}`}
              >
                ✓ Confirm
              </button>
              <button
                disabled={isUpdateStatusPending}
                onClick={() => updateStatus({ id, status: "completed" })}
                className={`${styles.actionButton} ${styles.completeButton}`}
              >
                ✓ Complete
              </button>
              <button
                disabled={isUpdateStatusPending}
                onClick={() => updateStatus({ id, status: "cancelled" })}
                className={`${styles.actionButton} ${styles.cancelButton}`}
              >
                ✕ Cancel
              </button>
            </div>
          )}

          {appointment.status === "confirmed" && (
            <div className={styles.actionGroup}>
              <button
                disabled={isUpdateStatusPending}
                onClick={() => updateStatus({ id, status: "completed" })}
                className={`${styles.actionButton} ${styles.completeButton}`}
              >
                ✓ Complete
              </button>
              <button
                disabled={isUpdateStatusPending}
                onClick={() => updateStatus({ id, status: "cancelled" })}
                className={`${styles.actionButton} ${styles.cancelButton}`}
              >
                ✕ Cancel
              </button>
            </div>
          )}

          {(appointment.status === "completed" || appointment.status === "cancelled") && (
            <div className={styles.finalStatus}>
              <span>Appointment {appointment.status}</span>
            </div>
          )}
        </div>

        <button
          disabled={isRemovePending}
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this appointment?")) {
              remove({ id });
            }
          }}
          className={`${styles.actionButton} ${styles.deleteButton}`}
        >
          🗑️ {isRemovePending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </TableCard>
  );
};

export default AppointmentCard;
