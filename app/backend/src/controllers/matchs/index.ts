import { Request, Response } from 'express';
import { IMatch } from '../../helpers/interfaces';
import StatusCodes from '../../helpers/StatusCode';
import { create, getAll,
  getAllNotInProgressMatchs,
  getAllProgressMatchs, updateMatchScoreboard,
  updateProgressMatch } from '../../services/matchs';

export const getMatchs = async (req:Request, res:Response) => {
  const { inProgress } = req.query;
  console.log(req.query);
  let listMatchs: Array<IMatch>;
  if (inProgress !== undefined) {
    if (inProgress === 'true') {
      listMatchs = await getAllProgressMatchs();
      console.log('inProgressMatchs');
      return res.status(StatusCodes.OK).json(listMatchs);
    }
    listMatchs = await getAllNotInProgressMatchs();
    console.log('notProgressMatchs');
    return res.status(StatusCodes.OK).json(listMatchs);
  }
  listMatchs = await getAll();
  console.log('allMatchs');
  return res.status(StatusCodes.OK).json(listMatchs);
};

export const createMatch = async (req:Request, res:Response) => {
  const newMatch = req.body;
  const match = await create(newMatch);
  console.log('create controller');
  return res.status(StatusCodes.CREATED).json(match);
};

export const updateMatch = async (req:Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedMatch = await updateProgressMatch(id);
  return res.status(StatusCodes.OK).json(updatedMatch);
};

export const updateScoreboard = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { homeTeamGoals, awayTeamGoals } = req.body;

  const updatedMatch = await updateMatchScoreboard(id, homeTeamGoals, awayTeamGoals);
  if (updatedMatch !== 'NOT_FOUND' && updatedMatch !== 'NOT_IN_PROGRESS') {
    return res.status(StatusCodes.OK).json(updatedMatch);
  } if (updatedMatch === 'NOT_FOUND') {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found match' });
  } return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Match not in progress' });
};
