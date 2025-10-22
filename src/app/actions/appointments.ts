"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { AppointmentService } from "@/features/appointments/repositories/appointmet";
import { Appointments, AppointmentStatus } from "@/types";
import { appointmentFormSchema } from "@/features/appointments/lib/zod/appointment-form-schema";

type AppointmentFormState = {
  errors: {
    first_name?: { _errors: string[] };
    phone?: { _errors: string[] };
    service_type?: { _errors: string[] };
    source?: { _errors: string[] };
    message?: { _errors: string[] };
    _errors?: string[];
  };
  success: boolean;
  successMessage: string;
};

const service = new AppointmentService();

export async function submitAppointment(
  _prevState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const validatedFields = appointmentFormSchema.safeParse({
    first_name: formData.get("first_name"),
    phone: formData.get("phone"),
    service_type: formData.get("service_type"),
    source: formData.get("source"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    const treeified = z.treeifyError(validatedFields.error);
    return {
      errors: {
        first_name: { _errors: treeified.properties?.first_name?.errors ?? [] },
        phone: { _errors: treeified.properties?.phone?.errors ?? [] },
        service_type: { _errors: treeified.properties?.service_type?.errors ?? [] },
        source: { _errors: treeified.properties?.source?.errors ?? [] },
        message: { _errors: treeified.properties?.message?.errors ?? [] },
        _errors: treeified.errors ?? [],
      },
      success: false,
      successMessage: "",
    };
  }

  const data = validatedFields.data;

  try {
    const { error } = await service.submitAppointment(data);

    if (error) {
      console.error("Appointment submission error:", error);
      return {
        errors: { _errors: [error] },
        success: false,
        successMessage: "",
      };
    }

    revalidatePath("/");
    return {
      errors: {},
      success: true,
      successMessage: "Your appointment has been successfully booked!",
    };
  } catch (error) {
    console.error("Appointment submission failed:", error);
    return {
      errors: {
        _errors: [error instanceof Error ? error.message : "Failed to submit appointment"],
      },
      success: false,
      successMessage: "",
    };
  }
}

export async function getAllRecentAppointments() {
  try {
    return await service.getAllRecentAppointments();
  } catch (error) {
    throw new Error("Failed to get all appointments");
  }
}

export async function getApplicationsPage(
  page = 1,
  limit: number = 6,
  status: AppointmentStatus = "all",
  searchTerm: string = "",
): Promise<{
  data: Appointments[];
  total: number;
  status: AppointmentStatus;
  searchTerm: string;
  page: number;
  totalPages: number;
}> {
  return await service.getApplicationsPage(page, limit, status, searchTerm);
}

export async function updateAppointmentStatusById(id: string, status: AppointmentStatus) {
  return await service.findByIdAndUpdateStatus(id, status);
}

export async function removeAppointment(id: string) {
  return await service.removeAppointment(id);
}

export async function getAppointmentCounts() {
  return await service.getAppointmentCounts();
}
