import { Router } from 'express';
import validateToken from '../../controllers/matchs/middleware/token';
import { createMatch, getMatchs,
  updateMatch, updateScoreboard } from '../../controllers/matchs';
import { notFoundTeam, notDuplicateTeam } from '../../controllers/matchs/middleware/teams';

const matchsRoute = Router();

matchsRoute.get('/', getMatchs);

matchsRoute.post(
  '/',
  validateToken,
  notFoundTeam,
  notDuplicateTeam,
  createMatch,
);

matchsRoute.patch('/:id/finish', updateMatch);

matchsRoute.patch('/:id', updateScoreboard);

export default matchsRoute;
