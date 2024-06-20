import express from "express"
import {login, register,getAll,getOne,findUser} from "../controller/user"

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/getAll', getAll)
userRouter.get('/getOne/:id', getOne)
userRouter.get('/findUser', findUser)
export default userRouter
