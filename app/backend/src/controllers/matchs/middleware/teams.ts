import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../../../helpers/StatusCode';
import { getClubsById } from '../../../services/clubs';

export const notDuplicateTeam = async (req:Request, res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const message = 'It is not possible to create a match with two equal teams';
  if (homeTeam === awayTeam) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
  console.log('notDuplicate Middle');
  next();
};

export const notFoundTeam = async (req:Request, res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const message = 'There is no team with such id!';
  const getHomeTeam = await getClubsById(homeTeam);
  const getAwayTeam = await getClubsById(awayTeam);
  if (getHomeTeam === null || getAwayTeam === null) {
    return res.status(401).json({ message });
  } console.log('notFound Middle');
  next();
};
