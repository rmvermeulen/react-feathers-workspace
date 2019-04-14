import { createConnection } from 'typeorm';
import { app } from './app';
import { logger } from './logger';

createConnection().then((connection) => {
  logger.info('Database connection loaded');

  const port = app.get('port');
  const server = app.listen(port);
  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason),
  );

  server.on('listening', () =>
    logger.info(
      'Feathers application started on http://%s:%d',
      app.get('host'),
      port,
    ),
  );
});
