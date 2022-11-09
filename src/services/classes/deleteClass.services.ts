import AppDataSource from "../../data-source";
import { Class } from "../../entities/classes";
import { AppError } from "../../errors";

const deleteClassService = async (id: string): Promise<void> => {
  const classRepository = AppDataSource.getRepository(Class);

  const findClass = await classRepository.findOneBy({ id: id });

  if (!findClass) throw new AppError("Class not found", 404);

  await classRepository.delete({ id: id });

  return;
};

export default deleteClassService;
