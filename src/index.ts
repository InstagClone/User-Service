import createApp from './app';
import config from './config';
import Logger from './utils/logger';
import type { Application } from 'express';

const app: Application = createApp();
console.log(config.port);
app.listen(config.port || 3000, (): void => {
  Logger.info(`Server running on port ${config.port}`);
});
