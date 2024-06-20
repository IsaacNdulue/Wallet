import { DataTypes, Model } from 'sequelize';
import  sequelize from '../config/configuration';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    sequelize, // passing the sequelize instance is required
  }
);

export default User;