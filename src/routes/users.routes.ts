import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  editUserController,
  listAllUsersController,
  listUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get("", ensureAuthMiddleware, listAllUsersController);
usersRoutes.get("/:userId", ensureAuthMiddleware, listUserController);
usersRoutes.patch("", ensureAuthMiddleware, editUserController);
usersRoutes.delete("", ensureAuthMiddleware, deleteUserController);

export default usersRoutes;
