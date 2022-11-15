import express, {Request,Response} from 'express';
import app from './app'
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

app.get("/", (req:Request, res:Response):void => {
    res.send("Hello Typescript with Node.js!")
});

app.listen(PORT, ():void => {
console.log(`Server Running here 👉 https://localhost:${PORT}`);
});


