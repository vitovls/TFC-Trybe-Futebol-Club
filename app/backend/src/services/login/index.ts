import * as bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../../helpers/token';
import Users from '../../database/models/Users';

const getUserByMail = async (mail: string, pass: string) => {
  const user = await Users.findOne({ where: { email: mail } });
  const token = generateToken(mail);
  const NOT_FOUND = 'NOT FOUND';
  if (user !== null) {
    const validPassword = await bcrypt.compare(pass, user?.password);
    if (validPassword) {
      const { id, username, role, email } = user;
      return {
        user: {
          id,
          username,
          role,
          email,
        },
        token,
      };
    }
  } return NOT_FOUND;
};

const getRole = async (auth:string) => {
  const validToken = await verifyToken(auth);
  const user = await Users.findOne({ where: { email: validToken } });
  if (user !== null) return user.role;
};

const loginServices = {
  getUserByMail,
  getRole,
};

export default loginServices;
