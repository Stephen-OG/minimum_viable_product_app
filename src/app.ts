import express, {Request,Response,Application} from 'express';
import cors from 'cors'
import { db } from "./db/config";
// import userRouter from './routers/user'
import { userRouter } from './user/users.routers';
import { transactionRouter } from './transactions/transactions.routers';
// import userRouter from './routers/user'
// import transactionRouter from './routers/transaction'

console.log(db.name)

const app:Application = express();

app.use(cors())
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/transactions", transactionRouter)

// app.use(userRouter)
// app.use(transactionRouter)

export default app