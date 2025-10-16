import React, { useActionState, useEffect, useRef } from "react";
import styles from "./appointment-form.module.css";
import { submitAppointment } from "@/app/actions/appointments";

interface Props {
  formSource?: "main" | "modal";
  onSuccess?: (msg: string) => void;
}

const AppointmentForm = ({ formSource = "main", onSuccess }: Props) => {
  const [state, formAction, pending] = useActionState(submitAppointment, {
    errors: {},
    success: false,
    successMessage: "",
  });

  const hasCalledSuccess = useRef(false);

  useEffect(() => {
    if (state.success && onSuccess && !hasCalledSuccess.current) {
      hasCalledSuccess.current = true;
      onSuccess?.(state.successMessage || "Appointment successfully booked!");
    }
  }, [state.success, onSuccess, state.successMessage]);

  useEffect(() => {
    if (pending) {
      hasCalledSuccess.current = false;
    }
  }, [pending]);

  return (
    <form action={formAction} className={styles.appointmentForm}>
      <input type="hidden" name="source" value={formSource} />

      <div className={formSource === "main" ? styles.formRow : styles.formColumn}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Your Name"
            required
            name="first_name"
            className={state.errors?.first_name ? styles.error : ""}
          />
          {state.errors?.first_name?._errors && (
            <span className={styles.errorMessage}>{state.errors.first_name._errors[0]}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="tel"
            placeholder="Your Phone"
            required
            name="phone"
            className={state.errors?.phone ? styles.error : ""}
          />
          {state.errors?.phone?._errors && (
            <span className={styles.errorMessage}>{state.errors.phone._errors[0]}</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <select name="service_type" className={state.errors?.service_type ? styles.error : ""}>
          <option value="">Select Service</option>
          <option value="diagnostic">Diagnostics</option>
          <option value="service">Maintenance</option>
          <option value="engine">Engine Repair</option>
          <option value="suspension">Suspension</option>
          <option value="electric">Car Electrics</option>
          <option value="body">Body Repair</option>
        </select>
        {state.errors?.service_type?._errors && (
          <span className={styles.errorMessage}>{state.errors.service_type._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <textarea
          name="message"
          placeholder="Comment (optional)"
          rows={3}
          className={state.errors?.message ? styles.error : ""}
        ></textarea>
        {state.errors?.message?._errors && (
          <span className={styles.errorMessage}>{state.errors.message._errors[0]}</span>
        )}
      </div>

      {/* {state.errors?._form?._errors && (
        <div className={styles.formGroup}>
          <span className={styles.errorMessage}>
            {state.errors._form._errors[0]}
          </span>
        </div>
      )} */}

      <button disabled={pending} type="submit" className={styles.submitBtn}>
        {pending ? "Submitting..." : "Book Appointment"}
      </button>
    </form>
  );
};

export default AppointmentForm;
