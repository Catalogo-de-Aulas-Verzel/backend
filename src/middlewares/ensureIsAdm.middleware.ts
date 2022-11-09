import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const ensureIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm } = req.user;

  if (!isAdm) throw new AppError("Unauthorized", 401);

  return next();
};

export default ensureIsAdmMiddleware;
