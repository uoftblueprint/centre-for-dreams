-- CreateTable
CREATE TABLE "Subactivity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIME NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "location" TEXT,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Subactivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subactivity" ADD CONSTRAINT "Subactivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
