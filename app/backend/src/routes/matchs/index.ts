import { Router } from 'express';
import validateToken from '../../controllers/matchs/middleware/token';
import { createMatch, getMatchs,
  finishMatch, updateScoreboard } from '../../controllers/matchs';
import { notFoundTeam, notDuplicateTeam } from '../../controllers/matchs/middleware/teams';

const matchsRoute = Router();

matchsRoute.get('/', getMatchs);

matchsRoute.post(
  '/',
  validateToken,
  notDuplicateTeam,
  notFoundTeam,
  createMatch,
);

matchsRoute.patch('/:id/finish', finishMatch);

matchsRoute.patch('/:id', updateScoreboard);

export default matchsRoute;
