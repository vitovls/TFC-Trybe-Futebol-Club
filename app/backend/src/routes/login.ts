import { Router } from 'express';
import emailMiddleware from '../controllers/middlewares/emailMiddlewares';
import passwordMiddleware from '../controllers/middlewares/passwordMiddlewares';
import loginController from '../controllers/login';
import loginValidateController from '../controllers/loginValidateController';

const loginRoutes = Router();

loginRoutes.post(
  '/login',
  emailMiddleware,
  passwordMiddleware,
  loginController,
);

loginRoutes.get(
  '/login/validate',
  loginValidateController,
);

export default loginRoutes;
