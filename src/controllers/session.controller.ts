import { Request, Response } from "express";
import { TSessionReturn } from "../interfaces/session.interfaces";
import { loginService } from "../services/session.services";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: TSessionReturn = await loginService(req.body);
  return res.status(200).json(token);
};
