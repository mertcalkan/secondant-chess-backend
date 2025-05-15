-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('OTB', 'ONLINE');

-- CreateEnum
CREATE TYPE "GameVariant" AS ENUM ('Standard', 'Chess960', 'FischerRandom');

-- CreateEnum
CREATE TYPE "PositionPhase" AS ENUM ('Opening', 'Middlegame', 'Endgame');

-- CreateEnum
CREATE TYPE "PuzzleType" AS ENUM ('Standard', 'Etude', 'Composition');

-- CreateEnum
CREATE TYPE "ResultReason" AS ENUM ('FiftyMoveRule', 'ThreefoldRepetition', 'Resignation', 'AgreeingOnDraw', 'Stalemate', 'InsufficientMaterial', 'Checkmate');

-- CreateEnum
CREATE TYPE "GameSource" AS ENUM ('Lichess', 'ChessCom', 'OTB');

-- CreateEnum
CREATE TYPE "PositionEvaluation" AS ENUM ('NotEval', 'WhiteHugeAdvantage', 'WhiteMuchBetter', 'WhiteBetter', 'WhiteSlightlyBetter', 'Equal', 'BlackSlightlyBetter', 'BlackBetter', 'BlackMuchBetter', 'BlackHugeAdvantage', 'WhiteMatesInN', 'BlackMatesInN');

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "white" TEXT NOT NULL,
    "black" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "resultReason" "ResultReason" NOT NULL,
    "pgn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameSource" "GameSource" NOT NULL,
    "gameVariant" "GameVariant" NOT NULL DEFAULT 'Standard',
    "fromPosition" TEXT NOT NULL,
    "playedOnDGT" BOOLEAN NOT NULL,
    "organization" TEXT,
    "year" INTEGER,
    "city" TEXT,
    "country" TEXT,
    "timeControl" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "fen" TEXT NOT NULL,
    "moveNum" INTEGER,
    "gameId" INTEGER,
    "whitePieces" JSONB NOT NULL,
    "blackPieces" JSONB NOT NULL,
    "whiteControl" JSONB NOT NULL,
    "blackControl" JSONB NOT NULL,
    "whiteAdvantage" JSONB NOT NULL,
    "blackAdvantage" JSONB NOT NULL,
    "turn" TEXT NOT NULL,
    "isCheck" BOOLEAN NOT NULL DEFAULT false,
    "isDoubleCheck" BOOLEAN NOT NULL DEFAULT false,
    "isDiscoveredCheck" BOOLEAN NOT NULL DEFAULT false,
    "isMate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whiteAccuracy" DOUBLE PRECISION,
    "blackAccuracy" DOUBLE PRECISION,
    "whiteAverageCentipawnLoss" DOUBLE PRECISION,
    "blackAverageCentipawnLoss" DOUBLE PRECISION,
    "whiteBlunderMove" INTEGER,
    "whiteInAccuracyMove" INTEGER,
    "blackBlunderMove" INTEGER,
    "blackInAccuracyMove" INTEGER,
    "fromEcoCode" TEXT,
    "fromOpening" TEXT,
    "fromVariation" TEXT,
    "positionPhase" "PositionPhase" NOT NULL,
    "positionEvaluation" "PositionEvaluation" NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Puzzle" (
    "id" SERIAL NOT NULL,
    "puzzleType" "PuzzleType" NOT NULL DEFAULT 'Standard',
    "puzzleLevel" TEXT NOT NULL,
    "puzzleTheme" TEXT[],
    "puzzleLength" TEXT NOT NULL,
    "puzzlePhase" "PositionPhase"[],
    "fromEcoCode" TEXT,
    "fromOpening" TEXT,
    "fromVariation" TEXT,
    "goal" TEXT NOT NULL,
    "gameId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puzzle" ADD CONSTRAINT "Puzzle_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
