import { RequestHandler } from "express"
import User from "../models/user"
import Account from "../models/account"
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/configuration';

class Deposit extends Model {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Deposit.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
  },
  {
    tableName: 'deposits',
    sequelize,
  }
);


Deposit.belongsTo(Account, { foreignKey: 'accountId' });
export default Deposit;
