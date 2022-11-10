import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import {
  mockModule,
  mockModuleInvlidKey,
  mockUser,
  mockUserAdm,
  mockUserAdmLogin,
  mockUserLogin,
} from "../mocks/mocks";

describe("/modules", () => {
  let connection: DataSource;
  let tokenUser: string;
  let tokenUserAdm: string;
  let idModule: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.log("Erro durante a inicialização", err));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /modules -> Should be able to create a module", async () => {
    const createUserAdm = await request(app).post("/users").send(mockUserAdm);
    const createUser = await request(app).post("/users").send(mockUser);

    const loginUserAdm = await request(app)
      .post("/login")
      .send(mockUserAdmLogin);
    const loginUser = await request(app).post("/login").send(mockUserLogin);

    tokenUserAdm = `Bearer ${loginUserAdm.body.token}`;
    tokenUser = `Bearer ${loginUser.body.token}`;

    const resp = await request(app)
      .post("/modules")
      .send(mockModule)
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(201);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual(mockModule.name);
    expect(resp.body.data).toHaveProperty("description");
    expect(resp.body.data.description).toEqual(mockModule.description);
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");

    idModule = resp.body.data.id;
  });

  test("POST /modules -> Should not be able to create a module without authorization", async () => {
    const resp = await request(app)
      .post("/modules")
      .send(mockModule)
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("POST /modules -> Should not be able to create a module without being adm", async () => {
    const resp = await request(app)
      .post("/modules")
      .send(mockModule)
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Unauthorized");
  });

  test("POST /modules -> Should not be able to create a module whit an invalid key", async () => {
    const resp = await request(app)
      .post("/modules")
      .send(mockModuleInvlidKey)
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual("Invalid key");
  });

  test("POST /modules -> Should not be able to create two module whith the same name", async () => {
    const resp = await request(app)
      .post("/modules")
      .send(mockModule)
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual(
      "This module's name is already registered"
    );
  });

  test("GET /modules -> Should be able to list all modules", async () => {
    const resp = await request(app)
      .get("/modules")
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(200);
    expect(resp.body.data[0]).toHaveProperty("image");
    expect(resp.body.data[0]).toHaveProperty("name");
    expect(resp.body.data[0]).toHaveProperty("id");
    expect(resp.body.data[0]).toHaveProperty("createdAt");
    expect(resp.body.data[0]).toHaveProperty("updatedAt");
  });

  test("GET /modules -> Should not be able to list all modules without authorization", async () => {
    const resp = await request(app)
      .get("/modules")
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("GET /modules/:moduleId -> Should be able to list a module", async () => {
    const resp = await request(app)
      .get(`/modules/${idModule}`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(200);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual(mockModule.name);
    expect(resp.body.data).toHaveProperty("description");
    expect(resp.body.data.description).toEqual(mockModule.description);
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");
  });

  test("GET /modules/:moduleId -> Should not be able to list a module without authorization", async () => {
    const resp = await request(app)
      .get(`/modules/${idModule}`)
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("GET /modules/:moduleId -> Should not be able to list a module with an invalid id", async () => {
    const resp = await request(app)
      .get(`/modules/invalidId`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(404);
    expect(resp.body.message).toEqual("No module found");
  });

  test("GET /modules/:moduleId/classes -> Should be able to list a module whith classes", async () => {
    const resp = await request(app)
      .get(`/modules/${idModule}/classes`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(200);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual(mockModule.name);
    expect(resp.body.data).toHaveProperty("description");
    expect(resp.body.data.description).toEqual(mockModule.description);
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");
    expect(resp.body.data).toHaveProperty("classes");
  });

  test("PATCH /modules/:moduleId -> Should be able to edit module", async () => {
    const resp = await request(app)
      .patch(`/modules/${idModule}`)
      .send({ name: "Física" })
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(200);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual("Física");
    expect(resp.body.data).toHaveProperty("description");
    expect(resp.body.data.description).toEqual(mockModule.description);
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");
  });

  test("PATCH /modules/:moduleId -> Should not be able to edit module without authorization", async () => {
    const resp = await request(app)
      .patch(`/modules/${idModule}`)
      .send({ name: "Física" })
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("PATCH /modules/:moduleId -> Should not be able to edit module without being adm", async () => {
    const resp = await request(app)
      .patch(`/modules/${idModule}`)
      .send({ name: "Física" })
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Unauthorized");
  });

  test("PATCH /modules/:moduleId -> Should not be able to edit module with an invalid key", async () => {
    const resp = await request(app)
      .patch(`/modules/${idModule}`)
      .send(mockModuleInvlidKey)
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual("Invalid key");
  });

  test("DELETE /modules -> Should not be able to delete a module without authorization", async () => {
    const resp = await request(app)
      .delete(`/modules/${idModule}`)
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("DELETE /modules -> Should not be able to delete a module whitout being a adm", async () => {
    const resp = await request(app)
      .delete(`/modules/${idModule}`)
      .send()
      .set("Authorization", tokenUser);

      expect(resp.status).toBe(401);
      expect(resp.body.message).toEqual("Unauthorized");
  });

  test("DELETE /modules -> Should be able to delete a module", async () => {
    const resp = await request(app)
      .delete(`/modules/${idModule}`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(204);
  });

  test("DELETE /modules -> Should not be able to delete a module with an invalid id", async () => {
    const resp = await request(app)
      .delete(`/modules/${idModule}`)
      .send()
      .set("Authorization", tokenUserAdm);

    expect(resp.status).toBe(404);
    expect(resp.body.message).toEqual("Module not found");
  });
});
