import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors";

const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) throw new AppError("Missing Authorization", 401);

  token = token.split(" ")[1];

  verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) throw new AppError("Invalid token", 401);

    req.user = {
      isAdm: decoded.isAdm,
      id: decoded.sub,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
