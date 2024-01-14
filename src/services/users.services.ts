import format from "pg-format";
import { TUserCreate, TUserReturn } from "../interfaces/users.interfaces";
import { client } from "../database";
import { Response } from "express";
import { hash } from "bcryptjs";
import { usersReadSchema, usersReturnSchema } from "../schemas/users.schema";

export const createUserService = async (
  data: TUserCreate
): Promise<TUserReturn> => {
  data.password = await hash(data.password, 12);

  const queryFormat: string = format(
    `
    INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult = await client.query(queryFormat);

  console.log(queryResult.rows[0])

  return usersReturnSchema.parse(queryResult.rows[0]);
};

export const readAllUsersService = async (): Promise<TUserReturn[]> => {
  const queryString: string = `SELECT * FROM "users";`;

  const queryResult = await client.query(queryString);

  return usersReadSchema.parse(queryResult.rows);
};

export const readUserCoursesService = async (res: Response) => {
  const list = res.locals.userCourses;

  return list;
};
