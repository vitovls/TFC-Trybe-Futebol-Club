import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../../../helpers/StatusCode';
import { getClubsById } from '../../../services/clubs';

export const notDuplicateTeam = async (req:Request, res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const message = 'It is not possible to create a match with two equal teams';
  if (homeTeam === awayTeam) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message });
  }
  next();
};

export const notFoundTeam = async (req:Request, res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const message = 'There is no team with such id!';
  const getHomeTeam = await getClubsById(homeTeam);
  const getAwayTeam = await getClubsById(awayTeam);
  if (getHomeTeam === null || getAwayTeam === null) {
    return res.status(StatusCodes.NOT_FOUND).json({ message });
  }
  next();
};
