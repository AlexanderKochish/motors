import React, { useEffect, useState } from "react";
import styles from "./service-card-preview.module.css";
import { ServiceCardType } from "@/types";
import { ServiceFormData } from "@/features/services/components/service-card-form/service-card-form.schema";
import { useObjectUrl } from "@/shared/hooks/useObjectUrl";
import ServiceCard from "../service-card/service-card";

interface Props {
  service?: ServiceFormData;
  imagePreview?: string;
}

export const ServiceCardPreview = ({ service, imagePreview }: Props) => {
  const fileUrl = useObjectUrl(service?.image instanceof File ? service.image : null);

  const imageUrl = typeof service?.image === "string" ? service.image : fileUrl;

  if (!service) {
    return (
      <div className={styles.cardPreview}>
        <div className={styles.previewTitle}>Card preview:</div>
        <div className={styles.emptyPreview}>Fill the form to see preview</div>
      </div>
    );
  }

  const previewService: ServiceCardType = {
    id: "preview",
    title: service.title || "Service Title",
    description: service.description || "Service description will appear here",
    price: service.price || "$0",
    image: imageUrl,
    alt: service?.alt || "Service image",
  };

  return (
    <div className={styles.cardPreview}>
      <div className={styles.previewTitle}>Card preview:</div>
      {service && <ServiceCard service={previewService} />}
    </div>
  );
};
