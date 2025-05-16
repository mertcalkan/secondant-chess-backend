/*
  Warnings:

  - You are about to drop the column `gameIds` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `moveNum` on the `Position` table. All the data in the column will be lost.
  - Added the required column `ecoCode` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opening` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variation` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromGame` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameReferences` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromEcoCode` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromOpening` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromVariation` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "ecoCode" TEXT NOT NULL,
ADD COLUMN     "opening" TEXT NOT NULL,
ADD COLUMN     "variation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "gameIds",
DROP COLUMN "moveNum",
ADD COLUMN     "fromGame" BOOLEAN NOT NULL,
ADD COLUMN     "gameReferences" JSONB NOT NULL,
DROP COLUMN "fromEcoCode",
ADD COLUMN     "fromEcoCode" JSONB NOT NULL,
DROP COLUMN "fromOpening",
ADD COLUMN     "fromOpening" JSONB NOT NULL,
DROP COLUMN "fromVariation",
ADD COLUMN     "fromVariation" JSONB NOT NULL;
