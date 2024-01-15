-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "UserReport" (
    "id" TEXT NOT NULL,
    "location" TEXT,
    "foodPrizeFrom" INTEGER,
    "foodPrizeTo" INTEGER,
    "transportationPrizeFrom" INTEGER,
    "transportationPrizeTo" INTEGER,
    "costPrizeFrom" INTEGER,
    "costPrizeTo" INTEGER,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserReport" ADD CONSTRAINT "UserReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
