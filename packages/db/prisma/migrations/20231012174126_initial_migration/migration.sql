-- CreateTable
CREATE TABLE "Developers" (
    "name" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Developers_pkey" PRIMARY KEY ("name")
);
