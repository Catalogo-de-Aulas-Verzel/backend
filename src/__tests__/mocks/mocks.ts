import {
  IUserLoginRequest,
  IUserRequest,
  IUserResponse,
} from "../../interfaces/users.interfaces";

const mockUser: IUserRequest = {
  email: "maria@mail.com",
  name: "maria",
  password: "1234",
};

const mockUserAdm: IUserRequest = {
  email: "joão@mail.com",
  name: "joão",
  password: "1234",
  isAdm: true,
};

const mockUserInvalidKey = {
    email: "maria@mail.com",
    name: "maria",
    passwordd: "1234",
  };

const mockUserLogin: IUserLoginRequest = {
  email: "maria@mail.com",
  password: "1234",
};

const mockUserAdmLogin: IUserLoginRequest = {
  email: "joão@mail.com",
  password: "1234",
};

export {
    mockUser,
    mockUserAdm,
    mockUserInvalidKey,
    mockUserLogin,
    mockUserAdmLogin
}