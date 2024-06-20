import express from 'express'
import userRouter from "./routers/router"
export const port = 2029
export const app = express()

app.use(express.json())

app.use('/api',userRouter)

export default app;