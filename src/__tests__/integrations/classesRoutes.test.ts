import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import {
  mockClass,
  mockClass2,
  mockClassInvalidKey,
  mockModule,
  mockUser,
  mockUserAdm,
  mockUserAdmLogin,
  mockUserLogin,
} from "../mocks/mocks";

describe("/classes", () => {
  let connection: DataSource;
  let tokenUser: string;
  let tokenUserAdm: string;
  let idModule: string;
  let idClass: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.log("Erro durante a inicialização", err));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /classes/:moduleId -> Should be able to create a class", async () => {
    const createUserAdm = await request(app).post("/users").send(mockUserAdm);
    const createUser = await request(app).post("/users").send(mockUser);

    const loginUserAdm = await request(app)
      .post("/login")
      .send(mockUserAdmLogin);
    const loginUser = await request(app).post("/login").send(mockUserLogin);

    tokenUserAdm = `Bearer ${loginUserAdm.body.token}`;
    tokenUser = `Bearer ${loginUser.body.token}`;

    const module = await request(app)
      .post("/modules")
      .send(mockModule)
      .set("Authorization", tokenUserAdm);

    idModule = module.body.data.id;

    await request(app)
      .post(`/classes/${idModule}`)
      .send(mockClass2)
      .set("Authorization", tokenUserAdm);

    const resp = await request(app)
      .post(`/classes/${idModule}`)
      .send(mockClass)
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(201);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual(mockClass.name);
    expect(resp.body.data).toHaveProperty("description");
    expect(resp.body.data.description).toEqual(mockClass.description);
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");

    idClass = resp.body.data.id;
  });

  test("POST /classes/:moduleId -> Should not be able to create a class without authorization", async () => {
    const resp = await request(app)
      .post(`/classes/${idModule}`)
      .send(mockClass)
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("POST /classes/:moduleId -> Should not be able to create a class without being adm", async () => {
    const resp = await request(app)
      .post(`/classes/${idModule}`)
      .send(mockClass)
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Unauthorized");
  });

  test("POST /classes/:moduleId -> Should not be able to create a class with an invalid key", async () => {
    const resp = await request(app)
      .post(`/classes/${idModule}`)
      .send(mockClassInvalidKey)
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual("Invalid key");
  });

  test("POST /classes/:moduleId -> Should not be able to create a class with an invalid module ID", async () => {
    const resp = await request(app)
      .post(`/classes/kdvvgsjvkjabvjk`)
      .send(mockClass)
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(404);
    expect(resp.body.message).toEqual("Module not found");
  });

  test("POST /classes/:moduleId -> Should not be able to create two classes whith the same name", async () => {
    const resp = await request(app)
      .post(`/classes/${idModule}`)
      .send(mockClass)
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual(
      "This class's name is already registered"
    );
  });

  test("GET /classes -> Should be able to list all classes", async () => {
    const resp = await request(app)
      .get(`/classes`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(200);
    expect(resp.body.data[0]).toHaveProperty("image");
    expect(resp.body.data[0]).toHaveProperty("name");
    expect(resp.body.data[0]).toHaveProperty("description");
    expect(resp.body.data[0]).toHaveProperty("id");
    expect(resp.body.data[0]).toHaveProperty("createdAt");
    expect(resp.body.data[0]).toHaveProperty("updatedAt");
  });

  test("GET /classes -> Should not be able to list all classes without authorization", async () => {
    const resp = await request(app)
      .get(`/classes`)
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("GET /classes/:classId -> Should be able to list a class", async () => {
    const resp = await request(app)
      .get(`/classes/${idClass}`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(200);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data).toHaveProperty("description");
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");
    expect(resp.body.data).toHaveProperty("module");
  });

  test("GET /classes/:classId -> Should not be able to list a class without authorization", async () => {
    const resp = await request(app)
      .get(`/classes/${idClass}`)
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("GET /classes/:classId -> Should not be able to list a class whith an invalid ID", async () => {
    const resp = await request(app)
      .get(`/classes/invalidId`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(404);
    expect(resp.body.message).toEqual("Class not found");
  });

  test("PATH /classes/:classId -> Should be able to edit a class", async () => {
    const resp = await request(app)
      .patch(`/classes/${idClass}`)
      .send({ description: "." })
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(200);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual(mockClass.name);
    expect(resp.body.data).toHaveProperty("description");
    expect(resp.body.data.description).toEqual(".");
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");
  });

  test("PATH /classes/:classId -> Should not be able to edit a class without authorization", async () => {
    const resp = await request(app)
      .patch(`/classes/${idClass}`)
      .send({ description: "." })
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("PATH /classes/:classId -> Should not be able to edit a class without being adm", async () => {
    const resp = await request(app)
      .patch(`/classes/${idClass}`)
      .send({ description: "." })
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Unauthorized");
  });

  test("PATH /classes/:classId -> Should not be able to edit a class with an invalid key", async () => {
    const resp = await request(app)
      .patch(`/classes/${idClass}`)
      .send(mockClassInvalidKey)
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual("Invalid key");
  });

  test("PATH /classes/:classId -> Should not be able to edit a class with an invalid ID", async () => {
    const resp = await request(app)
      .patch(`/classes/invalidId`)
      .send({ description: "." })
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(404);
    expect(resp.body.message).toEqual("Class not found");
  });

  test("PATH /classes/:classId -> Should not be able to edit a class with an invalid module ID", async () => {
    const resp = await request(app)
      .patch(`/classes/${idClass}`)
      .send({ moduleId: "auunfcynya8656v" })
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(404);
    expect(resp.body.message).toEqual("Module not found");
  });

  test("PATH /classes/:classId -> Should not be able to register two classes whith the same name", async () => {
    const resp = await request(app)
      .patch(`/classes/${idClass}`)
      .send({ name: "Exponenciação" })
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual(
      "This class's name is already registered"
    );
  });

  test("DELETE /classes/:classId -> Should not be able to delete a class without authorization", async () => {
    const resp = await request(app)
      .delete(`/classes/${idClass}`)
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("DELETE /classes/:classId -> Should not be able to delete a class without being adm", async () => {
    const resp = await request(app)
      .delete(`/classes/${idClass}`)
      .send()
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Unauthorized");
  });

  test("DELETE /classes/:classId -> Should be able to delete a class", async () => {
    const resp = await request(app)
      .delete(`/classes/${idClass}`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(204);
  });

  test("DELETE /classes/:classId -> Should not be able to delete a class with an invalid id", async () => {
    const resp = await request(app)
      .delete(`/classes/${idClass}`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(404);
    expect(resp.body.message).toEqual("Class not found");
  });
});
