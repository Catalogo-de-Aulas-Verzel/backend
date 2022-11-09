import { Request, Response } from "express";
import createClassService from "../services/classes/createClass.services";
import listAllClassesService from "../services/classes/listAllClasses.services";

const createClassController = async (req: Request, resp: Response) => {
  const newClass = req.body;
  const { moduleId } = req.params;

  const createdClass = await createClassService(newClass, moduleId);

  return resp.status(201).json({ data: createdClass }).send();
};

const listAllClassesController = async (req: Request, resp: Response) => {
  const classes = await listAllClassesService();

  return resp.status(200).json({ data: classes }).send();
};

const listClassController = async (req: Request, resp: Response) => {};

const editClassController = async (req: Request, resp: Response) => {};

const deleteClassController = async (req: Request, resp: Response) => {};

export {
  createClassController,
  listAllClassesController,
  listClassController,
  editClassController,
  deleteClassController,
};
