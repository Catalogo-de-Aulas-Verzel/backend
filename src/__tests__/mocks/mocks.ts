import { IClassRequest } from "../../interfaces/classes.interfaces";
import { IModuleRequest } from "../../interfaces/modules.interfaces";
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

const mockModule: IModuleRequest = {
  name: "Matemática",
  description:
    "A matemática é a ciência do raciocínio lógico e abstrato, que estuda quantidades, espaço e medidas, estruturas, variações e estatística.",
};

const mockModuleInvlidKey = {
  name: "Matemática",
  descriptionn:
    "A matemática é a ciência do raciocínio lógico e abstrato, que estuda quantidades, espaço e medidas, estruturas, variações e estatística.",
};

const mockClass: IClassRequest = {
  name: "Raiz quadrada",
  description:
    "Em matemática, a raiz quadrada de x é um número y que, multiplicado por si próprio, iguala-se a x.",
};

const mockClass2: IClassRequest = {
  name: "Exponenciação",
  description:
    "Exponenciação ou potenciação é uma operação matemática, escrita como aⁿ, envolvendo dois números: a base a e o expoente n.",
};

const mockClassInvalidKey = {
  name: "Raiz quadrada",
  descriptionn:
    "Em matemática, a raiz quadrada de x é um número y que, multiplicado por si próprio, iguala-se a x.",
};

export {
  mockUser,
  mockUserAdm,
  mockUserInvalidKey,
  mockUserLogin,
  mockUserAdmLogin,
  mockModule,
  mockModuleInvlidKey,
  mockClass,
  mockClass2,
  mockClassInvalidKey
};
