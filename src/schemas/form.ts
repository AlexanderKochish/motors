import { z } from "zod";

const irishPhoneRegex =
  /^(?:\+353|00353|0)?[\s\-()]?(?:8[35679][\s\-()]?\d{3}[\s\-()]?\d{4}|1[\s\-()]?\d{3}[\s\-()]?\d{4}|2[1-9][\s\-()]?\d{3}[\s\-()]?\d{3}|4[0-9][\s\-()]?\d{3}[\s\-()]?\d{3}|5[0-9][\s\-()]?\d{3}[\s\-()]?\d{3}|6[0-9][\s\-()]?\d{3}[\s\-()]?\d{3}|7[14-9][\s\-()]?\d{3}[\s\-()]?\d{3}|9[0-9][\s\-()]?\d{3}[\s\-()]?\d{3})$/;

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

export const reviewFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Your name must be no more than 25 characters."),
  car_model: z
    .string()
    .min(1, "Please specify your car model")
    .max(35, "The car model must be no more than 35 characters."),
  rating: z.number().min(1).max(5, "Please select a rating"),
  review_text: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "The review must be no more than 500 characters."),
});

export const baseGallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  alt: z.string().min(1, "Alt text is required"),
  category_id: z.string().min(1, "Select a category"),
  image: z
    .any()
    .refine(
      (file) => file instanceof File || typeof file === "string" || file === null,
      "Invalid image value",
    )
    .optional(),
});

export const createGallerySchema = baseGallerySchema.extend({
  image: z.any().refine((file) => file instanceof File && file.size > 0, "Image is required"),
});

export const updateGallerySchema = baseGallerySchema.extend({
  id: z.string().min(1, "Item ID is required"),
});

export const contactsSchema = z.object({
  companyName: z
    .string()
    .min(3, "The length must be at least 3 characters.")
    .max(30, "The length must be less tnan 30 characters."),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
  phone: z.string().regex(irishPhoneRegex, "Invalid phone"),
  address: z.string(),
  workingHours: z.string(),
});

export type ContactsSettingsFormData = z.infer<typeof contactsSchema>;

export type CreateGalleryFormData = z.infer<typeof createGallerySchema>;
export type UpdateGalleryFormData = z.infer<typeof updateGallerySchema>;
export type GalleryFormData = CreateGalleryFormData | UpdateGalleryFormData;
export type AppointmentFormInputs = z.infer<typeof appointmentFormSchema>;
export type ReviewFormInputs = z.infer<typeof reviewFormSchema>;
