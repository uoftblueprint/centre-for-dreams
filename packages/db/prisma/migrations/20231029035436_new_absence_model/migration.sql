/*
  Warnings:

  - The primary key for the `Absence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[absenceDate,userId]` on the table `Absence` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Absence_absenceDate_userId_key" ON "Absence"("absenceDate", "userId");
