import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// Solução proposta pelo Coruja. Obrigado, Coruja!!!
import chaiHttp = require('chai-http');

import { Response } from 'superagent';

import { app } from '../app';
import Users from '../database/models/Users';

import { findOneLoginMock } from './mocks/login'

import { validLogin } from './mocks/login/req.body'

import { generateToken } from '../helpers/token';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "/login/validate"', () => {
  let res: Response;
  let resolve: string;
  before(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves(findOneLoginMock as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore()
  })
  describe('METHOD GET', () => {
    it('Se o login for bem sucedido retorna um status 200 com a role do usuário', async () => {
      const {email} = validLogin
      const token = generateToken(email)
      res = await chai.request(app).get('/login/validate').set('authorization', token)
      resolve = JSON.stringify(findOneLoginMock.role)
      expect(res).to.be.have.status(200);
      expect(res.text).to.be.eq(resolve)
    });
  })
});