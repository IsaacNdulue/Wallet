import { RequestHandler } from "express"
import User from "../models/user"
import Account from "../models/account"
import Deposit from "../models/deposit"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from "sequelize";

dotenv.config();

export const register: RequestHandler = async (req, res) => {
    try {
      const { firstName, lastName, username, email, phoneNumber, password } = req.body;
        //comments are  to understand 
      // Check if a user with the same email already exists
      const existingEmailUser = await User.findOne({ where: { email } });
      if (existingEmailUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Check if a user with the same username already exists
      const existingUsernameUser = await User.findOne({ where: { username } });
      if (existingUsernameUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        password: hashedPassword
      });
  
      // Send success response
      res.status(201).json({
        message: 'User registered successfully',
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
    }
  };



  export const createDeposit: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const { amount } = req.body;
  
      // Validate input data
      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Please provide a valid amount' });
      }
  
      // Find the user to deposit to
      const userToDeposit = await User.findByPk(id);
      if (!userToDeposit) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the user's account
      const userAccount = await Account.findOne({ where: { user_id: id } });
      if (!userAccount) {
        return res.status(404).json({ error: 'User account not found' });
      }
  
      // Create a deposit record
      const deposit = await Deposit.create({ user_id: id, amount });
  
      // Update the user's account balance
      userAccount.balance += amount;
      await userAccount.save();
  
      res.status(200).json({
        message: `${amount} has been deposited to ${userToDeposit.username}. The updated balance is ${userAccount.balance}.`,
        data: deposit,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

export const login: RequestHandler = async (req, res) => {
    try {
        const { emailOrPhoneNumber, password } = req.body;

        // Find the user by email or phone number
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrPhoneNumber },
                    { phoneNumber: emailOrPhoneNumber }
                ]
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email/phone number or password' });
        }

        // I'm comparing the passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email/phone number or password' });
        }

     
        const token = jwt.sign(
            { id: user.id,
             username: user.username, 
             email: user.email
             },
            process.env.jwtSecret,
            { expiresIn: '1d' }
        );

        // Send success response
        res.status(200).json({
            message: 'Login successful',
            token,
            data: user
            // {
            //     id: user.id,
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     username: user.username,
            //     email: user.email,
            //     phoneNumber: user.phoneNumber
            // }
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};

export const getAll: RequestHandler = async (req, res) => {
    try {
        const users = await User.findAll(); 
        if (users.length === 0) {
            return res.status(404).json({
                message: 'No users in database'
            });
        }

        return res.status(200).json({
            message: `There are ${users.length} users`,
            users: users 
        });

    } catch (error) {
        // Handle any errors that occur during the database query or processing
        console.error('Error retrieving users:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}


export const getOne: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        // Find the user by ID
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User found',
            user: user
        });

    } catch (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};


export const findUser: RequestHandler = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({
                message: 'Please input a phone number'
            });
        }

        // Find the user by phoneNumber
        const user = await User.findOne({ where: { phoneNumber } });

        if (!user) {
            return res.status(404).json({
                message: `no user with ${phoneNumber} found`
            });
        }

        return res.status(200).json({
            message: 'User found',
            user: user
        });

    } catch (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export const logout: RequestHandler = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(400).json({ error: 'Authorization token not found' });
        }

        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            return res.status(400).json({ error: 'Authorization token not found' });
        }

        // Verify and decode the token to get user ID
        const decodedToken: any = jwt.verify(token, process.env.jwtSecret);

        if (!decodedToken) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        // Find user by decoded user ID
        const user = await userModel.findById(decodedToken.userId);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Invalidate token by setting it to null
        user.token = null;
        await user.save();

        // Send success response
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};