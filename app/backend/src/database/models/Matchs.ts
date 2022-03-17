import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class Matchs extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'matchs',
  underscored: true,
  timestamps: false,
});

export default Matchs;
