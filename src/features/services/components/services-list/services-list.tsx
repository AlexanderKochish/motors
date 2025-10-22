import React, { ReactNode } from "react";
import styles from "./services-list.module.css";
import { ServiceCardType } from "@/types";
import ServiceCard from "@/features/services/components/service-card/service-card";

interface Props {
  services: ServiceCardType[] | undefined;
  actions?: (service: ServiceCardType) => ReactNode;
  onBookAppointment?: (serviceName?: string) => void;
}

const ServicesList = ({ services, actions, onBookAppointment }: Props) => {
  return (
    <div className={styles.servicesGrid}>
      {services &&
        services.map((service) => (
          <ServiceCard key={service.id} service={service} onBookAppointment={onBookAppointment}>
            {actions && actions(service)}
          </ServiceCard>
        ))}
    </div>
  );
};

export default ServicesList;
