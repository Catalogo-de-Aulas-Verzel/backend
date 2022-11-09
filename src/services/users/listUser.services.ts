import AppDataSource from "../../data-source";
import { User } from "../../entities/users";
import { AppError } from "../../errors";
import { IUserResponse } from "../../interfaces/users.interfaces";

const listUserService = async (
  id: string,
  userId: string
): Promise<IUserResponse> => {
  if (id !== userId) throw new AppError("Unauthorized", 401);

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) throw new AppError("User not found", 404);

  return user;
};

export default listUserService;
