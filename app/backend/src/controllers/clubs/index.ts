import { Request, Response } from 'express';
import StatusCodes from '../../helpers/StatusCode';
import clubsServices from '../../services/clubs/index';

const clubsController = async (req:Request, res:Response) => {
  const listClubs = await clubsServices.getAllClubs();
  return res.status(StatusCodes.OK).json(listClubs);
};

export default clubsController;
