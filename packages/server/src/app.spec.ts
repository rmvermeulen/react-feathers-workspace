import { createApplication } from "../src/app";
import { createTestConnection } from "../test/testConnection";

jest.mock("./services/index.ts", () => ({
  services: () => () => {}
}));

describe("App", () => {
  test("is server", async () => {
    const app = createApplication({} as any);
    expect(app).toBeDefined();
    expect(app.listen).toBeFunction();
  });
});
