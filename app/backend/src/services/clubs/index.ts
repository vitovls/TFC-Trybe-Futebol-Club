import Clubs from '../../database/models/Clubs';

export const getAllClubs = async () => {
  const clubsList = await Clubs.findAll();
  return clubsList;
};

export const getClubsById = async (id: string) => {
  const club = await Clubs.findOne({ where: { id } });
  return club;
};
