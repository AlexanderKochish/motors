"use client";
import React from "react";
import styles from "./footer-address.module.css";
import { useCompanyContact } from "@/shared/hooks/useCompanyContact";

const FooterAddress = () => {
  const { contact } = useCompanyContact();
  return (
    <div className={styles.footerColumn}>
      <h4>Contacts</h4>
      <ul className={styles.contacts}>
        <li>📞 {contact?.phone_number}</li>
        <li>📍 {contact?.address}</li>
        <li>⏰ {contact?.working_hours}</li>
      </ul>
    </div>
  );
};

export default FooterAddress;
