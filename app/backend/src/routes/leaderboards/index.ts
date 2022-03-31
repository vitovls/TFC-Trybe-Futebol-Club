import { Router } from 'express';
import { awayLeaderboards,
  generalLeaderboards,
  homeLeaderboards } from '../../controllers/leaderboards';

const leaderboardsRoutes = Router();

leaderboardsRoutes.get('/', generalLeaderboards);

leaderboardsRoutes.get('/home', homeLeaderboards);

leaderboardsRoutes.get('/away', awayLeaderboards);

export default leaderboardsRoutes;
