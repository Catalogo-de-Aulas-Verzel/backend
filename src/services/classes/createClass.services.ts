import AppDataSource from "../../data-source";
import { Class } from "../../entities/classes";
import { Module } from "../../entities/modules";
import { AppError } from "../../errors";
import { IClassRequest } from "../../interfaces/classes.interfaces";

const createClassService = async (
  newClass: IClassRequest,
  moduleId: string
): Promise<Class> => {
  const checkKeys = Object.keys(newClass).map((item) => {
    return item === "name" || item === "description" || item === "image";
  });

  if (checkKeys.includes(false)) throw new AppError("Invalid key", 400);

  let { image, name, description }: IClassRequest = newClass;

  if (!image) image = "default_cover.jpg";

  const moduleRepository = AppDataSource.getRepository(Module);

  const verifyModule = await moduleRepository.findOneBy({id: moduleId})

  if (!verifyModule) throw new AppError("Module not found", 404);

  const classRepository = AppDataSource.getRepository(Class);

  const checkName = await classRepository.findOneBy({ name: name });

  if (checkName)
    throw new AppError("This class's name is already registered", 400);

  const createdClass = classRepository.create({
    image: image,
    description: description,
    name: name,
    module: {
      id: moduleId
    }
  });

  await classRepository.save(createdClass);

  return createdClass;
};

export default createClassService;
