import { z } from "zod";
import { coursesSchema, createCourseSchema } from "../schemas/courses.schema";

export type TCourse = z.infer<typeof coursesSchema>;

export type TCreateCourse = z.infer<typeof createCourseSchema>;
