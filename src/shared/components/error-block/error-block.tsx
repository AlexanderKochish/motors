import React from "react";
import styles from "./error-block.module.css";

interface ErrorBlockProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorBlock({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: ErrorBlockProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>

      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
