import { z } from "zod";

export const coursesSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string().min(10),
});

export const createCourseSchema = coursesSchema.omit({ id: true });
