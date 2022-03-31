import { Router } from 'express';
import { generalLeaderboards, homeLeaderboards } from '../../controllers/leaderboards';

const leaderboardsRoutes = Router();

leaderboardsRoutes.get('/', generalLeaderboards);

leaderboardsRoutes.get('/home', homeLeaderboards);

leaderboardsRoutes.get('/away', homeLeaderboards);

export default leaderboardsRoutes;
