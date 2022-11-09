import { compare } from "bcryptjs";
import "dotenv/config";
import { sign } from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users";
import { AppError } from "../../errors";
import { IUserLoginRequest } from "../../interfaces/users.interfaces";

const loginService = async (userLogin: IUserLoginRequest): Promise<string> => {
  const checkKeys = Object.keys(userLogin).map((item) => {
    return item.includes("email") || item.includes("password");
  });

  if (checkKeys.includes(false)) throw new AppError("Invalid key", 400);

  const { email, password } = userLogin;

  const userRepository = AppDataSource.getRepository(User);

  const userExist = await userRepository.findOneBy({ email: email });

  if (!userExist) throw new AppError("Invalid user or password", 403);

  const passwordMatch = await compare(password, userExist.password);

  if (!passwordMatch) throw new AppError("Invalid user or password", 403);

  const token = sign(
    {
      isAdm: userExist.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: userExist.id,
    }
  );

  return token;
};

export default loginService;
