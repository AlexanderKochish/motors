"use client";

import React from "react";
import styles from "./header.module.css";
import { useHeaderNavigation } from "@/shared/hooks/useHeaderNavigation";
import { useCompanyContact } from "@/shared/hooks/useCompanyContact";
import { NavLink } from "@/types";
import Image from "next/image";
import logo from "../../../public/logo.png";

export default function Header() {
  const { isScrolled, isMenuOpen, activeSection, toggleMenu, handleLinkClick } =
    useHeaderNavigation({
      header: styles.header,
      navMenu: styles.navMenu,
      navToggle: styles.navToggle,
    });
  const { contact } = useCompanyContact();

  const navLinks: NavLink[] = [
    { href: "#hero", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#advantages", label: "Advantages" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contacts", label: "Contacts" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`} role="banner">
      <nav className={styles.navbar} aria-label="Main navigation">
        <div className={styles.navContainer}>
          <div className={styles.navLogo}>
            <a
              href="#hero"
              className={styles.logoLink}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                handleLinkClick("#hero");
              }}
              aria-label="Monksland Motors - Go to home"
            >
              <div className={styles.logoIcon} aria-hidden="true">
                <Image
                  src={logo}
                  width={40}
                  height={40}
                  alt="logo"
                  className={styles.logoImg}
                  loading="lazy"
                />
              </div>
              <span className={styles.logoText}>Monksland Motors</span>
            </a>
          </div>

          <div
            className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}
            role="navigation"
            aria-label="Main menu"
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`${styles.navLink} ${
                  activeSection === href.replace("#", "") ? styles.active : ""
                }`}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  handleLinkClick(href);
                }}
                aria-current={activeSection === href.replace("#", "") ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </div>

          <div className={styles.navActions}>
            <a
              href={`tel:${contact?.phone_number}`}
              className={styles.phoneLink}
              aria-label={`Call us at ${contact?.phone_number}`}
            >
              <span className={styles.phoneIcon} aria-hidden="true">
                📞
              </span>
              <span className={styles.phoneNumber}>{contact?.phone_number}</span>
            </a>

            <button
              className={`${styles.navToggle} ${isMenuOpen ? styles.active : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="main-menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
