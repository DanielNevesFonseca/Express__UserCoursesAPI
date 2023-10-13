import { Request, Response } from "express";
import {
  createUserService,
  readAllUsersService,
  readUserCoursesService,
} from "../services/users.services";
import { TUserReturn } from "../interfaces/users.interfaces";

export const createUserController = async (req: Request, res: Response) => {
  const newUser: TUserReturn = await createUserService(req.body);
  return res.status(201).json(newUser);
};

export const readAllUsersController = async (req: Request, res: Response) => {
  const allUsers: TUserReturn[] = await readAllUsersService();
  return res.status(200).json(allUsers);
};

export const readUserCoursesController = async (
  req: Request,
  res: Response
) => {
  const userEnrolledCourses = await readUserCoursesService(res);
  return res.status(200).json(userEnrolledCourses);
};
