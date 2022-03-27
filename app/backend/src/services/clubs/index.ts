import Clubs from '../../database/models/Clubs';

const getAllClubs = async () => {
  const clubsList = await Clubs.findAll();
  return clubsList;
};

const clubsServices = {
  getAllClubs,
};

export default clubsServices;
