import { NextFunction, Request, Response } from 'express';
import verifyMail from '../../helpers/regexMail';

const emailMiddleware = (req:Request, res:Response, next: NextFunction) => {
  const { email } = req.body;
  if (email) {
    if (verifyMail(email)) {
      return next();
    } return res.status(400).json({ message: 'Incorrect email or password' });
  } return res.status(400).json({ message: 'All fields must be filled' });
};

export default emailMiddleware;
