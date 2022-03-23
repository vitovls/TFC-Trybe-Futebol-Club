import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { reqBody } from './reqBody'

const { validLogin, noEmail,
  noPassword, errorMail1,
  errorMail2, errorMail3,
  errorPassword } = reqBody

//IMPORTAR O SERVICE
import { Response } from 'superagent';
import Users from '../database/models/Users'
import StatusCodes from '../helpers/StatusCode';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificando os status de retorno da rota "/login"', () => {
  let res: Response
  before(async () => {
    //COLOCAR OS STUBS AQUI
  })

  after(async () => {
    //RESTAURAR AS FUNC COM STUBS
  })

  it('Se o login for bem sucedido, retorna uma status 200', async () => {
    res = await chai.request(app).post('/login').send(validLogin)
    expect(res).to.have.status(StatusCodes.OK)
  });
  it('Se o campo "email" não estiver presente na corpo da requisição, retonar um status 400', async () => {
    res = await chai.request(app).post('/login').send(noEmail)
    expect(res).to.have.status(StatusCodes.BAD_REQUEST)
  })
  it('Se o campo "email" não for um email valido, retorna um status 400', async () => {
    res = await chai.request(app).post('/login').send(errorMail1)
    expect(res).to.have.status(StatusCodes.BAD_REQUEST)
    res = await chai.request(app).post('/login').send(errorMail2)
    expect(res).to.have.status(StatusCodes.BAD_REQUEST)
    res = await chai.request(app).post('/login').send(errorMail3)
    expect(res).to.have.status(StatusCodes.BAD_REQUEST)
  })
  it('Se o campo "email" não estiver presente na corpo da requisição, retonar um status 400', async () => {
    res = await chai.request(app).post('/login').send(noPassword)
    expect(res).to.have.status(StatusCodes.BAD_REQUEST)
  })
  it('Se o campo "password" tiver menos de 6 caracteres, retorna um status 400',async () => {
    res = await chai.request(app).post('/login').send(errorPassword)
    expect(res).to.have.status(StatusCodes.BAD_REQUEST)
  })
});
