import format from "pg-format";
import { TCreateCourse } from "../interfaces/courses.interfaces";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";
import { TEnrolledUserByCourse } from "../interfaces/userCourses.interfaces";

export const createCourseService = async (data: TCreateCourse) => {
  const queryFormat: string = format(
    `
    INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const readAllCoursesService = async () => {
  const queryString: string = `SELECT * FROM "courses";`;
  const queryResult = await client.query(queryString);
  return queryResult.rows;
};

export const enrollUserInACourseService = async (
  courseId: string,
  userId: string
) => {
  const queryString: string = `INSERT INTO "userCourses" ("userId", "courseId") VALUES ($1, $2) RETURNING *;`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId, courseId],
  };
  const queryResult = await client.query(queryConfig);

  console.log(queryResult.rows[0]);
};

export const removeEnrolledUserCourseService = async (
  courseId: string,
  userId: string
) => {
  const queryString: string = `
    DELETE FROM "userCourses"
      WHERE "userId" = $1 
        AND "courseId" = $2;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId, courseId],
  };

  await client.query(queryConfig);
};

export const readEnrolledUsersByCourseIdService = async (courseId: string) => {
  const queryString: string = `
  SELECT 
    "uc"."userId" AS "userId",
    "u"."name" AS "userName",
    "uc"."courseId" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse"
  FROM "users" AS "u"
  JOIN "userCourses" AS "uc" ON "uc"."userId" = "u"."id"
  JOIN "courses" AS "c" ON "c"."id" = "uc"."courseId"
    WHERE "courseId" = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [courseId],
  };

  const queryResult: QueryResult<TEnrolledUserByCourse> = await client.query(
    queryConfig
  );

  return queryResult.rows;
};
