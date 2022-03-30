import { Request, Response } from 'express';
import { allStatistic } from '../../services/leaderboards';

const matchOfTeams = async (req:Request, res:Response) => {
  const stastistic = await allStatistic();
  return res.status(200).json(stastistic);
};

export default matchOfTeams;
