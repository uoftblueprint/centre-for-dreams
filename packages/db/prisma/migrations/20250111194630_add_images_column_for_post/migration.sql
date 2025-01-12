/*
  Warnings:

  - Made the column `title` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "images" TEXT[],
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "contents" DROP NOT NULL;
