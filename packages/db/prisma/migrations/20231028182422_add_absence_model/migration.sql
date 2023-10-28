-- CreateTable
CREATE TABLE "Absence" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "absenceDate" DATE NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);
