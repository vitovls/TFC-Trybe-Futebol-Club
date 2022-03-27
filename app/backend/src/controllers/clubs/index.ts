import { Request, Response } from 'express';
import StatusCodes from '../../helpers/StatusCode';
import { getAllClubs, getClubsById } from '../../services/clubs/index';

export const clubsGetAll = async (req:Request, res:Response) => {
  const listClubs = await getAllClubs();
  return res.status(StatusCodes.OK).json(listClubs);
};

export const clubsGetById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const club = await getClubsById(id);
  return res.status(StatusCodes.OK).json(club);
};
