-- CreateTable
CREATE TABLE "Subevent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Subevent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subevent" ADD CONSTRAINT "Subevent_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
