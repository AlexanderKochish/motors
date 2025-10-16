"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useModal } from "@/hooks/useModal";

interface ModalContextType {
  isModalOpen: boolean;
  modalType: "appointment" | "review" | "success" | null;
  serviceName: string;
  successMessage: string;
  openModal: (
    type: "appointment" | "review" | "success" | null,
    serviceName?: string,
    message?: string,
  ) => void;
  closeModal: () => void;
  handleBookAppointment: (serviceName?: string) => void;
  handleFormSuccess: (message: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const modal = useModal();

  const handleBookAppointment = (serviceName: string = "General Appointment") => {
    modal.openModal("appointment", serviceName);
  };

  const handleFormSuccess = (message: string) => {
    modal.openModal("success", "", message);
    setTimeout(() => {
      modal.closeModal();
    }, 2000);
  };

  const value = {
    ...modal,
    handleBookAppointment,
    handleFormSuccess,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
