import { join } from "path";
import { ConnectionOptions, createConnection } from "typeorm";

const fromRoot = (path: string) => join(process.cwd(), path);

export const setupDbConnection = (
  options: ConnectionOptions = {
    type: "sqlite",
    database: fromRoot("database.sqlite"),
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"].map(fromRoot),
    migrations: ["src/migration/**/*.ts"].map(fromRoot),
    subscribers: ["src/subscriber/**/*.ts"].map(fromRoot)
  }
) => createConnection(options);
