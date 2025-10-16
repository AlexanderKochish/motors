import React from "react";
import styles from "./section-header.module.css";

interface Props {
  title: string;
  subtitle: string;
}

const SectionHeader = ({ title, subtitle }: Props) => {
  return (
    <>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionSubtitle}>{subtitle}</p>
    </>
  );
};

export default SectionHeader;
