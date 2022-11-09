interface IClassRequest {
  image?: string;
  name: string;
  description: string;
}

interface IClassPatchRequest {
  image?: string;
  name?: string;
  description?: string;
  moduleId?: string;
}

export { IClassRequest, IClassPatchRequest };
