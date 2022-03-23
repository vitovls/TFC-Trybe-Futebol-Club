import { NextFunction, Request, Response } from 'express';

const passwordMiddleware = (req:Request, res:Response, next: NextFunction) => {
  const { password } = req.body;
  if (password) {
    if (password.length > 5) {
      return next();
    } return res.status(400).json({ message: 'Incorrect email or password' });
  } return res.status(400).json({ message: 'All fields must be filled' });
};

export default passwordMiddleware;
