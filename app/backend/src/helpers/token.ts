import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export function generateToken(data: string) {
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');
  const token = jwt.sign(data, secret);
  return token;
}

export function verifyToken(token: string) {
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');
  return jwt.verify(token, secret);
}
