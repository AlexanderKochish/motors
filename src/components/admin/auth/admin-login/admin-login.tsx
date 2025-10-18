"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/login";
import styles from "./admin-login.module.css";

export default function AdminLogin() {
  const [state, formAction] = useActionState(login, { errors: {} });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🔧</span>
          <h1 className={styles.logoTitle}>Monksland Motors</h1>
        </div>

        <h2 className={styles.loginTitle}>Admin Login</h2>
        <p className={styles.loginSubtitle}>Access the management dashboard</p>

        <form className={styles.form} action={formAction}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="admin@example.rom"
              className={styles.formInput}
            />
            {state.errors?.email?._errors && (
              <p className={styles.errorText}>{state.errors.email._errors[0]}</p>
            )}
          </div>

          {state.errors?._errors && (
            <div className={styles.errorBox}>
              {state.errors._errors.map((err, i) => (
                <p key={i} className={styles.errorText}>
                  {err}
                </p>
              ))}
            </div>
          )}

          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
