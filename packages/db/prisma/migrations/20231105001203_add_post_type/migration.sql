/*
  Warnings:

  - Added the required column `postType` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('Announcement', 'Discussion');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postType" "PostType" NOT NULL;
