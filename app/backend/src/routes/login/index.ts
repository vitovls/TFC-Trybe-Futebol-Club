import { Router } from 'express';
import emailMiddleware from '../../controllers/login/middlewares/emailMiddlewares';
import passwordMiddleware from '../../controllers/login/middlewares/passwordMiddlewares';
import loginController from '../../controllers/login/login';
import loginValidateController from '../../controllers/login/loginValidateController';

const loginRoutes = Router();

loginRoutes.post(
  '/',
  emailMiddleware,
  passwordMiddleware,
  loginController,
);

loginRoutes.get(
  '/validate',
  loginValidateController,
);

export default loginRoutes;
