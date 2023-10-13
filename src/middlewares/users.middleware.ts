import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult, QueryResultRow } from "pg";
import { client } from "../database";
import AppError from "../errors/App.error";
import { TUser } from "../__tests__/mocks/interfaces";

export const verifyIsUserEnrolledInACourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString: string = `
    SELECT 
      "c"."id" AS "courseId",
      "c"."name" AS "courseName",
      "c"."description" AS "courseDescription",
      "us"."active" AS "userActiveInCourse",
      "u"."id" AS "userId",
      "u"."name" AS "userName"
    FROM "courses" AS "c"
    JOIN "userCourses" AS "us" ON  "us"."courseId" = "c"."id" 
    JOIN "users" AS "u" ON "us"."userId" = "u"."id"
      WHERE "u"."id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.params.userId],
  };

  const queryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("No course found", 404);
  }

  res.locals = {
    ...res.locals,
    userCourses: queryResult.rows,
  };

  return next();
};

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString: string = `SELECT * FROM "users" WHERE "email" = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.body.email],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);

  if (queryResult.rowCount !== 0) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};
