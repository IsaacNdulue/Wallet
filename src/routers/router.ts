import express from "express"
import {login, register,getAll,getOne,findUser, makeDeposit,history,deleteDeposit,deleteAllDeposits} from "../controller/user"

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/getAll', getAll)
userRouter.get('/getOne/:id', getOne)
userRouter.get('/findUser', findUser)
userRouter.put('/makeDeposit/:id', makeDeposit)
userRouter.delete('/deleteDeposit/:id', deleteDeposit)
userRouter.put('/deleteAllDeposits', deleteAllDeposits)
userRouter.get('/history/:id', history)
export default userRouter
