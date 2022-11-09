import { Module } from "../../entities/modules";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors";

const deleteModuleService = async (id: string): Promise<void> => {
  const moduleRepository = AppDataSource.getRepository(Module);

  if (!module) throw new AppError("Module not found", 404);

  await moduleRepository.delete({ id: id });

  return;
};

export default deleteModuleService;
