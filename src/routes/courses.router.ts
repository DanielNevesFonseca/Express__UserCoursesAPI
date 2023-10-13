import { Router } from "express";
import {
  createCourseController,
  enrollUserInACourseController,
  readAllCoursesController,
  readEnrolledUsersByCourseIdController,
  removeEnrolledUserCourseController,
} from "../controllers/courses.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createCourseSchema } from "../schemas/courses.schema";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import {
  verifyCourseId,
  verifyUserId,
} from "../middlewares/courses.middleware";

export const coursesRouter: Router = Router();

coursesRouter.post(
  "/",
  verifyToken,
  verifyPermission,
  validateBody(createCourseSchema),
  createCourseController
);

coursesRouter.get("/", readAllCoursesController);

coursesRouter.post(
  "/:courseId/users/:userId",
  verifyCourseId,
  verifyUserId,
  verifyToken,
  verifyPermission,
  enrollUserInACourseController
);

coursesRouter.delete(
  "/:courseId/users/:userId",
  verifyCourseId,
  verifyUserId,
  verifyToken,
  verifyPermission,
  removeEnrolledUserCourseController
);

coursesRouter.get(
  "/:courseId/users",
  verifyToken,
  verifyPermission,
  readEnrolledUsersByCourseIdController
);
