import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export async function  buyCourse(req:Request, res:Response) {
    const userId=req.id as string;
    const courseId=req.query.courseId as string;

    try{

        const course=await prisma.course.findFirst({
            where:{
                id:courseId
            }
        })

        if(!course){
            res.status(400).json({
                message:"course not present"
            })
            return
        }
         if(!courseId){
            return
         }
        const courseBought=await prisma.courseBought.create({
            data:{
                courseId:courseId,
                userId:userId
            }
        })

        res.status(200).json({
            message:"course created successfully"
        })

    }catch(e){
        res.status(404).json({
            message:"something went wrong"
        })
        console.log(e);
        return

    }

}