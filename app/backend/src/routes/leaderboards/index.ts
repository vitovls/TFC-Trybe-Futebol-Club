import { Router } from 'express';
import matchOfTeams from '../../controllers/leaderboards';

const leaderboardsRoutes = Router();

leaderboardsRoutes.get('/home', matchOfTeams);

export default leaderboardsRoutes;
