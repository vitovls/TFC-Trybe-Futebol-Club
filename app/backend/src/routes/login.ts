import { Router } from 'express';
import emailMiddleware from '../controllers/middlewares/emailMiddlewares';
import passwordMiddleware from '../controllers/middlewares/passwordMiddlewares';
import loginController from '../controllers/login';

const loginRoutes = Router();

loginRoutes.post(
  '/login',
  emailMiddleware,
  passwordMiddleware,
  loginController,
);

export default loginRoutes;
