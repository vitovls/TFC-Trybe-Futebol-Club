import { Request, Response } from 'express';
import { getRole } from '../../services/login';

const loginValidateController = async (req:Request, res:Response) => {
  const { authorization } = req.headers;
  if (authorization !== undefined) {
    const role = await getRole(authorization);
    return res.status(200).json(role);
  } return res.status(401).json({ message: 'Token inválido' });
};

export default loginValidateController;
