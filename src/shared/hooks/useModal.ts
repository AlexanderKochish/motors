"use client";

import { useState, useCallback } from "react";

type ModalType = "appointment" | "review" | "success" | null;

interface UseModalReturn {
  isModalOpen: boolean;
  modalType: ModalType;
  serviceName: string;
  successMessage: string;
  openModal: (type: ModalType, serviceName?: string, message?: string) => void;
  closeModal: () => void;
}

export function useModal(): UseModalReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [serviceName, setServiceName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const openModal = useCallback((type: ModalType, serviceName: string = "", message = "") => {
    setModalType(type);
    setServiceName(serviceName);
    setSuccessMessage(message);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalType(null);
    setServiceName("");
    setSuccessMessage("");
    document.body.style.overflow = "unset";
  }, []);

  return {
    isModalOpen,
    modalType,
    serviceName,
    successMessage,
    openModal,
    closeModal,
  };
}
