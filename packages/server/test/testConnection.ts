import { createConnection } from "typeorm";

export const createTestConnection = (entities?: any[]) =>
  createConnection({
    type: "sqlite",
    database: ":memory:"
  });
