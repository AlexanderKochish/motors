"use client";

import React from "react";
import styles from "./services-skeleton.module.css"; // Только стили скелетона

const ServicesSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <div key={index} className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonTextLarge}></div>
      <div className={styles.skeletonTextMedium}></div>
      <div className={styles.skeletonTextMedium}></div>
      <div className={styles.skeletonTextSmall}></div>
      <div className={styles.skeletonButton}></div>
    </div>
  ));

  return (
    <section className={styles.skeletonServices} id="services">
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonHeader}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonSubtitle}></div>
        </div>
        <div className={styles.skeletonGrid}>{skeletonCards}</div>
      </div>
    </section>
  );
};

export default ServicesSkeleton;
