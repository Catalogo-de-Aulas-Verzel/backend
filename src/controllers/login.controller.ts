import { Request, Response } from "express";
import { IUserLoginRequest } from "../interfaces/users.interfaces";
import loginService from "../services/login/login.services";

const loginController = async (req: Request, resp: Response) => {
  const userLogin: IUserLoginRequest = req.body;

  const token: string = await loginService(userLogin);

  return resp.status(200).json({ token: token }).send();
};

export { loginController };
