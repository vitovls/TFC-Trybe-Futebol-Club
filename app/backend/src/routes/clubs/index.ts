import { Router } from 'express';
import clubsController from '../../controllers/clubs';

const clubsRoutes = Router();

clubsRoutes.get('/clubs', clubsController);

export default clubsRoutes;
