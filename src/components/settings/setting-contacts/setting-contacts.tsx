import React from "react";
import styles from "./settings-contacts.module.css";
import { useCompanyContact } from "@/hooks/useCompanyContact";
import FormField from "@/components/ui/form-field/form-field";

const SettingContacts = () => {
  const { contact, isUpdatePending, handleSubmit, isCreatePending, control } = useCompanyContact();

  return (
    <form>
      <div className={styles.formGrid}>
        <FormField
          control={control}
          name="companyName"
          type="text"
          label="Company Name"
          placeholder="Enter company name"
        />
        <FormField
          control={control}
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter email address"
        />
        <FormField
          control={control}
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
        />
        <FormField
          control={control}
          name="workingHours"
          label="Working Hours"
          type="text"
          placeholder="Enter working hours"
        />

        <FormField
          control={control}
          name="address"
          as="textarea"
          label="Address"
          placeholder="Enter full address"
          rows={3}
        />
      </div>

      <div className={styles.actionBar}>
        <button
          onClick={handleSubmit}
          disabled={isUpdatePending || isCreatePending}
          className={styles.saveButton}
        >
          {isUpdatePending || isCreatePending ? (
            <>
              <span className={styles.spinner}></span>
              {contact ? "Updating..." : "Creating..."}
            </>
          ) : contact ? (
            "Update Contact Info"
          ) : (
            "Create Contact Info"
          )}
        </button>
      </div>
    </form>
  );
};

export default SettingContacts;
