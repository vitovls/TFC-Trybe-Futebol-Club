import Clubs from '../../database/models/Clubs';

export const getAllClubs = async () => {
  const clubsList = await Clubs.findAll();
  return clubsList;
};

export const getClubsById = async (id: string) => {
  const club = await Clubs.findOne({ where: { id } });
  return club;
};

export const getAllClubsWithId = async () => {
  const teams = await Clubs.findAll({ attributes: ['clubName'] });
  return teams.map((e) => e.clubName);
};

export const getClubsWithId = async (clubName:string) => Clubs
  .findOne({ where: { clubName }, attributes: ['clubName'] });

export const getClubsByName = async (clubName: string) => Clubs.findOne({ where: { clubName } });
