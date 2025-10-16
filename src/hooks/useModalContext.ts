import { ModalContext } from "@/providers/ModalProvider/modal-provider";
import { useContext } from "react";

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
