import AppDataSource from "../../data-source";
import { Module } from "../../entities/modules";

const listAllModulesService = async (): Promise<Module[]> => {
  const moduleRepository = AppDataSource.getRepository(Module)

  const modules = await moduleRepository.find()

  return modules
};

export default listAllModulesService;
