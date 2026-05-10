/*
  Warnings:

  - You are about to drop the column `courseId` on the `User` table. All the data in the column will be lost.
  - Added the required column `url` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "createdBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "CourseBought" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "boughtBy" TEXT NOT NULL,

    CONSTRAINT "CourseBought_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseBought" ADD CONSTRAINT "CourseBought_boughtBy_fkey" FOREIGN KEY ("boughtBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseBought" ADD CONSTRAINT "CourseBought_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
