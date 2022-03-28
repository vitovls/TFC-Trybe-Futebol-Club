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

export const getInProgress = () => {};
