import { IStastic } from '../../helpers/interfaces';
import { getAllClubsWithId, getClubsByName, getClubsWithId } from '../clubs';
import { getMatchsByHomeTeam } from '../matchs';

const err = 'error';

export const getMatchsTeam = async (teamName: string) => {
  const team = await getClubsByName(teamName);
  if (team !== null) {
    const { id } = team;
    return getMatchsByHomeTeam(id);
  }
  return err;
};

const totalFavorGoals = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    return match.map((e) => e.homeTeamGoals).reduce((soma, i) => soma + i);
  } return err;
};

const totalOwnGoals = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    return match.map((e) => e.awayTeamGoals).reduce((soma, i) => soma + i);
  } return err;
};

const balanceGoals = async (teamName:string) => {
  const favor = await totalFavorGoals(teamName);
  const own = await totalOwnGoals(teamName);
  if (favor !== err && own !== err) {
    return favor - own;
  } return err;
};

const countVictories = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    return match.filter((e) => e.homeTeamGoals > e.awayTeamGoals).length;
  } return err;
};

const countDefeats = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    return match.filter((e) => e.awayTeamGoals > e.homeTeamGoals).length;
  } return err;
};

const countDraws = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    return match.filter((e) => e.awayTeamGoals === e.homeTeamGoals).length;
  } return err;
};

const countsMatchs = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    return match.length;
  } return err;
};

const countsPoints = async (teamName:string) => {
  const victories = await countVictories(teamName);
  const drawns = await countDraws(teamName);
  if (victories !== err && drawns !== err) {
    return (victories * 3) + drawns;
  } return err;
};

const countEfficiency = async (teamName:string) => {
  const points = await countsPoints(teamName);
  const totalGames = await countsMatchs(teamName);
  if (points !== err && totalGames !== err) {
    const efficiency = Number(((points / (totalGames * 3)) * 100).toFixed(2));
    return efficiency;
  } return err;
};

export const stasticClub = async (teamName:string) => {
  const team = await getClubsWithId(teamName);
  if (team !== null) {
    return {
      name: team.clubName,
      totalPoints: await countsPoints(teamName),
      totalGames: await countsMatchs(teamName),
      totalVictories: await countVictories(teamName),
      totalDraws: await countDraws(teamName),
      totalLosses: await countDefeats(teamName),
      goalsFavor: await totalFavorGoals(teamName),
      goalsOwn: await totalOwnGoals(teamName),
      goalsBalance: await balanceGoals(teamName),
      efficiency: await countEfficiency(teamName),
    };
  } return err;
};

export const allStatistic = async () => {
  const listClubs = await getAllClubsWithId();

  return Promise.all(listClubs.map((e) => stasticClub(e)));
};

function compare(a:number, b:number) {
  if (a !== b) {
    if (a > b) return -1;
    if (a < b) return 1;
  } return 0;
}

export const compareStatisticHome = async () => {
  const list = await allStatistic() as IStastic[];

  return list
    .sort((a, b) => compare(a.goalsOwn, b.goalsOwn))
    .sort((a, b) => compare(a.goalsFavor, b.goalsFavor))
    .sort((a, b) => compare(a.goalsBalance, b.goalsBalance))
    .sort((a, b) => compare(a.totalVictories, b.totalVictories))
    .sort((a, b) => compare(a.totalPoints, b.totalPoints));
};
