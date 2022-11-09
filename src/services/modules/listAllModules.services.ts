import AppDataSource from "../../data-source";
import { Module } from "../../entities/modules";
import {
  IModuleResponse,
} from "../../interfaces/modules.interfaces";

const listAllModulesService = async (): Promise<IModuleResponse[]> => {
  const moduleRepository = AppDataSource.getRepository(Module)

  const modules = await moduleRepository.find()

  return modules
};

export default listAllModulesService;
