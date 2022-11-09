import AppDataSource from "../../data-source";
import { Class } from "../../entities/classes";

const listAllClassesService = async (): Promise<Class[]> => {
  const classRepository = AppDataSource.getRepository(Class);

  const classes = await classRepository.find({ relations: { module: true } });

  return classes;
};

export default listAllClassesService;
