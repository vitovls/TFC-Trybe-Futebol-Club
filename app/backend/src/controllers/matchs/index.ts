import { Request, Response } from 'express';
import StatusCodes from '../../helpers/StatusCode';
import { create, getAll } from '../../services/matchs';

export const getMatchsAll = async (req:Request, res:Response) => {
  const listMatchs = await getAll();
  return res.status(StatusCodes.OK).json(listMatchs);
};

export const createMatch = async (req:Request, res:Response) => {
  const newMatch = req.body;
  const match = await create(newMatch);
  console.log('create controller');
  return res.status(StatusCodes.CREATED).json(match);
};
