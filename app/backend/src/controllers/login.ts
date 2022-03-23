import { Request, Response } from 'express';
import StatusCodes from '../helpers/StatusCode';

const loginController = (_req:Request, res:Response) => {
  const message = 'futuro token';
  return res.status(StatusCodes.OK).json({ message });
};

export default loginController;
