import { Router } from "express";
import { createClassController } from "../controllers/classes.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const classesRoutes = Router()

classesRoutes.post("/:moduleId",ensureAuthMiddleware, createClassController)

export default classesRoutes