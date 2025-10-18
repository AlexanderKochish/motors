"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentFormSchema,
  reviewFormSchema,
  type AppointmentFormInputs,
  type ReviewFormInputs,
} from "@/schemas/form";
import styles from "./modal.module.css";
import ReviewForm from "@/components/forms/review-form/review-form";
import AppointmentForm from "@/components/forms/appointment-form/appointment-form";
import { useModalContext } from "@/hooks/useModalContext";

export default function Modal() {
  const { isModalOpen, modalType, serviceName, successMessage, closeModal } = useModalContext();
  const [message, setMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const appointmentForm = useForm<AppointmentFormInputs>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: { source: "modal", service_type: serviceName || "" },
  });

  const reviewForm = useForm<ReviewFormInputs>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { rating: 0 },
  });

  useEffect(() => {
    if (!isModalOpen) {
      setMessage(null);
      appointmentForm.reset();
      reviewForm.reset();
      return;
    }

    if (modalType === "appointment" && serviceName) {
      appointmentForm.setValue("service_type", serviceName);
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, modalType, serviceName, closeModal, appointmentForm, reviewForm]);

  const finalMessage = message || successMessage || "Action completed successfully!";
  const isSuccessVisible = modalType === "success" || message;

  if (!isModalOpen) return null;

  return (
    <div className={`${styles.modalOverlay} ${isModalOpen ? styles.active : ""}`}>
      <div ref={modalRef} className={styles.modalContainer}>
        <button className={styles.modalClose} onClick={closeModal} aria-label="Close modal">
          ×
        </button>

        <div className={styles.modalContent}>
          {isSuccessVisible ? (
            <div
              className={`${styles.successMessage} ${
                modalType === "review" ? styles.reviewSuccess : ""
              }`}
            >
              <div className={styles.successIcon}>{modalType === "review" ? "⭐" : "✅"}</div>
              <p>{finalMessage}</p>
            </div>
          ) : (
            <>
              {modalType === "appointment" && (
                <div className={styles.modalFormContainer}>
                  <h3 className={styles.modalTitle}>Book {serviceName || "an Appointment"}</h3>
                  <AppointmentForm
                    serviceName={serviceName}
                    formSource="modal"
                    onSuccess={(msg) => {
                      setMessage(msg ?? "Appointment successfully booked!");
                      setTimeout(() => {
                        closeModal();
                        setMessage(null);
                      }, 2000);
                    }}
                  />
                </div>
              )}

              {modalType === "review" && (
                <div className={styles.modalFormContainer}>
                  <h3 className={styles.modalTitle}>Write a Review</h3>
                  <ReviewForm
                    onSuccess={() => {
                      setMessage("Thank you! Your review has been submitted.");
                      setTimeout(() => {
                        closeModal();
                        setMessage(null);
                      }, 2000);
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
