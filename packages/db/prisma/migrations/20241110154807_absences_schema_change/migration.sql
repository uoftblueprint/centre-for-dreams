/*
  Warnings:

  - Added the required column `activityId` to the `Absence` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Absence_absenceDate_participantId_key";

-- AlterTable
ALTER TABLE "Absence" ADD COLUMN     "activityId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Absence_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
