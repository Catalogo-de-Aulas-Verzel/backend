import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";

const usersRoutes = Router()

usersRoutes.post("", createUserController)

export default usersRoutes