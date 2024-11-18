// src/models/User.ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  age: z.number(),
  twitter: z.string(),
  facebook: z.string()
});

export type TUser = z.infer<typeof userSchema>;