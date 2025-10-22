import React from "react";
import styles from "./footer.module.css";
import FooterAddress from "@/shared/components/footer-address/footer-address";
import logo from "../../../public/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.logo}>
              <Image src={logo} width={40} height={40} alt="logo" className={styles.logoImg} />
              <span>Monksland Motors</span>
            </div>
            <p className={styles.footerDescription}>Professional car repair since 2024</p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4>Services</h4>
              <ul>
                <li>
                  <a href="#services">Diagnostics</a>
                </li>
                <li>
                  <a href="#services">Maintenance</a>
                </li>
                <li>
                  <a href="#services">Engine Repair</a>
                </li>
                <li>
                  <a href="#services">Suspension</a>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#advantages">About Us</a>
                </li>
                <li>
                  <a href="#testimonials">Reviews</a>
                </li>
                <li>
                  <a href="#gallery">Our Work</a>
                </li>
                <li>
                  <a href="#contacts">Contacts</a>
                </li>
              </ul>
            </div>
            <FooterAddress />
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>© 2024 Monksland Motors. All rights reserved.</div>
          <div className={styles.footerPolicy}>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
