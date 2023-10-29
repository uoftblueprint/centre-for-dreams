/*
  Warnings:

  - You are about to drop the column `endTime` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `durationMinutes` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "endTime",
ADD COLUMN     "durationMinutes" INTEGER NOT NULL;
