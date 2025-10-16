import React from "react";
import styles from "./setting-security.module.css";
import FormField from "@/components/ui/form-field/form-field";
import { useSecurity } from "@/hooks/useSecurity";

const SettingSecurity = () => {
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    newPassword,
    confirmPassword,
    getPasswordStrength,
    getPasswordRequirements,
  } = useSecurity();

  const passwordStrength = getPasswordStrength(newPassword);
  const requirements = getPasswordRequirements(newPassword);
  return (
    <form className={styles.securityForm}>
      <div className={styles.formGrid}>
        <FormField
          control={control}
          type="password"
          name="currentPassword"
          label="Current Password"
          placeholder="Enter current password"
        />
        <FormField
          control={control}
          name="newPassword"
          type="password"
          label="New Password"
          required
          placeholder="Enter new password"
        />

        <FormField
          control={control}
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          required
          placeholder="Confirm new password"
        />
      </div>

      <div className={styles.passwordRequirements}>
        <h4 className={styles.requirementsTitle}>Password Requirements:</h4>
        <ul className={styles.requirementsList}>
          <li className={requirements.hasMinLength ? styles.requirementMet : ""}>
            At least 6 characters long
          </li>
          <li className={requirements.hasUppercase ? styles.requirementMet : ""}>
            One uppercase letter
          </li>
          <li className={requirements.hasNumber ? styles.requirementMet : ""}>One number</li>
        </ul>
      </div>

      {/* Action Bar */}
      <div className={styles.actionBar}>
        <button type="submit" disabled={isSubmitting} className={styles.saveButton}>
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span>
              Updating...
            </>
          ) : (
            "Change Password"
          )}
        </button>
      </div>
    </form>
  );
};

export default SettingSecurity;
