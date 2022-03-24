import { Router } from 'express';
import clubsRoutes from './clubs';
import loginRoutes from './login';

const routes = Router();

routes.use(clubsRoutes, loginRoutes);

export default routes;
