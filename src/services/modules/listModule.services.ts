import AppDataSource from "../../data-source";
import { Module } from "../../entities/modules";
import { AppError } from "../../errors";

const listModuleService = async (id : string): Promise<Module> => {
  const moduleRepository = AppDataSource.getRepository(Module)

  const module = await moduleRepository.findOneBy({id: id})

  if(!module) throw new AppError("No module found", 404)

  return module
};

export default listModuleService;