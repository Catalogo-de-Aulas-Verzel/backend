import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  mockUser,
  mockUserAdm,
  mockUserInvalidKey,
  mockUserLogin,
} from "../mocks/mocks";

describe("/users", () => {
  let connection: DataSource;
  let tokenUser: string;
  let idUser: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.log("Erro durante a inicialização", err));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -> Should be able to create a ADM user", async () => {
    const resp = await request(app).post("/users").send(mockUserAdm);

    expect(resp.status).toBe(201);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual(mockUserAdm.name);
    expect(resp.body.data).toHaveProperty("email");
    expect(resp.body.data.email).toEqual(mockUserAdm.email);
    expect(resp.body.data).toHaveProperty("isAdm");
    expect(resp.body.data.isAdm).toEqual(true);
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");
    expect(resp.body.data).not.toHaveProperty("password");
  });

  test("POST /users -> Should be able to create a regular user", async () => {
    const resp = await request(app).post("/users").send(mockUser);

    expect(resp.status).toBe(201);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual(mockUser.name);
    expect(resp.body.data).toHaveProperty("email");
    expect(resp.body.data.email).toEqual(mockUser.email);
    expect(resp.body.data).toHaveProperty("isAdm");
    expect(resp.body.data.isAdm).toEqual(false);
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");
    expect(resp.body.data).not.toHaveProperty("password");

    idUser = resp.body.data.id;
  });

  test("POST /users -> Should not be able to send a invalid key", async () => {
    const resp = await request(app).post("/users").send(mockUserInvalidKey);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual("Invalid key");
  });

  test("POST /users -> Should not be able to create two users whith the same email address", async () => {
    const resp = await request(app).post("/users").send(mockUser);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual("This email is already registered");
  });

  test("GET /users -> Should be able to list all users", async () => {
    const login = await request(app).post("/login").send(mockUserLogin);
    tokenUser = `Bearer ${login.body.token}`;

    const resp = await request(app)
      .get("/users")
      .send()
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(200);
    expect(resp.body.data[0]).toHaveProperty("image");
    expect(resp.body.data[0]).toHaveProperty("name");
    expect(resp.body.data[0]).toHaveProperty("email");
    expect(resp.body.data[0]).toHaveProperty("isAdm");
    expect(resp.body.data[0]).toHaveProperty("id");
    expect(resp.body.data[0]).toHaveProperty("createdAt");
    expect(resp.body.data[0]).toHaveProperty("updatedAt");
    expect(resp.body.data[0]).not.toHaveProperty("password");
  });

  test("GET /users -> Should not be able to list all users without authorization", async () => {
    const resp = await request(app)
      .get("/users")
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("GET /users/:userId -> Should be able to list a user", async () => {
    const resp = await request(app)
      .get(`/users/${idUser}`)
      .send()
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(200);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual(mockUser.name);
    expect(resp.body.data).toHaveProperty("email");
    expect(resp.body.data.email).toEqual(mockUser.email);
    expect(resp.body.data).toHaveProperty("isAdm");
    expect(resp.body.data.isAdm).toEqual(false);
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");
    expect(resp.body.data).not.toHaveProperty("password");
  });

  test("GET /users -> Should not be able to list a user without authorization", async () => {
    const resp = await request(app)
      .get(`/users/${idUser}`)
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("GET /users -> Should not be able to list another user than you", async () => {});

  test("PATCH /users -> Should be able to edit a user", async () => {
    const resp = await request(app)
      .patch("/users")
      .send({ email: "mariaUpdate@mail.com" })
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(200);
    expect(resp.body.data).toHaveProperty("image");
    expect(resp.body.data).toHaveProperty("name");
    expect(resp.body.data.name).toEqual(mockUser.name);
    expect(resp.body.data).toHaveProperty("email");
    expect(resp.body.data.email).toEqual("mariaUpdate@mail.com");
    expect(resp.body.data).toHaveProperty("isAdm");
    expect(resp.body.data.isAdm).toEqual(false);
    expect(resp.body.data).toHaveProperty("id");
    expect(resp.body.data).toHaveProperty("createdAt");
    expect(resp.body.data).toHaveProperty("updatedAt");
    expect(resp.body.data).not.toHaveProperty("password");
  });

  test("PATCH /users -> Should not be able to edit a user without authorization", async () => {
    const resp = await request(app)
      .patch("/users")
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("PATCH /users -> Should not be able to send a invalid key", async () => {
    const resp = await request(app)
      .patch("/users")
      .send({ emaill: "mariaUpdate@mail.com" })
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual("Invalid key");
  });

  test("PATCH /users -> Should not be able to register same email address than another user use", async () => {
    const resp = await request(app)
      .patch("/users")
      .send({ email: mockUserAdm.email })
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual("This email is already registered");
  });

  test("DELETE /users -> Should not be able to delete a user without authorization", async () => {
    const resp = await request(app)
      .delete("/users")
      .send()
      .set("Authorization", "no token");

    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid token");
  });

  test("DELETE /users -> Should be able to delete a user", async () => {
    const resp = await request(app)
      .delete("/users")
      .send()
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(204);
  });

  test("DELETE /users -> Should not be able to delete a user that alredy being deleted", async () => {
    const resp = await request(app)
      .delete("/users")
      .send()
      .set("Authorization", tokenUser);

    expect(resp.status).toBe(404);
    expect(resp.body.message).toEqual("User alredy being deleted");
  });
});
