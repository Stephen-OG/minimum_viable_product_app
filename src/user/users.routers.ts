import express, { Request, Response, Router } from "express";
import * as UserService from "./users.service"
import { BaseUser, User } from "./user.interface";
import { auth } from "../middleware/auth";

export const userRouter:Router = express();

userRouter.post("/", async (req:Request, res:Response) => {
  const user: BaseUser = req.body;
  try {
    const newUser = await UserService.create(user);

    res.status(200).send(newUser)
  } catch (e) {
    res.status(500).send('unable to create user');
  }
    
  });

  userRouter.post("/signin", async (req:Request, res:Response) => {
    const {email,password} = req.body;
    try {
      const foundUser = await UserService.signIn(email,password);
  
      res.status(200).send(foundUser)
    } catch (e) {
      console.log(e)
      res.status(500).send('unable to signin');
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
  
  userRouter.get("/:id", auth, async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const user: User = await UserService.findById(id);
  
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send('cannot get user');
    }
  });

  userRouter.put("/:id", auth, async (req:Request, res:Response) => {
    const id: string = req.params.id
    const user: BaseUser = req.body;
    try {
      await UserService.update(id,user);
      const updatedUser = await UserService.findById(id)

      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).send('cannot update user');
    }
  });

  userRouter.delete("/:id", auth, async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const deleteUser = await UserService.remove(id);
      res.status(200).send(deleteUser)

    } catch (error) {
      res.status(500).send('cannot delete user');
    }
  });