import AppDataSource from "../../data-source";
import { User } from "../../entities/users";

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  await userRepository.delete({ id: id });

  return;
};

export default deleteUserService;
