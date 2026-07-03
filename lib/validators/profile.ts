import { z } from "zod";

export const profileSchema = z.object({
  age: z.coerce.number().min(18).max(100),

  gender: z.string(),

  city: z.string().min(2),

  bio: z.string().max(300),

  interestedIn: z.string(),

  speaks: z.array(z.string()).min(1),

  learning: z.array(z.string()).min(1),
});

export type ProfileFormData =
  z.infer<typeof profileSchema>;
