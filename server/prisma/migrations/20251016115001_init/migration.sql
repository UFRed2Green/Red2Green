/*
  Warnings:

  - The primary key for the `Trade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `trade_date` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `trade_id` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Trade` table. All the data in the column will be lost.
  - The required column `tradeId` was added to the `Trade` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `tradeType` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TradeType" AS ENUM ('BUY', 'SELL');

-- DropForeignKey
ALTER TABLE "public"."Trade" DROP CONSTRAINT "Trade_user_id_fkey";

-- DropIndex
DROP INDEX "public"."Trade_user_id_idx";

-- AlterTable
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_pkey",
DROP COLUMN "trade_date",
DROP COLUMN "trade_id",
DROP COLUMN "user_id",
ADD COLUMN     "tradeDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tradeId" TEXT NOT NULL,
ADD COLUMN     "tradeType" "TradeType" NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Trade_pkey" PRIMARY KEY ("tradeId");

-- CreateIndex
CREATE INDEX "Trade_userId_idx" ON "Trade"("userId");

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
