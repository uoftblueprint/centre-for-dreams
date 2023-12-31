/*
  Warnings:

  - You are about to drop the column `userId` on the `Absence` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[absenceDate,participantId]` on the table `Absence` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[participantId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `participantId` to the `Absence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_userId_fkey";

-- DropIndex
DROP INDEX "Absence_absenceDate_userId_key";

-- AlterTable
ALTER TABLE "Absence" DROP COLUMN "userId",
ADD COLUMN     "participantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "participantId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Absence_absenceDate_participantId_key" ON "Absence"("absenceDate", "participantId");

-- CreateIndex
CREATE UNIQUE INDEX "User_participantId_key" ON "User"("participantId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
