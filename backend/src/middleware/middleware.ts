import type {Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET



export async function middleware(req:Request, res:Response, next:NextFunction) {
    const token= req.cookies.token;
    const decodedData=jwt.verify(token,JWT_SECRET as string);

    if(decodedData){
        //@ts-ignore
        req.id=decodedData.id
        console.log(req.id);
        next();
    }else{
        res.status(400).json({
            message:"something went wrong"
        })
    }
}