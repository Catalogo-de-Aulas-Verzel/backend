import AppDataSource from "../../data-source";
import { User } from "../../entities/users";
import { AppError } from "../../errors";

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({id:id})

  if(!findUser) throw new AppError ("User alredy being deleted", 404)

  await userRepository.delete({ id: id });

  return;
};

export default deleteUserService;
