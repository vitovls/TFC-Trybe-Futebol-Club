import { Router } from 'express';
import { getMatchsAll } from '../../controllers/matchs';

const matchsRoute = Router();

matchsRoute.get('/matchs', getMatchsAll);

export default matchsRoute;
