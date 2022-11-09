import { Request, Response } from "express";
import { Module } from "../entities/modules";
import {
  IModuleRequest,
} from "../interfaces/modules.interfaces";
import createModuleService from "../services/modules/createModule.services";
import listAllModulesService from "../services/modules/listAllModules.services";
import listModuleService from "../services/modules/listModule.services";
import listModuleClassesService from "../services/modules/listModuleClasses.services";

const createModuleController = async (req: Request, resp: Response) => {
  const module: IModuleRequest = req.body;

  const createdModule: Module = await createModuleService(module);

  return resp.status(201).json({ data: createdModule }).send();
};

const listAllModulesController = async (req: Request, resp: Response) => {
  const modules: IModuleRequest[] = await listAllModulesService();

  return resp.status(200).json({ data: modules }).send();
};

const listModuleController = async (req: Request, resp: Response) => {
  const { moduleId } = req.params;

  const modules: IModuleRequest = await listModuleService(moduleId);

  return resp.status(200).json({ data: modules }).send();
};

const listModuleClassesController = async (req: Request, resp: Response) => {
  const { moduleId } = req.params;

  const modules: Module = await listModuleClassesService(moduleId);

  return resp.status(200).json({ data: modules }).send();
};

const editModuleController = async (req: Request, resp: Response) => {};

const deleteModuleController = async (req: Request, resp: Response) => {};

export {
  createModuleController,
  listAllModulesController,
  listModuleController,
  listModuleClassesController,
  editModuleController,
  deleteModuleController,
};
