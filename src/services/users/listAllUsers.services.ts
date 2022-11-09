import AppDataSource from "../../data-source"
import { User } from "../../entities/users"
import { IUserResponse } from "../../interfaces/users.interfaces"

const listAllUsersService = async () : Promise<IUserResponse[]> => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    return users
}

export default listAllUsersService