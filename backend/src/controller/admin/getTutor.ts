import type { Request,Response } from "express";
import { prisma } from "../../../lib/prisma";

export async function getTutor(req:Request, res:Response) {
    const tutorId=req.id;

    try{

        const tutor = await prisma.admin.findUnique({
            where: {
                id: tutorId,
            },
        });

        console.log(tutor);

        res.status(200).json({
        
            tutor:tutor
        })

    }catch(e){
        res.status(400).json({
            message:"something went wrong"
        })
        console.log(e);
    }
}