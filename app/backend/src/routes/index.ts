import { Router } from 'express';
import loginRoutes from './login';

const routes = Router();

routes.use(loginRoutes);

export default routes;
