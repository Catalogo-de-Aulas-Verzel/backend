import { Request, Response } from "express";
import createClassService from "../services/classes/createClass.services";
import deleteClassService from "../services/classes/deleteClass.services";
import editClassService from "../services/classes/editClass.services";
import listAllClassesService from "../services/classes/listAllClasses.services";
import listClassService from "../services/classes/listClass.services";

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

const listClassController = async (req: Request, resp: Response) => {
  const { classId } = req.params;

  const findClass = await listClassService(classId);

  return resp.status(200).json({ data: findClass }).send();
};

const editClassController = async (req: Request, resp: Response) => {
  const editClass = req.body;
  const { classId } = req.params;

  const updatedClass = await editClassService(editClass, classId);

  return resp.status(200).json({ data: updatedClass }).send();
};

const deleteClassController = async (req: Request, resp: Response) => {
  const { classId } = req.params;

  await deleteClassService(classId);

  return resp.status(204).send();
};

export {
  createClassController,
  listAllClassesController,
  listClassController,
  editClassController,
  deleteClassController,
};
