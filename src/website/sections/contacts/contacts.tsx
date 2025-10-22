import React from "react";
import styles from "./contacts.module.css";
import AppointmentForm from "@/features/appointments/components/appointment-form/appointment-form";
import SectionHeader from "@/shared/components/section-header/section-header";
import { useModalContext } from "@/shared/hooks/useModalContext";
import { useCompanyContact } from "@/shared/hooks/useCompanyContact";

const Contacts = () => {
  const { handleFormSuccess } = useModalContext();
  const { contact } = useCompanyContact();

  const { address, phone_number, working_hours, email_address } = contact || {};

  return (
    <section className={styles.contactsSection} id="contacts">
      <div className="container">
        <SectionHeader
          title="Contacts"
          subtitle="Come to our service center — we're waiting for you!"
        />

        <div className={styles.contactsContent}>
          <div className={styles.contactInfo}>
            <article className={`${styles.contactItem} ${styles.contactItemLarge}`}>
              <div className={styles.contactIcon}>📍</div>
              <div className={styles.contactDetails}>
                <h3>Service Address</h3>
                <address>{address}</address>
              </div>
            </article>

            <article className={styles.contactItem}>
              <div className={styles.contactIcon}>📞</div>
              <div className={styles.contactDetails}>
                <h3>Phone</h3>
                <p>
                  <a href={`tel:${phone_number}`}>{phone_number}</a>
                </p>
              </div>
            </article>

            <article className={styles.contactItem}>
              <div className={styles.contactIcon}>⏰</div>
              <div className={styles.contactDetails}>
                <h3>Working Hours</h3>
                <p>{working_hours}</p>
              </div>
            </article>

            <article className={styles.contactItem}>
              <div className={styles.contactIcon}>✉️</div>
              <div className={styles.contactDetails}>
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${email_address}`}>{email_address}</a>
                </p>
              </div>
            </article>
          </div>

          <div className={styles.contactMap}>
            <div className={styles.mapContainer}>
              <iframe
                className={styles.mapIframe}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Monksland Motors Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d537.9377878561141!2d-7.980322930356989!3d53.419074897511045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485c49f0a8b6f91d%3A0x8aaf8c8025f69f67!2sMonksland%20Motors!5e1!3m2!1sen!2sie!4v1761165202512!5m2!1sen!2sie"
              ></iframe>
            </div>
          </div>
        </div>

        <div className={styles.appointmentWidget}>
          <h3>Book Online</h3>
          <AppointmentForm onSuccess={handleFormSuccess} />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
