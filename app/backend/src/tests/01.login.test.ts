import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// Solução proposta pelo Coruja. Obrigado, Coruja!!!
import chaiHttp = require('chai-http');

import Users from '../database/models/Users';

import {findOneLoginMock, returnLoginMock} from '../tests/mocks/login'

import { app } from '../app';

import {validLogin, noEmail,
  noPassword,errorMail1,
  errorMail2,errorMail3,
  errorPassword} from './mocks/login/req.body'

import { Response } from 'superagent';
import StatusCodes from '../helpers/StatusCode';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "/login"', () => {
  let res: Response;
  let message: string;
  before(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves(findOneLoginMock as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore()
  })
  describe('METHOD POST', () => {
    it('Se o login for bem sucedido, retorna uma status 200 com informações do usuário e senha', async () => {
      res = await chai.request(app).post('/login').send(validLogin);
      const resolve = JSON.stringify(returnLoginMock)
      expect(res.text).to.be.eq(resolve);
      expect(res).to.have.status(StatusCodes.OK);
    });
    it('Se o campo "email" não estiver presente na corpo da requisição, retonar um status 401, com  a messagem de erro "All fields must be filled"', async () => {
      res = await chai.request(app).post('/login').send(noEmail);
      message = "All fields must be filled";
      const resolve = JSON.stringify({message});
      expect(res.text).to.be.eq(resolve);
      expect(res).to.have.status(StatusCodes.UNAUTHORIZED)
    })
    it('Se o campo "email" não for um email valido, retorna um status 401, com a messagem de erro "Incorrect email or password"', async () => {
      message = "Incorrect email or password";
      const resolve = JSON.stringify({message});
  
      res = await chai.request(app).post('/login').send(errorMail1)
      expect(res).to.have.status(StatusCodes.UNAUTHORIZED)
      expect(res.text).to.be.eq(resolve)
      res = await chai.request(app).post('/login').send(errorMail2)
      expect(res).to.have.status(StatusCodes.UNAUTHORIZED)
      expect(res.text).to.be.eq(resolve)
      res = await chai.request(app).post('/login').send(errorMail3)
      expect(res).to.have.status(StatusCodes.UNAUTHORIZED)
      expect(res.text).to.be.eq(resolve)
    })
    it('Se o campo "email" não estiver presente na corpo da requisição, retonar um status 400 com messagem de erro "All fields must be filled"', async () => {
      res = await chai.request(app).post('/login').send(noPassword);
      message = "All fields must be filled";
      const resolve = JSON.stringify({message});
      expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
      expect(res.text).to.be.eq(resolve);
    })
    it('Se o campo "password" tiver menos de 6 caracteres, retorna um status 401, com messagem de erro "Incorrect email or password"',async () => {
      res = await chai.request(app).post('/login').send(errorPassword);
      message = "Incorrect email or password";
      const resolve = JSON.stringify({message});
      expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
      expect(res.text).to.be.eq(resolve);
    })
  })
});
