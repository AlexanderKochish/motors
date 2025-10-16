import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(
      /^(?!.*\.\.)(?!\.)[A-Za-z0-9._%+-]+(?<!\.)@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z]{2,})+$/,
      "Invalid email address",
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
