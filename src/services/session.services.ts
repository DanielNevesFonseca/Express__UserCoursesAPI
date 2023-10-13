import { QueryConfig } from "pg";
import {
  TSessionCreate,
  TSessionReturn,
} from "../interfaces/session.interfaces";
import { TUser, TUserResult } from "../interfaces/users.interfaces";
import { client } from "../database";
import AppError from "../errors/App.error";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

export const loginService = async (
  data: TSessionCreate
): Promise<TSessionReturn> => {
  const queryString: string = `SELECT * FROM "users" WHERE "email" = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [data.email],
  };

  const queryResult: TUserResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const matchUser: TUser = queryResult.rows[0];

  const verifyHashPassword: boolean = await compare(
    data.password,
    matchUser.password
  );

  if (!verifyHashPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    {
      email: matchUser.email,
      admin: matchUser.admin,
    },
    process.env.SECRET_KEY!,
    {
      subject: matchUser.id.toString(),
      expiresIn: process.env.EXPIRES_IN!,
    }
  );

  return { token };
};
