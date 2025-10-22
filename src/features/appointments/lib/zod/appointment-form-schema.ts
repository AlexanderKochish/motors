import { irishPhoneRegex } from "@/shared/regex";
import { z } from "zod";
export const appointmentFormSchema = z.object({
  first_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Your name must be no more than 25 characters."),
  phone: z.string().regex(irishPhoneRegex, "Please enter a valid phone number"),
  service_type: z.string().min(1, "Please select a service"),
  message: z.string().max(500, "The review must be no more than 500 characters.").optional(),
  source: z.enum(["main", "modal"]),
});

export type AppointmentFormInputs = z.infer<typeof appointmentFormSchema>;
