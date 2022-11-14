import express, { Request, Response, Router } from "express";
import * as transactionService from "./transactions.service"
import { Transaction, BaseTransaction } from "./transaction.interface";

export const transactionRouter:Router = express();

transactionRouter.post("/send", async (req:Request, res:Response) => {
  const transaction: BaseTransaction = req.body;
  try {
    
    const newUser = await transactionService.send(transaction);

    res.status(200).send(newUser)
  } catch (e) {
    console.log(e)
    res.status(500).send('can not create user');
  }
    
  });

  transactionRouter.get("/", async (req:Request, res:Response) => {
    try {
      const transactions: Transaction[] = await transactionService.findAll();
  
      res.status(200).send(transactions);
    } catch (e) {
      res.status(500).send('cannot get users');
    }
  });
  
  transactionRouter.get("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const user: Transaction = await transactionService.findById(id);
  
      res.status(200).send(user);
    } catch (e) {
      console.log(e)
      res.status(500).send('cannot get user');
    }
  });

  transactionRouter.put("/update", async (req:Request, res:Response) => {
    const id: string = req.params.id
    const user: BaseTransaction = req.body;
    try {
      const updatedUser = await transactionService.update(id,user);

      res.status(200).send(updatedUser)
    } catch (error) {
      res.status(500).send('cannot update user');
    }
  });

  transactionRouter.delete("/remove", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const deleteUser = await transactionService.remove(id);
      res.status(200).send(deleteUser)

    } catch (error) {
      res.status(500).send('cannot delete user');
    }
  });