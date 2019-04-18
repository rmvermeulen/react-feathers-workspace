import { App } from "../app";

import { MessageService } from "./Message.service";

export const services = () => (app: App) => {
  app.use("/messages", new MessageService());
};
