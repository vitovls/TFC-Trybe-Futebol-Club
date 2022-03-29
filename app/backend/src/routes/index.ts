import { Router } from 'express';
import clubsRoutes from './clubs';
import loginRoutes from './login';
import matchsRoute from './matchs';

const routes = Router();

routes.use('/clubs', clubsRoutes);
routes.use('/login', loginRoutes);
routes.use('/matchs', matchsRoute);

export default routes;
