interface IModuleRequest {
  image?: string;
  name: string;
  description: string;
}

interface IModuleResponse {
  image: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export { IModuleRequest, IModuleResponse };
