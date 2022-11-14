import express,{Request, Response, Router } from "express";
import { db } from "../db/config";

const router:Router = express();

router.get("/user", (req:Request, res:Response):void => {
    res.send("Hello User")
  });
  console.log(db.name)

export default router