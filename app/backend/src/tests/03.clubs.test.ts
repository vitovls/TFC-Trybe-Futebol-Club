import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// Solução proposta pelo Coruja. Obrigado, Coruja!!!
import chaiHttp = require('chai-http');

import { app } from '../app';
import Clubs from '../database/models/Clubs';

import { Response } from 'superagent';

import { findAllClubsMock } from './mocks/clubs';

import StatusCodes from '../helpers/StatusCode';

chai.use(chaiHttp);

const { expect } = chai;

let res: Response;
let resolve: string;
describe('Teste da rota "/clubs"', () => {
  before(async () => {
    sinon
      .stub(Clubs, 'findAll')
      .resolves(findAllClubsMock as Clubs[]);
  });

  after(()=>{
    (Clubs.findAll as sinon.SinonStub).restore();
  })

  describe('METHOD GET', () => {
    it('GET na rota, retorna um status 200, com a lista de clubs', async () => {
      res = await chai.request(app).get('/clubs');
      resolve = JSON.stringify(findAllClubsMock);
      expect(res.text).to.be.eq(resolve);
      expect(res).to.have.a.status(StatusCodes.OK);
    });
  })
});

describe('Teste da rota "/clubs/:id"', () => {
  let idClubs:number;
  before(async () => {
    sinon
      .stub(Clubs, 'findOne')
      .resolves(findAllClubsMock[0] as Clubs);
  });

  after(()=>{
    (Clubs.findOne as sinon.SinonStub).restore();
  })

  describe('METHOD GET', () => {
    it('GET na rota, retorna um status 200, com um club', async () => {
      idClubs = 1;
      res = await chai.request(app).get(`/clubs/${idClubs}`);
      resolve = JSON.stringify(findAllClubsMock[0]);
      expect(res).to.have.a.status(StatusCodes.OK);
      expect(res.text).to.be.eq(resolve);
    });
  //   it('GET na rota, retorna um status 200, com um club', async () => {
  //     idClubs = 50;
  //     res = await chai.request(app).get(`/clubs/${idClubs}`);
  //     resolve = JSON.stringify('Club Not Found');
  //     expect(res).to.have.a.status(StatusCodes.OK);
  //     expect(res.text).to.be.eq(resolve);
  //   });
  })
});
