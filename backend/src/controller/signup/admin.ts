import { type Request, type Response } from 'express';
import { prisma } from '../../../lib/prisma.ts'
import bcrypt from 'bcrypt'


export async function adminSignup(req: Request, res: Response,) {
    const inputData = req.body;
    console.log(inputData.password);
    try {

        const userExist=await prisma.admin.findUnique({
            where:{
                email:inputData.email
            }
        })
        if(userExist){
            res.status(200).json({
                message:"user already exist"
            })
            return;
        }
        const hashedPassword = await bcrypt.hash(inputData.password, 5)
        const user = await prisma.admin.create({
            data: {
                name: inputData.name,
                email:inputData.email,
                password: hashedPassword,
                createdAt: new Date
            }
        })

    
        if (user) {
            res.status(201).json({
                message: "admin created successfully",
                user:user
            })
        }


    } catch (e) {
        res.status(404).json({
            message: "something went wrong",
        })
        console.log(e)
        return
    }
}