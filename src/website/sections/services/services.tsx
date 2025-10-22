"use client";

import React from "react";
import styles from "./services.module.css";
import SectionHeader from "@/shared/components/section-header/section-header";
import ServicesList from "@/features/services/components/services-list/services-list";
import { useServices } from "@/features/services/hooks/useServices";
import { useModalContext } from "@/shared/hooks/useModalContext";
import ServicesSkeleton from "@/features/services/components/services-skeleton/services-skeleton";
import ErrorBlock from "@/shared/components/error-block/error-block";

export default function Services() {
  const { data: services, isLoading, isError } = useServices();
  const { handleBookAppointment } = useModalContext();

  if (isLoading) {
    return <ServicesSkeleton />;
  }

  return (
    <section className={styles.services} id="services">
      <div className="container">
        <SectionHeader
          title="Our Services"
          subtitle="Complete range of car repair and maintenance services"
        />
        {isError && (
          <ErrorBlock title="Services are currently unavailable. Please try again later." />
        )}
        <ServicesList services={services} onBookAppointment={handleBookAppointment} />
      </div>
    </section>
  );
}
