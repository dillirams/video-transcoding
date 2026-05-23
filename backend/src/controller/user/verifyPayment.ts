import type { Request, Response } from "express";
import crypto from 'crypto'
import { prisma } from "../../../lib/prisma";


export async function  verifyPayment(req:Request, res:Response) {
    const userId=req.id

    try{

        const{
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId
        }=req.body

     const sign =
      razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSign=crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET as string
      )
      .update(sign.toString())
      .digest("hex")

      const isAuthentic=expectedSign==razorpay_signature;

      if(!isAuthentic){
        return res.status(400).json({
            success:false,
            message:"invalid signature"
        })
      }
      if(!userId){
        return
      }
      await prisma.courseBought.create({
        data:{
            userId,
            courseId
        }
      })

      return res.status(200).json({
      success: true,
      message: "Payment verified",
    });

    }catch(e){
    console.log(e);

    return res.status(500).json({
      message: "Verification failed",
    });
    }
}