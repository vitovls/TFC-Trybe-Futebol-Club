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
