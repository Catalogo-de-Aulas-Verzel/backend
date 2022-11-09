import AppDataSource from "../../data-source";
import { Module } from "../../entities/modules";
import { AppError } from "../../errors";
import { IModuleRequest } from "../../interfaces/modules.interfaces";

const createModuleService = async (
  module: IModuleRequest
): Promise<Module> => {
  const checkKeys = Object.keys(module).map((item) => {
    return item === "name" || item === "description" || item === "image";
  });

  if (checkKeys.includes(false)) throw new AppError("Invalid key", 400);

  let { image, name, description }: IModuleRequest = module;

  if (!image) image = "default_cover.jpg";

  const moduleRepository = AppDataSource.getRepository(Module);

  const checkName = await moduleRepository.findOneBy({ name: name });

  if (checkName)
    throw new AppError("This module's name is already registered", 400);

  const newModule = moduleRepository.create({
    image: image,
    description: description,
    name: name,
  });

  await moduleRepository.save(newModule);

  return newModule;
};

export default createModuleService;
