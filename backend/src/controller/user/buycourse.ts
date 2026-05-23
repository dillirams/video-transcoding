import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";
import { razorpay } from "../../config/razorpay";

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

        const amount=parseFloat(req.body.amount)

        console.log("the amount is",amount);

        if(amount!=course.price){
            res.status(404).json({
                message:"invalid amount"
            })
            return
        }

        console.log("hello world");

        const option={
            amount:amount*100,
            currency:"INR",
            receipt: `receipt_${Date.now()}`
        }
        console.log("the option is ",option);

        const order=await razorpay.orders.create(option)

       
        res.status(200).json({
            success:true,
            message:"course created successfully",
            order:order,
            course:course
        })

    }catch(e){
        res.status(404).json({
            message:"something went wrong"
        })
        console.log(e);
        return

    }

}