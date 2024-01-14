import { z } from "zod";

export const usersSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50).min(3),
  email: z.string().max(50).min(3).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false).optional(),
});

export const usersCreateSchema = usersSchema.omit({ id: true });
export const usersReturnSchema = usersSchema.omit({ password: true });
export const usersReadSchema = usersReturnSchema.array();
