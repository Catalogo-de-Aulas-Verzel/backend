import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users";
import { AppError } from "../../errors";
import {
  IUserPatchRequest,
  IUserResponse,
} from "../../interfaces/users.interfaces";

const editUserService = async (
  editUser: IUserPatchRequest,
  id: string
): Promise<IUserResponse> => {
  const checkKeys = Object.keys(editUser).map((item) => {
    return (
      item === "name" ||
      item === "email" ||
      item === "password" ||
      item ==="image"
    );
  });

  if (checkKeys.includes(false)) throw new AppError("Invalid key", 400);

  let { email, image, name, password }: IUserPatchRequest = editUser;

  const userRepository = AppDataSource.getRepository(User);

  const checkEmail = await userRepository.findOneBy({ email: email });
  const user = await userRepository.findOneBy({ id: id });

  if (!user) throw new AppError("User not found", 404);
  if (checkEmail && checkEmail.id !== user.id)
    throw new AppError("This email is already registered", 400);

  await userRepository.update(id, {
    image: image || user.image,
    email: email || user.email,
    name: name || user.name,
    password: password ? await hash(password, 10) : user.password,
  });

  const updatedUser = await userRepository.findOneBy({ id: id });

  return updatedUser!;
};

export default editUserService;
