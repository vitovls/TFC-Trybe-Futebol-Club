import { Router } from 'express';
import clubsRoutes from './clubs';
import loginRoutes from './login';
import matchsRoute from './matchs';

const routes = Router();

routes.use(clubsRoutes, loginRoutes, matchsRoute);

export default routes;
