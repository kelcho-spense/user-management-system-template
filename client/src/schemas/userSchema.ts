import { z } from "zod";

const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z
    .number()
    .int()
    .positive('Age must be a positive integer')
    .max(150, 'Age must be 150 or less'),
  twitter: z.string().optional(),
  facebook: z.string().optional(),

});


export type TUser = z.infer<typeof userSchema>;

export default userSchema;