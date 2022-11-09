import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest, IUserResponse } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.services";

const createUserController = async (req: Request, resp: Response) => {
  const user: IUserRequest = req.body;
  const newUser: IUserResponse = await createUserService(user);

  return resp
    .status(201)
    .json({ data: instanceToPlain(newUser) })
    .send();
};

const listAllUsersController = async (req: Request, resp: Response) => {};

const listUserController = async (req: Request, resp: Response) => {};

const editUserController = async (req: Request, resp: Response) => {};

const deleteUserController = async (req: Request, resp: Response) => {};

export {
  createUserController,
  listAllUsersController,
  listUserController,
  editUserController,
  deleteUserController,
};
