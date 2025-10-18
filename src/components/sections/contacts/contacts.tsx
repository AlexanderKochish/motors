import React from "react";
import styles from "./contacts.module.css";
import AppointmentForm from "@/components/forms/appointment-form/appointment-form";
import SectionHeader from "@/components/ui/section-header/section-header";
import { useModalContext } from "@/hooks/useModalContext";
import { useCompanyContact } from "@/hooks/useCompanyContact";

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
                src="https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d2151.748478054804!2d-7.979494328558349!3d53.41912772751389!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m0!4m3!3m2!1d53.4192707!2d-7.9796128!5e1!3m2!1sen!2sie!4v1760712968721!5m2!1sen!2sie"
                className={styles.mapIframe}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Monksland Motors Location"
              />
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
