import { RequestHandler } from "express";
import User from "../models/user"
import Account from "../models/account"

import sequelize from "../config/configuration"; 

export const checkBalance: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
  
      const userToCheck = await User.findByPk(id);
      if (!userToCheck) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // i'm getting the user's account 
      const userAccount = await Account.findOne({ where: { user_id: id } });
      if (!userAccount) {
        return res.status(404).json({ error: 'User account not found' });
      }
  
      // Respond with the account balance
      res.status(200).json({
        message: `The current balance for ${userToCheck.username} is ${userAccount.balance}.`,
        balance: userAccount.balance
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };


