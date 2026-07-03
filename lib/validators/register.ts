import { z } from "zod";

export const registerSchema = z
  .object({
    displayName: z.string().min(3, "Name must be at least 3 characters"),

    email: z.email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),

    country: z.string().min(1, "Please select your country"),

    goal: z.string().min(1, "Please select your goal"),

    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;