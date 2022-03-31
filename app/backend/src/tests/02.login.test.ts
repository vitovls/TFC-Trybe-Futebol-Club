import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// Solução proposta pelo Coruja. Obrigado, Coruja!!!
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { reqBody } from './mocks/reqBody'

const { validLogin, noEmail,
  noPassword, errorMail1,
  errorMail2, errorMail3,
  errorPassword } = reqBody

import { Response } from 'superagent';

import {findOneMock} from '../tests/mocks/loginMocks'
import { generateToken } from '../helpers/token';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica o retorno da rota "/login"', () => {
  let res: Response;
  let result: boolean;

  before(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves(findOneMock as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore()
  })

  it('Se o login for bem sucedido retorna um objeto com o token', async () => {
    res = await chai.request(app).post('/login').send(validLogin)
    const {email} = validLogin
    const token = generateToken(email)
    result = res.text.includes(token)
    expect(res).to.be.a('object');
    expect(result).to.be.eq(true);
  });
  it('Se a requisição vinher sem email e/ou senha, retona um erro', async () => {
    res = await chai.request(app).post('/login').send(noEmail);
    result = res.text.includes('All fields must be filled');
    expect(result).to.eq(true);
    res = await chai.request(app).post('/login').send(noPassword);
    expect(result).to.eq(true);
  })
  it('Se a requisição vinher com email inválido, retona um erro', async () => {
    res = await chai.request(app).post('/login').send(errorMail1);
    result = res.text.includes('Incorrect email or password');
    expect(result).to.eq(true);
    res = await chai.request(app).post('/login').send(errorMail2);
    result = res.text.includes('Incorrect email or password');
    expect(result).to.eq(true);
    res = await chai.request(app).post('/login').send(errorMail3);
    result = res.text.includes('Incorrect email or password')
    expect(result).to.eq(true);
  })
  it('Se a senha tiver menos de 6 caracteres, retorna um erro', async () => {
    res = await chai.request(app).post('/login').send(errorPassword);
    result = res.text.includes('Incorrect email or password');
    expect(result).to.eq(true);
  })
});