import { Request, Response } from 'express';
import { compareStatisticAway } from '../../services/leaderboards/away';
import { compareStatisticHome } from '../../services/leaderboards/home';
import StatusCodes from '../../helpers/StatusCode';
import { compareStatisticGeneral } from '../../services/leaderboards';

export const generalLeaderboards = async (_req:Request, res:Response) => {
  const stastistics = await compareStatisticGeneral();
  return res.status(StatusCodes.OK).json(stastistics);
};

export const homeLeaderboards = async (_req: Request, res: Response) => {
  const homeStastistics = await compareStatisticHome();
  return res.status(StatusCodes.OK).json(homeStastistics);
};

export const awayLeaderboards = async (_req: Request, res: Response) => {
  const awayStastistics = await compareStatisticAway();
  return res.status(StatusCodes.OK).json(awayStastistics);
};
