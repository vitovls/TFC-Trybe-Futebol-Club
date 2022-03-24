import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../../helpers/StatusCode';

const passwordMiddleware = (req:Request, res:Response, next: NextFunction) => {
  const { password } = req.body;
  if (password) {
    if (password.length > 5) {
      return next();
    } return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  } return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'All fields must be filled' });
};

export default passwordMiddleware;
