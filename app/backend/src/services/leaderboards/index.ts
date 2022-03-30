import { getAllClubsWithId, getClubsByName, getClubsWithId } from '../clubs';
import { getMatchsByAwayTeam, getMatchsByHomeTeam } from '../matchs';

const err = 'error';

export const getMatchsTeam = async (teamName: string) => {
  const team = await getClubsByName(teamName);
  if (team !== null) {
    const { id } = team;
    const home = await getMatchsByHomeTeam(id);
    const away = await getMatchsByAwayTeam(id);
    const allMatchs = await home.concat(away);
    return {
      home,
      away,
      allMatchs,
    };
  }
  return err;
};

const totalFavorGoals = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    const home = await match.home.map((e) => e.homeTeamGoals).reduce((soma, i) => soma + i);
    const away = await match.away.map((e) => e.awayTeamGoals).reduce((soma, i) => soma + i);
    return home + away;
  } return err;
};

const totalOwnGoals = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    const home = await match.home.map((e) => e.awayTeamGoals).reduce((soma, i) => soma + i);
    const away = await match.away.map((e) => e.homeTeamGoals).reduce((soma, i) => soma + i);
    return home + away;
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
    const victorieHome = await match.home.filter((e) => e.homeTeamGoals > e.awayTeamGoals).length;
    const victorieAway = await match.home.filter((e) => e.awayTeamGoals > e.homeTeamGoals).length;
    const victories = victorieHome + victorieAway;
    return victories;
  } return err;
};

const countDefeats = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    const losesHome = await match.home.filter((e) => e.awayTeamGoals > e.homeTeamGoals).length;
    const losesAway = await match.home.filter((e) => e.homeTeamGoals > e.awayTeamGoals).length;
    const loses = losesHome + losesAway;
    return loses;
  } return err;
};

const countDraws = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    const losesHome = await match.home.filter((e) => e.awayTeamGoals === e.homeTeamGoals).length;
    const losesAway = await match.home.filter((e) => e.homeTeamGoals === e.awayTeamGoals).length;
    const loses = losesHome + losesAway;
    return loses;
  } return err;
};

const countsMatchs = async (teamName:string) => {
  const match = await getMatchsTeam(teamName);
  if (match !== err) {
    return match.allMatchs.length;
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
      points: await countsPoints(teamName),
      totalGames: await countsMatchs(teamName),
      totalVictories: await countVictories(teamName),
      totalDrawn: await countDraws(teamName),
      totalLosses: await countDefeats(teamName),
      goalsFavor: await totalFavorGoals(teamName),
      goalsOwn: await totalOwnGoals(teamName),
      goalsBalance: await balanceGoals(teamName),
      efficiency: await countEfficiency(teamName),
    };
  }
};

export const allStatistic = async () => {
  const listClubs = await getAllClubsWithId();

  return Promise.all(listClubs.map((e) => stasticClub(e)));
};

// FUNÇÃO PARA RANKEAR OS TIMES

// export const compareStatistic = async () => {
//   const list = await allStatistic();

//   const validate = list.some((e) => e === undefined);
//   if (!validate) {
//     list.sort((a, b) => {
//       if (a?.points > b?.points) return 1;
//       if (b?.points > a?.points) return -1;
//       return 0;
//     });
//   }
// };
