import { Router } from 'express';
import validateToken from '../../controllers/matchs/middleware/token';
import { createMatch, getMatchsAll } from '../../controllers/matchs';
import { notFoundTeam, notDuplicateTeam } from '../../controllers/matchs/middleware/teams';

const matchsRoute = Router();

matchsRoute.get('/', getMatchsAll);

matchsRoute.post(
  '/',
  validateToken,
  notFoundTeam,
  notDuplicateTeam,
  createMatch,
);

export default matchsRoute;
