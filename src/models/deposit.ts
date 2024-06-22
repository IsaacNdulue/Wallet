import { RequestHandler } from "express"
import User from "../models/user"
import Account from "../models/account"
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/configuration';

class Deposit extends Model {
  public id!: number;
  public user_id!: number;
  public account_id!: number;
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
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE',
      field: 'user_id',
    },
    account_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'accounts', // Make sure this matches your Account table name in the database
        key: 'id',
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE',
      field: 'account_id', // Mapping to the database column name
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


Deposit.belongsTo(Account, { foreignKey: 'account_id' });
export default Deposit;
