import express, { Request, Response, Router } from "express";
import * as UserService from "./users.service"
import { BaseUser, User } from "./user.interface";

export const userRouter:Router = express();

userRouter.post("/create", async (req:Request, res:Response) => {
  const user: BaseUser = req.body;
  try {
    const newUser = await UserService.create(user);

    res.status(200).send(newUser)
  } catch (e) {
    console.log(e)
    res.status(500).send('can not create user');
  }
    
  });

  userRouter.get("/", async (req:Request, res:Response) => {
    try {
      const users: User[] = await UserService.findAll();
  
      res.status(200).send(users);
    } catch (e) {
      res.status(500).send('cannot get users');
    }
  });
  
  userRouter.get("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const user: User = await UserService.findById(id);
  
      res.status(200).send(user);
    } catch (e) {
      console.log(e)
      res.status(500).send('cannot get user');
    }
  });

  userRouter.put("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    const user: BaseUser = req.body;
    try {
      await UserService.update(id,user);
      const updatedUser = await UserService.findById(id)

      res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e)
      res.status(500).send('cannot update user');
    }
  });

  userRouter.delete("/remove", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const deleteUser = await UserService.remove(id);
      res.status(200).send(deleteUser)

    } catch (error) {
      res.status(500).send('cannot delete user');
    }
  });