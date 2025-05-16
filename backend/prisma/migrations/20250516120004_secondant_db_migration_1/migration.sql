/*
  Warnings:

  - You are about to drop the column `blackAdvantage` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `blackBlunderMove` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `blackControl` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `blackInAccuracyMove` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `turn` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `whiteAdvantage` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `whiteBlunderMove` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `whiteControl` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `whiteInAccuracyMove` on the `Position` table. All the data in the column will be lost.
  - Added the required column `gameDate` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blackMaterialAdvantage` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameIds` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moveTurn` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whiteMaterialAdvantage` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Puzzle" DROP CONSTRAINT "Puzzle_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gameDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "blackAdvantage",
DROP COLUMN "blackBlunderMove",
DROP COLUMN "blackControl",
DROP COLUMN "blackInAccuracyMove",
DROP COLUMN "gameId",
DROP COLUMN "turn",
DROP COLUMN "whiteAdvantage",
DROP COLUMN "whiteBlunderMove",
DROP COLUMN "whiteControl",
DROP COLUMN "whiteInAccuracyMove",
ADD COLUMN     "blackMaterialAdvantage" JSONB NOT NULL,
ADD COLUMN     "gameIds" JSONB NOT NULL,
ADD COLUMN     "moveTurn" TEXT NOT NULL,
ADD COLUMN     "whiteMaterialAdvantage" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "gameId",
ADD COLUMN     "gameId" JSONB NOT NULL;
