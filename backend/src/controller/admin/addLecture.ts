import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import { s3 } from "../../config/s3";
import { videoQueue } from "../../queue/videoQueue";

interface LectureInput {
    courseId: string;
    title: string;
    fileType: string;
    position?: number;
}

export async function addLecture(req: Request, res: Response) {
    const adminId = req.id;

    if (!adminId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const input: LectureInput = req.body;
    const fileName = `lectures/${uuid()}`;

    try {
        // Verify the course belongs to the admin
        const course = await prisma.course.findFirst({
            where: {
                id: input.courseId,
                createdBy: adminId
            }
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME || "dilli-media-storage",
            Key: fileName,
            ContentType: input.fileType,
        });

        const uploadUrl = await getSignedUrl(s3, command, {
            expiresIn: 300 // 5 minutes
        });

        const bucketName = process.env.S3_BUCKET_NAME || "dilli-media-storage";
        const region = process.env.S3_REGION || "eu-north-1";
        const videoUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

        // Get the highest position if not provided
        let position = input.position;
        if (position === undefined) {
            const lastLecture = await prisma.lecture.findFirst({
                where: { courseId: input.courseId },
                orderBy: { position: 'desc' }
            });
            position = lastLecture ? lastLecture.position + 1 : 1;
        }

        const lecture = await prisma.lecture.create({
            data: {
                title: input.title,
                orginalVideoUrl: videoUrl,
                position: position,
                courseId: input.courseId,
                createdAt: new Date(),
            }
        });

        await videoQueue.add("transcode-video",{
            lectureId:lecture.id
        })

        res.status(200).json({
            message: 'Lecture created successfully',
            uploadUrl: uploadUrl,
            videoUrl: videoUrl,
            lecture: lecture
        });

    } catch (e) {
        console.error("Error creating lecture:", e);
        res.status(500).json({
            message: "Something went wrong please wait"
        });
    }
}
