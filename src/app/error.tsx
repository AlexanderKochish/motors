"use client";

import { useRouter } from "next/navigation";
import styles from "./error-page.module.css";

export default function ErrorPage() {
  const router = useRouter();

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <div className={styles.wrench}>🔧</div>
          <div className={styles.car}>🚗</div>
        </div>

        <h1 className={styles.title}>Oops! Something went wrong</h1>

        <p className={styles.description}>
          We're sorry for the inconvenience. Our team has been notified and is working to fix the
          issue.
        </p>

        <div className={styles.actions}>
          <button onClick={handleRetry} className={styles.primaryButton}>
            Try Again
          </button>
          <button onClick={handleGoBack} className={styles.secondaryButton}>
            Go Back
          </button>
          <button onClick={handleGoHome} className={styles.tertiaryButton}>
            Go Home
          </button>
        </div>

        <div className={styles.help}>
          <p>Still need help?</p>
          <a href="mailto:support@monkslandmotors.com" className={styles.helpLink}>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
