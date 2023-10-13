import { Router } from "express";
import { usersRouter } from "./users.router";
import { coursesRouter } from "./courses.router";
import { sessionRouter } from "./session.router";

export const routes: Router = Router();

routes.use("/users", usersRouter);
routes.use("/courses", coursesRouter);
routes.use("/login", sessionRouter);
