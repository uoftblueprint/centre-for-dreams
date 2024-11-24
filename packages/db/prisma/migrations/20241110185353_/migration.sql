/*
  Warnings:

  - A unique constraint covering the columns `[absenceDate,participantId,activityId]` on the table `Absence` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Absence_absenceDate_participantId_activityId_key" ON "Absence"("absenceDate", "participantId", "activityId");
