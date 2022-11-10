import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import { mockUser, mockUserLogin } from "../mocks/mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.log("Erro durante a inicialização", err));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login -> Should be able to login", async () => {
    const create = await request(app).post("/users").send(mockUser);

    const resp = await request(app).post("/login").send(mockUserLogin);

    expect(resp.status).toBe(200);
    expect(resp.body).toHaveProperty("token");
  });

  test("POST /login -> Should not be able to login whith invalid key", async () => {
    const resp = await request(app)
      .post("/login")
      .send({ emaill: "maria@mail.com", password: "1234" });

    expect(resp.status).toBe(400);
    expect(resp.body.message).toEqual("Invalid key");
  });

  test("POST /login -> Should not be able to login whith wrong email or password", async () => {
    const resp = await request(app)
      .post("/login")
      .send({ email: "maria2@mail.com", password: "1234" });

    expect(resp.status).toBe(403);
    expect(resp.body.message).toEqual("Invalid user or password");
  });
});
