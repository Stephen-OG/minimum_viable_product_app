import express, { Request, Response, Router } from "express";
import * as transactionService from "./transactions.service"
import { Transaction, BaseTransaction } from "./transaction.interface";

export const transactionRouter:Router = express();

transactionRouter.post("/fund", async (req:Request, res:Response) => {
  const transaction: BaseTransaction = req.body;
  try {
    
    const newTransaction = await transactionService.fund(transaction);

    res.status(200).send(newTransaction)
  } catch (e) {
    console.log(e)
    res.status(500).send('uanble to fund wallet');
  }
    
  });

  transactionRouter.post("/send", async (req:Request, res:Response) => {
    const transaction: BaseTransaction = req.body;
    try {
      
      const newTransaction = await transactionService.send(transaction);
  
      res.status(200).send(newTransaction)
    } catch (e) {
      console.log(e)
      res.status(500).send('uanble to send from wallet');
    }
      
    });

transactionRouter.post("/withdraw", async (req:Request, res:Response) => {
    const transaction: BaseTransaction = req.body;
    try {
        
        const newTransaction = await transactionService.withdraw(transaction);
    
        res.status(200).send(newTransaction)
    } catch (e) {
        console.log(e)
        res.status(500).send('unable to withdraw from wallet');
    }
        
    });

  transactionRouter.get("/", async (req:Request, res:Response) => {
    try {
      const transactions: Transaction[] = await transactionService.findAll();
  
      res.status(200).send(transactions);
    } catch (e) {
      res.status(500).send('cannot get transactions');
    }
  });
  
  transactionRouter.get("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const transaction: Transaction = await transactionService.findById(id);
  
      res.status(200).send(transaction);
    } catch (e) {
      console.log(e)
      res.status(500).send('cannot get transaction');
    }
  });

  transactionRouter.get("/getbyuserid/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const transactions: Transaction[] = await transactionService.findByUserId(id);
  
      res.status(200).send(transactions);
    } catch (e) {
      console.log(e)
      res.status(500).send('cannot get user transactions');
    }
  });