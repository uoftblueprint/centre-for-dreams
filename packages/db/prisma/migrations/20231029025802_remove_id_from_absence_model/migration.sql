/*
  Warnings:

  - The primary key for the `Absence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Absence` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Absence_pkey" PRIMARY KEY ("userId");
