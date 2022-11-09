import { Router } from "express";
import {
  createUserController,
  editUserController,
  listAllUsersController,
  listUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.meddleware";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get("", ensureAuthMiddleware, listAllUsersController);
usersRoutes.get("/:userId", ensureAuthMiddleware, listUserController);
usersRoutes.patch("", ensureAuthMiddleware, editUserController)

export default usersRoutes;
