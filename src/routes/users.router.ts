import { Router } from "express";
import {
  createUserController,
  readAllUsersController,
  readUserCoursesController,
} from "../controllers/users.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { usersCreateSchema } from "../schemas/users.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import {
  validateEmail,
  verifyIsUserEnrolledInACourse,
} from "../middlewares/users.middleware";

export const usersRouter: Router = Router();

usersRouter.post(
  "/",
  validateBody(usersCreateSchema),
  validateEmail,
  createUserController
);

usersRouter.get("/", verifyToken, verifyPermission, readAllUsersController);

usersRouter.get(
  "/:userId/courses",
  verifyToken,
  verifyPermission,
  verifyIsUserEnrolledInACourse,
  readUserCoursesController
);
