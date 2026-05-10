import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export async function getUserCourse(req: Request, res: Response) {
  const userId = req.id; // assuming middleware adds authenticated user id

  try {
    
    const purchasedCourses = await prisma.courseBought.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: {
          include: {
            admin: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            lectures: {
              orderBy: {
                position: "asc",
              },
            },
          },
        },
      },
      orderBy: {
        purchasedAt: "desc",
      },
    });

    // Extract only course data if you don't want purchase table wrapper
    const courses = purchasedCourses.map((purchase) => ({
      purchaseId: purchase.id,
      purchasedAt: purchase.purchasedAt,
      ...purchase.course,
    }));

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (e) {
    console.error("Error fetching user courses:", e);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch purchased courses",
    });
  }
}