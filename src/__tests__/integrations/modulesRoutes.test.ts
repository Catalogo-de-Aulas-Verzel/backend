import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";

describe("/modules", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.log("Erro durante a inicialização", err));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("", async () => {});

});
