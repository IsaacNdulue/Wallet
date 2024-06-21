import { DataTypes, Model } from "sequelize";
import sequelize from "../config/configuration";
import User from "./user";


class Account extends Model {
    public id!: number;
    public user_id!: number;
    public account_number!: string;
    public balance!: number;
    public type!: 'savings' | 'current' | 'fixed_deposit';
    public status!: 'active' | 'inactive';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
  }
  
  Account.init(
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
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      account_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      balance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      accounttype: {
        type: DataTypes.ENUM('savings', 'current', 'fixed_deposit'),
        allowNull: false,
        defaultValue: 'savings'
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'accounts',
      sequelize,
    }
  );
  
  export default Account;
