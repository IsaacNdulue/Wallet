import { RequestHandler } from "express"
import User from "../models/user"

export const register:RequestHandler = async (req,res) =>{
   try {
        const{firstName, lastName, username, email, phoneNumber, password}= req.body

        const user = await User.findOne({where:{email}})
   } catch (error) {
    
   }
}