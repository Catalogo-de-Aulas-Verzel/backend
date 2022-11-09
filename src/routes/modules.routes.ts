import { Router } from "express";
import {
  createModuleController,
  listAllModulesController,
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
modulesRoutes.get("/classes/:moduleId", ensureAuthMiddleware, listModuleController);

export default modulesRoutes;
