import { DataTypes, Model } from 'sequelize';
import  sequelize from '../config/configuration';
import Account from "../models/account"
import Deposit from "../models/deposit"
class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
    firstName: any;
    username: any;
    lastName: any;
    phoneNumber: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type:  DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type:  DataTypes.STRING(128),
      allowNull: false,
    },
    username: {
      type:  DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type:  DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type:  DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type:  DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize, 
  }
);

User.hasOne(Account, { foreignKey: 'user_id' });
User.hasMany(Deposit, { foreignKey: 'user_id' });
export default User;