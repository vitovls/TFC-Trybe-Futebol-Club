import { Request, Response } from 'express';
import StatusCodes from '../helpers/StatusCode';
import loginServices from '../services/loginServices';

const loginController = async (req:Request, res:Response) => {
  const { email } = req.body;
  const user = await loginServices.getUserByMail(email);
  if (user !== 'NOT FOUND') {
    return res.status(StatusCodes.OK).json(user);
  } return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
};

export default loginController;
