import { App } from '../app';

import { Messages } from './messages';

export const services = (app: App) => {
  app.use('/messages', new Messages());
};
