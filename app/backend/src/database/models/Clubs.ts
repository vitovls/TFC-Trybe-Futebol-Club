import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import Matchs from './Matchs';

class Clubs extends Model {
  public id!: number;

  public clubName: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'clubs',
  underscored: true,
  timestamps: false,
});

Clubs.hasMany(Matchs, { foreignKey: 'homeTeam', as: 'homeClub' });
Clubs.hasMany(Matchs, { foreignKey: 'awayTeam', as: 'awayClub' });

Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeMatchs' });
Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayMatchs' });

export default Clubs;
