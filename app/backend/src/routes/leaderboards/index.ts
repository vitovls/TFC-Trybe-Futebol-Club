import { Router } from 'express';
import matchOfTeams from '../../controllers/leaderboards';

const leaderboardsRoutes = Router();

leaderboardsRoutes.get('/', matchOfTeams);

export default leaderboardsRoutes;
