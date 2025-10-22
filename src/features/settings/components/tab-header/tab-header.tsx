import React, { ReactNode } from "react";
import styles from "./tab-header.module.css";
interface Props {
  title?: string;
  description?: string;
  children?: ReactNode;
}

const TabHeader = ({ title, description, children }: Props) => {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionDescription}>{description}</p>
      {children}
    </div>
  );
};

export default TabHeader;
