import React from "react";
import styles from "./contacts.module.css";
import AppointmentForm from "@/components/forms/appointment-form/appointment-form";
import SectionHeader from "@/components/ui/section-header/section-header";
import { useModalContext } from "@/hooks/useModalContext";
import { useCompanyContact } from "@/hooks/useCompanyContact";

const Contacts = () => {
  const { handleFormSuccess } = useModalContext();
  const { contact } = useCompanyContact();

  return (
    <section className={styles.contactsSection} id="contacts">
      <div className="container">
        <SectionHeader
          title="Contacts"
          subtitle="Come to our service center - we're waiting for you!"
        />

        <div className={styles.contactsContent}>
          <div className={styles.contactInfo}>
            <div className={`${styles.contactItem} ${styles.contactItemLarge}`}>
              <div className={styles.contactIcon}>📍</div>
              <div className={styles.contactDetails}>
                <h3>Service Address</h3>
                <p>
                  {contact?.address}
                  <br />
                  {/* <span className={styles.contactNote}>(entrance from the front)</span> */}
                </p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📞</div>
              <div className={styles.contactDetails}>
                <h3>Phone</h3>
                <p>
                  <a href={`tel:${contact?.phone_number}`}>{contact?.phone_number}</a>
                </p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>⏰</div>
              <div className={styles.contactDetails}>
                <h3>Working Hours</h3>

                <p>{contact?.working_hours}</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>✉️</div>
              <div className={styles.contactDetails}>
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${contact?.email_address}`}>{contact?.email_address}</a>
                </p>
              </div>
            </div>

            {/* <div className={styles.socialLinks}>
              <h3>Follow Us</h3>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}>
                  📘
                </a>
                <a href="#" className={styles.socialIcon}>
                  📷
                </a>
                <a href="#" className={styles.socialIcon}>
                  💬
                </a>
                <a href="#" className={styles.socialIcon}>
                  🎥
                </a>
              </div>
            </div> */}
          </div>

          <div className={styles.contactMap}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapContent}>
                <div className={styles.mapPin}>📍</div>
                <h3>Location Map</h3>
                <p>
                  Our service is located in the city center
                  <br />
                  with convenient access and parking
                </p>
                <button className={styles.mapBtn}>Open in Google Maps</button>
              </div>
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
