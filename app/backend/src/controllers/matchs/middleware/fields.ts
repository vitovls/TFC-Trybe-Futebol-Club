import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../../../helpers/StatusCode';

const fieldsValidate = (req: Request, res: Response, next:NextFunction) => {
  const {
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress } = req.body;
  if (!homeTeam || !homeTeamGoals || !awayTeam || !awayTeamGoals || !inProgress) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  } next();
};

export default fieldsValidate;
