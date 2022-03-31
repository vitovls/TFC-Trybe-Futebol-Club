import { Router } from 'express';
import clubsRoutes from './clubs';
import leaderboardsRoutes from './leaderboards';
import loginRoutes from './login';
import matchsRoute from './matchs';

const routes = Router();

routes.use('/clubs', clubsRoutes);
routes.use('/login', loginRoutes);
routes.use('/matchs', matchsRoute);
routes.use('/leaderboard', leaderboardsRoutes);

export default routes;
