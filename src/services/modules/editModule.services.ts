import AppDataSource from "../../data-source";
import { Module } from "../../entities/modules";
import { AppError } from "../../errors";
import { IModulePatchRequest } from "../../interfaces/modules.interfaces";

const editModuleService = async (
  module: IModulePatchRequest,
  id: string
): Promise<Module> => {
  const checkKeys = Object.keys(module).map((item) => {
    return item === "name" || item === "description" || item === "image";
  });

  if (checkKeys.includes(false)) throw new AppError("Invalid key", 400);

  let { image, name, description }: IModulePatchRequest = module;

  const moduleRepository = AppDataSource.getRepository(Module);

  const checkModule = await moduleRepository.findOneBy({ id: id });
  if (!checkModule) throw new AppError("Module not found", 404);

  await moduleRepository.update(id, {
    description: description || checkModule.description,
    name: name || checkModule.name,
    image: image || checkModule.image,
  });

  const updatedModule = await moduleRepository.findOneBy({ id: id });

  return updatedModule!;
};

export default editModuleService;
