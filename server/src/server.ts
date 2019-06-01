import { ExpressServer } from './express-server';

let app = new ExpressServer().getApp();
export { app };
