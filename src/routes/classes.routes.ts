import { Router } from "express";
import { createClassController, listAllClassesController } from "../controllers/classes.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const classesRoutes = Router()

classesRoutes.post("/:moduleId",ensureAuthMiddleware, createClassController)
classesRoutes.get('', ensureAuthMiddleware, listAllClassesController)

export default classesRoutes