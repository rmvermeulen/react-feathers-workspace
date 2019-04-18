import { createApplication } from "./app";
import { logger } from "./logger";
import { setupDbConnection } from "./setupDbConnection";

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at: Promise ", promise, reason);
});

(async () => {
  const ormConnection = await setupDbConnection();
  logger.info("Database connection loaded");

  const app = createApplication(ormConnection);

  const port = app.get("port");
  const server = app.listen(port);

  server.on("listening", () =>
    logger.info(
      "Feathers application started on http://%s:%d",
      app.get("host"),
      port
    )
  );
})().catch(error => logger.error("%s", error.stack));
