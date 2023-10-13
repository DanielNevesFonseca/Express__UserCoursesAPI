import { Request, Response } from "express";
import { TCourse } from "../interfaces/courses.interfaces";
import {
  createCourseService,
  enrollUserInACourseService,
  readAllCoursesService,
  readEnrolledUsersByCourseIdService,
  removeEnrolledUserCourseService,
} from "../services/courses.services";
import { TEnrolledUserByCourse } from "../interfaces/userCourses.interfaces";

export const createCourseController = async (req: Request, res: Response) => {
  const newCourse: TCourse = await createCourseService(req.body);
  return res.status(201).json(newCourse);
};

export const readAllCoursesController = async (req: Request, res: Response) => {
  const allCourses: TCourse[] = await readAllCoursesService();
  return res.status(200).json(allCourses);
};

export const enrollUserInACourseController = async (
  req: Request,
  res: Response
) => {
  await enrollUserInACourseService(req.params.courseId, req.params.userId);
  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const removeEnrolledUserCourseController = async (
  req: Request,
  res: Response
) => {
  await removeEnrolledUserCourseService(req.params.courseId, req.params.userId);
  return res.status(204).json();
};

export const readEnrolledUsersByCourseIdController = async (
  req: Request,
  res: Response
) => {
  const usersEnrolled: TEnrolledUserByCourse[] =
    await readEnrolledUsersByCourseIdService(req.params.courseId);
  return res.status(200).json(usersEnrolled);
};
