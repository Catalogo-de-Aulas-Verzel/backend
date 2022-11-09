import { hash } from "bcryptjs";
import { AppError } from "../../errors";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interfaces";

const createUserService = async (
  user: IUserRequest
): Promise<IUserResponse> => {
  const checkKeys = Object.keys(user).map((item) => {
    return (
      item === "name" ||
      item === "email" ||
      item === "password" ||
      item === "isAdm" ||
      item === "image"
    );
  });

  if (checkKeys.includes(false)) throw new AppError("Invalid key", 400);

  let { email, image, name, password, isAdm }: IUserRequest = user;

  if (!image) image = "default.jpg";

  const userRepository = AppDataSource.getRepository(User);

  const checkEmail = await userRepository.findOneBy({ email: email });

  if (checkEmail) throw new AppError("This email is already registered", 400);

  const hashedPassword = await hash(password, 10);

  const newUser = userRepository.create({
    image: image,
    email: email,
    isAdm: isAdm ? isAdm : false,
    name: name,
    password: hashedPassword,
  });

  await userRepository.save(newUser);

  return newUser;
};

export default createUserService;
