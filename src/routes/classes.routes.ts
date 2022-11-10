import { Router } from "express";
import {
  createClassController,
  deleteClassController,
  editClassController,
  listAllClassesController,
  listClassController,
} from "../controllers/classes.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const classesRoutes = Router();

classesRoutes.post(
  "/:moduleId",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createClassController
);
classesRoutes.get("", ensureAuthMiddleware, listAllClassesController);
classesRoutes.get("/:classId", ensureAuthMiddleware, listClassController);
classesRoutes.patch("/:classId", ensureAuthMiddleware, ensureIsAdmMiddleware, editClassController);
classesRoutes.delete(
  "/:classId",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteClassController
);

export default classesRoutes;
