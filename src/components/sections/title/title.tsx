"use client";

import React from "react";
import Image from "next/image";
import styles from "./title.module.css";
import { useModalContext } from "@/hooks/useModalContext";
import { useCompanyContact } from "@/hooks/useCompanyContact";

interface ContactItem {
  icon: string;
  text: string;
}

export default function Title() {
  const { handleBookAppointment } = useModalContext();
  const { contact } = useCompanyContact();
  const contactItems: ContactItem[] = [
    { icon: "📞", text: contact?.phone_number ?? "" },
    { icon: "⏰", text: contact?.working_hours ?? "" },
    { icon: "📍", text: contact?.address ?? "" },
  ];

  return (
    <section className={styles.title} id="hero">
      <div className={styles.titleBackground}>
        <div className={styles.locationBackground}></div>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.floatingShapes}>
          <div className={`${styles.shape} ${styles.square}`}></div>
          <div className={`${styles.shape} ${styles.square2}`}></div>
          <div className={`${styles.shape} ${styles.circle}`}></div>
          <div className={`${styles.shape} ${styles.circle2}`}></div>
          <div className={`${styles.shape} ${styles.triangle}`}></div>
          <div className={`${styles.shape} ${styles.triangle2}`}></div>
        </div>
      </div>

      <div className={styles.titleContent}>
        <div className={styles.locationBadge}>
          <span className={styles.locationIcon} aria-hidden="true">
            📍
          </span>
          <span className={styles.locationText}>Monksland, Athlone</span>
        </div>

        <h1 className={styles.mainTitle}>Professional Car Repair Services</h1>
        <div className={styles.titleSubtitle}>
          Restoring your vehicle to perfect condition in the heart of Ireland
        </div>
        <p className={styles.titleDescription}>
          Complete range of car diagnostics, repair and maintenance services. We work quickly,
          efficiently and provide warranty on all types of work.
        </p>

        <button
          className={styles.ctaButton}
          onClick={() => handleBookAppointment("General Appointment")}
          aria-label="Book an appointment"
        >
          Book an Appointment
        </button>

        <div className={styles.contactInfo}>
          {contactItems.map((item, index) => (
            <div key={index} className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.titleCar}>
        <Image
          src="https://catalog-management.s3.ap-south-1.amazonaws.com/htmobile1/bmw_m5/images/exterior_bmw-m5_left-side-view_600x400.jpg"
          alt="BMW M5 in professional car service"
          width={600}
          height={400}
          priority
          quality={85}
          className={styles.carImage}
        />
      </div>
    </section>
  );
}
