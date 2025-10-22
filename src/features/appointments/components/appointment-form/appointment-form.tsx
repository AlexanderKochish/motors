import React, { useActionState, useEffect, useRef } from "react";
import styles from "./appointment-form.module.css";
import { submitAppointment } from "@/app/actions/appointments";
import { useModalContext } from "@/shared/hooks/useModalContext";
import { useServices } from "@/features/services/hooks/useServices";

interface Props {
  formSource?: "main" | "modal";
  onSuccess?: (msg: string) => void;
  serviceName?: string;
}

const AppointmentForm = ({ formSource = "main", onSuccess, serviceName }: Props) => {
  const [state, formAction, pending] = useActionState(submitAppointment, {
    errors: {},
    success: false,
    successMessage: "",
  });
  const { data: services, isLoading } = useServices();

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

  const serviceTitles = services?.map((service) => service.title) || [];

  const hasServiceNameInDatabase = serviceName && serviceTitles.includes(serviceName);

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
        <select
          defaultValue={hasServiceNameInDatabase ? serviceName : ""}
          name="service_type"
          className={state.errors?.service_type ? styles.error : ""}
           aria-label="Select Service Type"
        >
          <option value="">Select Service</option>

          {isLoading ? (
            <option value="" disabled>
              Loading services...
            </option>
          ) : (
            <>
              {services?.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title.charAt(0).toUpperCase() + service.title.slice(1)}
                </option>
              ))}
            </>
          )}
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

      <button disabled={pending} type="submit" className={styles.submitBtn}>
        {pending ? "Submitting..." : "Book Appointment"}
      </button>
    </form>
  );
};

export default AppointmentForm;
