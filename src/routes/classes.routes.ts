import { Router } from "express";
import {
  createClassController,
  listAllClassesController,
  listClassController,
} from "../controllers/classes.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const classesRoutes = Router();

classesRoutes.post("/:moduleId", ensureAuthMiddleware, createClassController);
classesRoutes.get("", ensureAuthMiddleware, listAllClassesController);
classesRoutes.get("/:classId", ensureAuthMiddleware, listClassController);

export default classesRoutes;
