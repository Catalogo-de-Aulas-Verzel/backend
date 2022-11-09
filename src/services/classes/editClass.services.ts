import AppDataSource from "../../data-source";
import { Class } from "../../entities/classes";
import { Module } from "../../entities/modules";
import { AppError } from "../../errors";
import { IClassPatchRequest } from "../../interfaces/classes.interfaces";

const editClassService = async (
  editClass: IClassPatchRequest,
  id: string
): Promise<Class> => {
  const checkKeys = Object.keys(editClass).map((item) => {
    return (
      item === "name" ||
      item === "description" ||
      item === "image" ||
      item === "moduleId"
    );
  });

  if (checkKeys.includes(false)) throw new AppError("Invalid key", 400);

  const classRepository = AppDataSource.getRepository(Class);

  const findClass = await classRepository.findOneBy({ id: id });

  if (!findClass) throw new AppError("Class not found", 404);

  let { image, name, description, moduleId }: IClassPatchRequest = editClass;
  let verifyModule;

  if (moduleId) {
    const moduleRepository = AppDataSource.getRepository(Module);

    verifyModule = await moduleRepository.findOneBy({ id: moduleId });

    if (!verifyModule) throw new AppError("Module not found", 404);
  }

  if (name) {
    const checkName = await classRepository.findOneBy({ name: name });

    if (checkName)
      throw new AppError("This class's name is already registered", 400);
  }

  await classRepository.update(id, {
    image: image || findClass.image,
    description: description || findClass.description,
    name: name || findClass.name,
    module: verifyModule || findClass.module,
  });

  const updatedClass = await classRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      module: true,
    },
  });

  return updatedClass!;
};

export default editClassService;
