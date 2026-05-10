/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Admin_password_key";

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
