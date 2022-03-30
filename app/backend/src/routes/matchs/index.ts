import { Router } from 'express';
import validateToken from '../../controllers/matchs/middleware/token';
import { createMatch, getMatchs,
  finishMatch, updateScoreboard } from '../../controllers/matchs';
import { notFoundTeam, notDuplicateTeam } from '../../controllers/matchs/middleware/teams';
import fieldsValidate from '../../controllers/matchs/middleware/fields';

const matchsRoute = Router();

matchsRoute.get('/', getMatchs);

matchsRoute.post(
  '/',
  fieldsValidate,
  validateToken,
  notFoundTeam,
  notDuplicateTeam,
  createMatch,
);

matchsRoute.patch('/:id/finish', finishMatch);

matchsRoute.patch('/:id', updateScoreboard);

export default matchsRoute;
