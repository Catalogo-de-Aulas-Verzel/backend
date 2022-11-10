import { Router } from "express";
import {
  createModuleController,
  deleteModuleController,
  editModuleController,
  listAllModulesController,
  listModuleClassesController,
  listModuleController,
} from "../controllers/modules.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const modulesRoutes = Router();

modulesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createModuleController
);
modulesRoutes.get("", ensureAuthMiddleware, listAllModulesController);
modulesRoutes.get("/:moduleId", ensureAuthMiddleware, listModuleController);
modulesRoutes.get(
  "/classes/:moduleId",
  ensureAuthMiddleware,
  listModuleClassesController
);
modulesRoutes.patch("/:moduleId", ensureAuthMiddleware, editModuleController);
modulesRoutes.delete(
  "/:moduleId",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteModuleController
);

export default modulesRoutes;
