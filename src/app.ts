import "express-async-errors";
import express, { Application, json } from "express";
import { handleError } from "./middlewares/errorHandler.middleware";
import { routes } from "./routes/index.router";

const app: Application = express();

app.use(json());

app.use("/", routes);

app.use(handleError);

export default app;
