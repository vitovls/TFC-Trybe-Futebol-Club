import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// Solução proposta pelo Coruja. Obrigado, Coruja!!!
import chaiHttp = require('chai-http');

import { Response } from 'superagent';

import { leaderboardGeneralMock } from './mocks/leadeboards'

import { app } from '../app';

import Clubs from '../database/models/Clubs';
import { allMatchsMock } from './mocks/matchs';
import Matchs from '../database/models/Matchs';
import { findAllClubsMock, findOneClubMock } from './mocks/clubs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "/leaderboard"', () => {
  let res: Response;
  let resolve: string;
  before(async () => {
    sinon
      .stub(Clubs, 'findAll')
      .resolves(findAllClubsMock as Clubs[]);

    sinon
      .stub(Clubs, 'findOne')
      .resolves(findOneClubMock as Clubs);

    sinon
      .stub(Matchs, 'findAll')
      .resolves(allMatchsMock as Matchs[]);
  });

  after(()=>{
    (Clubs.findAll as sinon.SinonStub).restore();
    (Clubs.findOne as sinon.SinonStub).restore();
    (Matchs.findAll as sinon.SinonStub).restore();
  })
  describe('Classificação geral', () => {
    it('Retorna o status 200"', async () => {
      res = await chai.request(app).get('/leaderboard')

      expect(res).to.be.status(200)
    });
  })
  describe('Classificação em casa', () => {
    it('Retorna o status 200"', async () => {
      res = await chai.request(app).get('/leaderboard/home')

      expect(res).to.be.status(200)
    });
  })
  describe('Classificação em fora de casa', () => {
    it('Retorna o status 200"', async () => {
      res = await chai.request(app).get('/leaderboard/away')

      expect(res).to.be.status(200)
    });
  })
});