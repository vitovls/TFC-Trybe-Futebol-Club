export interface User {
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IUser extends User {
  id: number,
}

export interface IMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean
}

export interface IStastic {
  name: string,
  points: number,
  totalGames: number,
  totalVictories: number,
  totalDrawn: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}
