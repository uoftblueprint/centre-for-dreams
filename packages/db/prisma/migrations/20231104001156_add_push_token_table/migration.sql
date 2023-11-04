-- CreateTable
CREATE TABLE "PushToken" (
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "PushToken_token_userId_key" ON "PushToken"("token", "userId");

-- AddForeignKey
ALTER TABLE "PushToken" ADD CONSTRAINT "PushToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
