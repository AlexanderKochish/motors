"use client";

import React from "react";
import styles from "./services.module.css";
import SectionHeader from "@/components/ui/section-header/section-header";
import ServicesList from "@/components/services/services-list/services-list";
import { useServices } from "@/hooks/useServices";
import { useModalContext } from "@/hooks/useModalContext";

export default function Services() {
  const { data: services } = useServices();
  const { handleBookAppointment } = useModalContext();

  return (
    <section className={styles.services} id="services">
      <div className="container">
        <SectionHeader
          title="Our Services"
          subtitle="Complete range of car repair and maintenance services"
        />
        <ServicesList services={services} onBookAppointment={handleBookAppointment} />
      </div>
    </section>
  );
}
