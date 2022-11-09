import { instanceToInstance, instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import {
  IUserPatchRequest,
  IUserRequest,
  IUserResponse,
} from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.services";
import editUserService from "../services/users/editUser.services";
import listAllUsersService from "../services/users/listAllUsers.services";
import listUserService from "../services/users/listUser.services";

const createUserController = async (req: Request, resp: Response) => {
  const user: IUserRequest = req.body;
  const newUser: IUserResponse = await createUserService(user);

  return resp
    .status(201)
    .json({ data: instanceToPlain(newUser) })
    .send();
};

const listAllUsersController = async (req: Request, resp: Response) => {
  const users: IUserResponse[] = await listAllUsersService();

  return resp
    .status(200)
    .json({ data: instanceToInstance(users) })
    .send();
};

const listUserController = async (req: Request, resp: Response) => {
  const { userId } = req.params;
  const { id } = req.user;

  const users: IUserResponse = await listUserService(id, userId);

  return resp
    .status(200)
    .json({ data: instanceToInstance(users) })
    .send();
};

const editUserController = async (req: Request, resp: Response) => {
  const editUser: IUserPatchRequest = req.body;
  const { id } = req.user;

  const editedUser = await editUserService(editUser, id);

  return resp.status(200).json({ data: instanceToPlain(editedUser) });
};

const deleteUserController = async (req: Request, resp: Response) => {};

export {
  createUserController,
  listAllUsersController,
  listUserController,
  editUserController,
  deleteUserController,
};
