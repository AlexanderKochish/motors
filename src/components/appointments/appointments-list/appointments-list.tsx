import React from "react";
import styles from "./appointments-list.module.css";
import { Appointments } from "@/types";
import AppointmentCard from "../appointment-card/appointment-card";

interface Props {
  appointments?: Appointments[];
}

const AppointmentsList = ({ appointments }: Props) => {
  return (
    <div className={styles.spaceY4}>
      {appointments &&
        appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
    </div>
  );
};

export default AppointmentsList;
