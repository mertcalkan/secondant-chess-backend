/*
  Warnings:

  - The values [FischerRandom] on the enum `GameVariant` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameVariant_new" AS ENUM ('Standard', 'Chess960');
ALTER TABLE "Game" ALTER COLUMN "gameVariant" DROP DEFAULT;
ALTER TABLE "Game" ALTER COLUMN "gameVariant" TYPE "GameVariant_new" USING ("gameVariant"::text::"GameVariant_new");
ALTER TYPE "GameVariant" RENAME TO "GameVariant_old";
ALTER TYPE "GameVariant_new" RENAME TO "GameVariant";
DROP TYPE "GameVariant_old";
ALTER TABLE "Game" ALTER COLUMN "gameVariant" SET DEFAULT 'Standard';
COMMIT;
