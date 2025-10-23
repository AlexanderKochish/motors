import React, { ReactNode } from "react";
import styles from "./service-card.module.css";
import { ServiceCardType } from "@/types";

interface Props {
  service: ServiceCardType;
  children?: ReactNode;
  onBookAppointment?: (serviceName: string) => void;
}

const ServiceCard = ({ service, children, onBookAppointment }: Props) => {
  return (
    <div key={service.id} className={styles.serviceCard}>
      <div className={styles.serviceImage}>
        {service.image && (
          <img
            src={service.image}
            className={styles.image}
            alt={service.alt ?? service.title}
            loading="lazy"
          />
        )}
      </div>
      <h3 className={styles.serviceTitle}>{service.title}</h3>
      <p className={styles.serviceDescription}>{service.description}</p>
      {service.price && <div className={styles.servicePrice}>{service.price}</div>}
      <button
        type="button"
        className={styles.serviceBtn}
        onClick={() => onBookAppointment?.(service.title)}
        aria-label={`Book ${service.title} service`}
      >
        Book Now
      </button>
      {children && <div className={styles.adminActionsContainer}>{children}</div>}
    </div>
  );
};

export default ServiceCard;
