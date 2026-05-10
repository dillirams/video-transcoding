import type { Request,Response } from "express";
import { prisma } from "../../../lib/prisma";

export async function getCourse(req:Request, res:Response) {
    const tutorId=req.id;

    try{

        const course = await prisma.course.findMany({
            where: {
                createdBy: tutorId,
            },
            include: {
                lectures: {
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        });

        console.log(course);

        res.status(200).json({
            message:"courses are",
            course:course
        })

    }catch(e){
        res.status(400).json({
            message:"something went wrong"
        })
        console.log(e);
    }
}