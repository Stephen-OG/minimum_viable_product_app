import express, {Request,Response,Application} from 'express';
import cors from 'cors'
import { userRouter } from './user/users.routers';
import { transactionRouter } from './transactions/transactions.routers';

const app:Application = express();

app.use(cors())
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/transactions", transactionRouter)

export default app