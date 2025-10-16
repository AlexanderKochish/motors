"use client";

import { useState } from "react";
import { AppointmentFormInputs, ReviewFormInputs } from "@/schemas/form";
import { submitAppointment, submitReview } from "@/lib/services/sendForm";

interface UseFormHandlerReturn {
  isSubmitting: boolean;
  handleAppointmentSubmit: (data: AppointmentFormInputs) => Promise<boolean>;
  handleReviewSubmit: (data: ReviewFormInputs) => Promise<boolean>;
}

export function useFormHandler(): UseFormHandlerReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAppointmentSubmit = async (data: AppointmentFormInputs): Promise<boolean> => {
    setIsSubmitting(true);

    try {
      await submitAppointment(data);
      return true;
    } catch (error) {
      console.error("Error submitting appointment:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewSubmit = async (data: ReviewFormInputs): Promise<boolean> => {
    setIsSubmitting(true);

    try {
      await submitReview(data);
      return true;
    } catch (error) {
      console.error("Error submitting review:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleAppointmentSubmit,
    handleReviewSubmit,
  };
}
