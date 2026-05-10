import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export async function getAllCourses(req: Request, res: Response) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        admin: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (e) {
    console.error("Error fetching all courses:", e);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
}
