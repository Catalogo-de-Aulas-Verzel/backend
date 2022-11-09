import AppDataSource from "../../data-source";
import { Class } from "../../entities/classes";
import { AppError } from "../../errors";

const listClassService = async (id: string): Promise<Class> => {
  const classReporitory = AppDataSource.getRepository(Class);

  const findClass = await classReporitory.findOne({
    where: {
      id: id,
    },
    relations: {
      module: true,
    },
  });

  if (!findClass) throw new AppError("Class not found", 404);

  return findClass;
};

export default listClassService;
