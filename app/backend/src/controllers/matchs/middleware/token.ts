import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../../../helpers/StatusCode';
import { verifyToken } from '../../../helpers/token';

const validateToken = async (req:Request, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      verifyToken(authorization);
      return next();
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token!' });
    }
  }
  return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found!' });
};

export default validateToken;
