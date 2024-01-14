import { z } from "zod";
import {
  usersCreateSchema,
  usersReadSchema,
  usersReturnSchema,
  usersSchema,
} from "../schemas/users.schema";
import { QueryResult } from "pg";

export type TUser = z.infer<typeof usersSchema>;

export type TUserCreate = z.infer<typeof usersCreateSchema>;

export type TUserRead = z.infer<typeof usersReadSchema>;

export type TUserReturn = z.infer<typeof usersReturnSchema>;

export type TUserResult = QueryResult<TUser>;
