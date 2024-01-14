import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import AppError from "../errors/App.error";

export const verifyCourseId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString: string = `SELECT * FROM "courses" WHERE "id" = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.params.courseId],
  };

  const queryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  return next();
};

export const verifyUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString: string = `SELECT * FROM "users" WHERE "id" = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.params.userId],
  };

  const queryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  return next();
};
