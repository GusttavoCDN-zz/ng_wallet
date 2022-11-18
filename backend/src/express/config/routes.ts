import { Application } from 'express';
import * as routes from '../routes';

console.log(routes);
export default (app: Application): void => {
  app.use('/api', ...Object.values(routes));
};
