/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Lecture` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('PENDING', 'UPLOADED', 'PROCESSING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "videoUrl",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "masterPlayListUrl" TEXT,
ADD COLUMN     "orginalVideoUrl" TEXT,
ADD COLUMN     "status" "VideoStatus" NOT NULL DEFAULT 'PENDING';
