import { generateToken } from '../helpers/token';
import Users from '../database/models/Users';

const getUserByMail = async (mail: string) => {
  const user = await Users.findOne({ where: { email: mail } });
  const token = generateToken(mail);
  const NOT_FOUND = 'NOT FOUND';
  if (user !== null) {
    return {
      user,
      token,
    };
  } return NOT_FOUND;
};

const loginServices = {
  getUserByMail,
};

export default loginServices;
