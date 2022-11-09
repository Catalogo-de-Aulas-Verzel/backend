import AppDataSource from "../../data-source";
import { Module } from "../../entities/modules";
import { AppError } from "../../errors";

const listModuleClassesService = async (id: string): Promise<Module> => {
  const moduleRepository = AppDataSource.getRepository(Module);

  const module = await moduleRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      classes: true,
    },
  });

  if (!module) throw new AppError("No module found", 404);

  return module;
};

export default listModuleClassesService;
