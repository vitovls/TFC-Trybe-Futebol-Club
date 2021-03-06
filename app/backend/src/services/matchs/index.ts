import { IMatch } from '../../helpers/interfaces';
import Clubs from '../../database/models/Clubs';
import Matchs from '../../database/models/Matchs';

export const getAll = async () => {
  const listMatchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ] });
  return listMatchs;
};

export const create = async (obj:IMatch) => {
  const inProgress = true;
  const newMatch = await Matchs
    .create(obj);
  const { id,
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals } = newMatch;
  return {
    id,
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress,
  };
};

export const updateProgressMatch = async (id:number) => Matchs
  .update({ inProgress: false }, { where: { id } });

export const getInProgressMatch = async (id:number) => {
  const match = await Matchs.findOne({ where: { id } });
  return match;
};

export const getAllProgressMatchs = async () => Matchs
  .findAll({ where: { inProgress: true },
    include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ] });

export const getAllNotInProgressMatchs = async () => Matchs
  .findAll({ where: { inProgress: false },
    include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ] });

export const getMatchsByHomeTeam = async (id:number) => Matchs
  .findAll({ where: { homeTeam: id, inProgress: false } });

export const getMatchsByAwayTeam = async (id:number) => Matchs
  .findAll({ where: { awayTeam: id, inProgress: false } });

export const updateMatchScoreboard = async (
  id:number,
  homeTeamGoals:number,
  awayTeamGoals:number,
) => {
  const match = await getInProgressMatch(id);
  const NOT_FOUND = 'NOT_FOUND';
  const NOT_IN_PROGRESS = 'NOT_IN_PROGRESS';
  if (match !== null) {
    if (match.inProgress) {
      return Matchs.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    } return NOT_IN_PROGRESS;
  } return NOT_FOUND;
};
