import { Router } from 'express';
import { clubsGetAll, clubsGetById } from '../../controllers/clubs';

const clubsRoutes = Router();

clubsRoutes.get('/clubs', clubsGetAll);

clubsRoutes.get('/clubs/:id', clubsGetById);

export default clubsRoutes;
