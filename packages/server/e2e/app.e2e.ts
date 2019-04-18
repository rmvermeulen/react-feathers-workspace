import { Server } from "http";
import rp from "request-promise";
import url from "url";

import { createApplication } from "../src/app";
import { createTestConnection } from "../test/testConnection";

describe("Feathers application tests (with jest)", () => {
  let server: Server;
  let port: number;
  let getUrl: (p?: string) => string;
  beforeAll(async done => {
    const app = createApplication(await createTestConnection());

    port = app.get("port") || 3030;
    getUrl = (pathname?: string) =>
      url.format({
        hostname: app.get("host") || "localhost",
        protocol: "http",
        port,
        pathname
      });

    server = app.listen(port);
    server.once("listening", () => done());
  });

  afterAll(done => {
    server.close(done);
  });

  it("starts and shows the index page", async () => {
    await expect(rp(getUrl())).resolves.toContain("<html>");
  });

  describe("404", () => {
    it("shows a 404 HTML page", () => {
      return rp({
        url: getUrl("path/to/nowhere"),
        headers: {
          Accept: "text/html"
        }
      }).catch(res => {
        expect(res.statusCode).toBe(404);
        expect(res.error.indexOf("<html>")).not.toBe(-1);
      });
    });

    it("shows a 404 JSON error without stack trace", () => {
      return rp({
        url: getUrl("path/to/nowhere"),
        json: true
      }).catch(res => {
        expect(res.statusCode).toBe(404);
        expect(res.error.code).toBe(404);
        expect(res.error.message).toBe("Page not found");
        expect(res.error.name).toBe("NotFound");
      });
    });
  });
});
