import { Request, Response } from 'express';
import { getAll } from '../../services/matchs';

export const getMatchsAll = async (req:Request, res:Response) => {
  const listMatchs = await getAll();
  return res.status(200).json(listMatchs);
};

export const getInProgress = async () => {};
