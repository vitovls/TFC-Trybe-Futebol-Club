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
  const newMatch = await Matchs
    .create(obj);
  console.log('create service');
  return newMatch;
};
