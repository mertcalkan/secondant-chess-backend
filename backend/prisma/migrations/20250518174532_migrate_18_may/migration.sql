/*
  Warnings:

  - You are about to drop the column `blackMaterialAdvantage` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `whiteMaterialAdvantage` on the `Position` table. All the data in the column will be lost.
  - Added the required column `blackMaterial` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materialAdvantage` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whiteMaterial` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Position" DROP COLUMN "blackMaterialAdvantage",
DROP COLUMN "whiteMaterialAdvantage",
ADD COLUMN     "blackMaterial" JSONB NOT NULL,
ADD COLUMN     "materialAdvantage" JSONB NOT NULL,
ADD COLUMN     "whiteMaterial" JSONB NOT NULL;
