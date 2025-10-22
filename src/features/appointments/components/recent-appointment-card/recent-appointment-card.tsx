import { Appointments } from "@/types";
import styles from "./recent-appointment-card.module.css";
import React, { useState } from "react";
import { getStatusVariant } from "@/shared/utils/helpers/getStatusVariant";

interface Props {
  appointment: Appointments;
}

const RecentAppointmentCard = ({ appointment }: Props) => {
  const [isView, setIsView] = useState(false);
  return (
    <div key={appointment.id} className={styles.appointmentItem}>
      <div className={styles.appointmentInfo}>
        <div className={styles.appointmentHeader}>
          <span className={styles.customerName}>{appointment.first_name}</span>
          <span className={`${styles.badge} ${styles[getStatusVariant(appointment.status)]}`}>
            {appointment.status}
          </span>
        </div>
        <div className={styles.appointmentDetails}>
          {appointment.service_type} • {new Date(appointment.created_at).toLocaleString()}
          {isView && (
            <div className={styles.viewMessage}>
              <span>Message:</span>
              <p>{appointment.message}</p>
            </div>
          )}
        </div>
      </div>
      <button onClick={() => setIsView((prev) => !prev)} className={styles.viewButton}>
        View
      </button>
    </div>
  );
};

export default RecentAppointmentCard;
