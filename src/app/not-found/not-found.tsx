"use client";

import React from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <Link href="/" className={styles.homeButton}>
          ⬅️ Back to Home
        </Link>
      </div>
    </div>
  );
}
