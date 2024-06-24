import { RequestHandler } from "express";
import User from "../models/user"
import Account from "../models/account"
import Transfer from "../models/transfer"

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



  export const transfer: RequestHandler = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const senderId = req.params.senderId;
      const { receiverAccountNumber, amount } = req.body;
  
      // Validate input data
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ error: 'Please provide a valid amount' });
      }
  
      // Find sender
      const sender = await User.findByPk(senderId);
      if (!sender) {
        return res.status(404).json({ error: 'Sender not found' });
      }
  
      // Find sender's account
      const senderAccount = await Account.findOne({ where: { user_id: senderId } });
      if (!senderAccount) {
        return res.status(404).json({ error: 'Sender account not found' });
      }
  
      // Find receiver's account
      const receiverAccount = await Account.findOne({ where: { account_number: receiverAccountNumber } });
      if (!receiverAccount) {
        return res.status(404).json({ error: 'Receiver account not found' });
      }
  
      // Check if sender has enough balance
      if (parseFloat(senderAccount.balance.toString()) < parsedAmount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
  
      // Create a transfer record
      const transfer = await Transfer.create({
        sender_id: senderId,
        receiver_account_number: receiverAccountNumber,
        amount: parsedAmount
      }, { transaction });
  
      // Update sender's and receiver's account balances
      senderAccount.balance = parseFloat(senderAccount.balance.toString()) - parsedAmount;
      receiverAccount.balance = parseFloat(receiverAccount.balance.toString()) + parsedAmount;
  
      await senderAccount.save({ transaction });
      await receiverAccount.save({ transaction });
  
      await transaction.commit();
  
      res.status(200).json({
        message: `Transferred ${parsedAmount} from ${sender.username} to account number ${receiverAccountNumber}.`,
        data: transfer
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        error: error.message,
      });
    }
  };