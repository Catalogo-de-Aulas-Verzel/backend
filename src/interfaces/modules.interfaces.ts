interface IModuleRequest {
  image?: string;
  name: string;
  description: string;
}

interface IModulePatchRequest {
  image?: string;
  name?: string;
  description?: string;
}

export { IModuleRequest, IModulePatchRequest };
