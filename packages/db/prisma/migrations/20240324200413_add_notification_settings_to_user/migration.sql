-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationOnAnnoucements" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationOnPostComments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationOnPostLikes" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationOnScheduleUpdates" BOOLEAN NOT NULL DEFAULT false;
