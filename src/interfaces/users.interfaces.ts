interface IUserRequest {
  image?: string;
  name: string;
  email: string;
  password: string;
  isAdm?: boolean;
}

interface IUserResponse {
  id: string;
  image: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isAdm: boolean;
}

interface IUserLoginRequest {
  email: string;
  password: string
}

interface IUserPatchRequest {
  image?: string;
  name?: string;
  email?: string;
  password?: string;
}

export {
    IUserRequest,
    IUserResponse,
    IUserLoginRequest,
    IUserPatchRequest
}
