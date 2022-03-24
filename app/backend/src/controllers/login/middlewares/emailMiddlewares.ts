import { NextFunction, Request, Response } from 'express';
import verifyMail from '../../../helpers/regexMail';
import StatusCodes from '../../../helpers/StatusCode';

const emailMiddleware = (req:Request, res:Response, next: NextFunction) => {
  const { email } = req.body;
  if (email) {
    if (verifyMail(email)) {
      return next();
    } return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  } return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'All fields must be filled' });
};

export default emailMiddleware;
