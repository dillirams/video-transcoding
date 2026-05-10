import type {Request, Response } from "express";
import { prisma } from "../../../lib/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import { s3 } from "../../config/s3";



interface CourseInput{
    name:string,
    fileType:string
    description:string
    price:string

}

export async function createCourse(req:Request,res:Response) {
    
    const adminId=req.id


    if(!adminId){
        return
    }
    const input:CourseInput=req.body
     const fileName=`${uuid()}`

    try{

        console.log(input.fileType);

        const command=new PutObjectCommand({
            Bucket:"dilli-media-storage"!,
            Key:fileName,
            ContentType:input.fileType,
        })

        const uploadUrl= await getSignedUrl(s3, command, {
            expiresIn:300
        })

        console.log(uploadUrl);

        const fileUrl = `https://dilli-media-storage.s3.eu-north-1.amazonaws.com/${fileName}`;

        const price=parseFloat(input.price)

       const course= await prisma.course.create({
                data:{
                    name:input.name,
                    description:input.description,
                    price:price,
                    imageUrl:fileUrl,
                    createdAt:new Date(),
                    createdBy:adminId,
                  
                }
            })
        console.log(course);

               res.status(200).json({
                message:'course created successfully',
                uploadUrl:uploadUrl,
                fileUrl:fileUrl
            })
         
    }catch(e){
        res.status(404).json({
            message:"something went wrong please wait"
        })
        console.log(e);
    }
  
    
    
}