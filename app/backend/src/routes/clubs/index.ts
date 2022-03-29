import { Router } from 'express';
import clubsControler from '../../controllers/clubs';

const clubsRoutes = Router();

clubsRoutes.get('/', clubsControler.clubsGetAll);

clubsRoutes.get('/:id', clubsControler.clubsGetById);

export default clubsRoutes;
