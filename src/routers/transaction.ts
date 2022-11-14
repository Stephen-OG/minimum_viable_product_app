import express,{Request, Response, Router } from "express";

const router:Router = express();

router.get("/transaction", (req:Request, res:Response):void => {
    res.send("Hello transaction")
  });

export default router