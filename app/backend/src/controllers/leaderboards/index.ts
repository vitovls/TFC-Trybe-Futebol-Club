import { Request, Response } from 'express';
import { compareStatistic } from '../../services/leaderboards';

const matchOfTeams = async (req:Request, res:Response) => {
  const stastistic = await compareStatistic();
  return res.status(200).json(stastistic);
};

export default matchOfTeams;
