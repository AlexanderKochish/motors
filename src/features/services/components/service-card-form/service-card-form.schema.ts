import { z } from "zod";

export const baseServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  alt: z.string().min(1, "Alt text is required"),
  price: z.string().min(1, "Select a price"),
  image: z
    .any()
    .refine(
      (file) => file instanceof File || typeof file === "string" || file === null,
      "Invalid image value",
    )
    .optional(),
});

export const createServiceSchema = baseServiceSchema.extend({
  image: z.any().refine((file) => file instanceof File && file.size > 0, "Image is required"),
});

export const updateServiceSchema = baseServiceSchema.extend({
  id: z.string().min(1, "Item ID is required"),
});

export type CreateServiceFormData = z.infer<typeof createServiceSchema>;
export type UpdateServiceFormData = z.infer<typeof updateServiceSchema>;
export type ServiceFormData = CreateServiceFormData | UpdateServiceFormData;
