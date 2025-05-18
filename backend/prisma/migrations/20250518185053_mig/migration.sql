/*
  Warnings:

  - You are about to drop the column `blackMaterial` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `whiteMaterial` on the `Position` table. All the data in the column will be lost.
  - Added the required column `blackPieceCoordinates` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whitePieceCoordinates` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Position" DROP COLUMN "blackMaterial",
DROP COLUMN "whiteMaterial",
ADD COLUMN     "blackPieceCoordinates" JSONB NOT NULL,
ADD COLUMN     "whitePieceCoordinates" JSONB NOT NULL;
