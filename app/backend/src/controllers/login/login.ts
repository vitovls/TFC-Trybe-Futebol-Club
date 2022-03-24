import { Request, Response } from 'express';
import StatusCodes from '../../helpers/StatusCode';
import { getUserByMail } from '../../services/login';

const loginController = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const user = await getUserByMail(email, password);
  if (user !== 'NOT FOUND') {
    return res.status(StatusCodes.OK).json(user);
  } return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
};

export default loginController;
