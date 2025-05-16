/*
  Warnings:

  - You are about to drop the column `opening` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "opening",
ADD COLUMN     "openingName" TEXT;

-- AlterTable
ALTER TABLE "Position" ALTER COLUMN "gameReferences" SET DEFAULT '[]';
