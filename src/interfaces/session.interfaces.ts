import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";

export type TSessionCreate = z.infer<typeof sessionSchema>;
export type TSessionReturn = { token: string };
