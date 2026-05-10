import { type Request, type Response } from 'express';
import { prisma } from '../../../lib/prisma.ts'
import bcrypt from 'bcrypt'
import "dotenv/config";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
const JWT_SECRET = process.env.JWT_SECRET

export async function adminSignin(req: Request, res: Response) {

  
    const inputData=req.body;

 

    const user = await prisma.admin.findUnique({
        where: {
            email: inputData.email
        }
    })
    if (!user) {
        res.status(404).json({
            message: "user not present"
        })
        return
    }
    const verifiedPassword = await bcrypt.compare(inputData.password as string, user.password);
    if (!verifiedPassword) {
        res.status(404).json({
            message: "incorrect password"
        })
        return
    }

  
    try {

        const token = jwt.sign({
            id: user.id
        }, JWT_SECRET as string)


        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })

        res.status(200).json({
            message: "user loggedin successfully",
            jwt: token
        })

    } catch (e) {
        res.status(404).json({
            message: "something went wrong"
        })
        return
    }
}