import { PrismaClient, GameVariant, ResultReason, GameSource, PositionPhase, PositionEvaluation, PuzzleType } from '@prisma/client';
import { generatePositionsFromPGN } from "../src/utils/chess/generatePositionsFromPGN";
import { extractPiecePositions } from "../src/utils/chess/extractPiecePositions";
import { calculateControlSquares } from "../src/utils/chess/calculateControlSquares";
import { Chess } from "chess.js";
const prisma = new PrismaClient();

async function main() {

  const basePGN = "";
  const game = await prisma.game.create({
    data: {
      white: "Magnus Carlsen",
      black: "Hikaru Nakamura",
      result: "1-0",
      resultReason: ResultReason.Checkmate,
      pgn: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6...",
      gameSource: GameSource.Lichess,
      gameVariant: GameVariant.Standard,
      fromPosition: "startpos",
      playedOnDGT: false,
      organization: "Lichess Masters",
      year: 2024,
      city: "Oslo",
      country: "Norway",
      timeControl: "3+2",
      positions: {
        create: [
          {
            fen: "r1bqkbnr/pppp1ppp/2n5/4p3/1b2P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 4",
            moveNum: 4,
            whitePieces: { pieces: ["Ke1", "Qd1", "Ra1", "Rh1"] },
            blackPieces: { pieces: ["Ke8", "Qd8", "Ra8", "Rh8"] },
            whiteControl: { e4: 1, d5: 2 },
            blackControl: { e5: 1, d4: 2 },
            whiteAdvantage: { score: 0.5 },
            blackAdvantage: { score: 0.0 },
            turn: "white",
            isCheck: false,
            isDoubleCheck: false,
            isDiscoveredCheck: false,
            isMate: false,
            whiteAccuracy: 95.5,
            blackAccuracy: 92.3,
            whiteAverageCentipawnLoss: 15.2,
            blackAverageCentipawnLoss: 25.1,
            positionPhase: PositionPhase.Opening,
            positionEvaluation: PositionEvaluation.WhiteSlightlyBetter,
          }
        ]
      },
      puzzles: {
        create: [
          {
            puzzleType: PuzzleType.Standard,
            puzzleLevel: "Intermediate",
            puzzleTheme: ["Fork", "Pin"],
            puzzleLength: "3 moves",
            puzzlePhase: [PositionPhase.Middlegame],
            goal: "Mate",
            fromEcoCode: "C65",
            fromOpening: "Ruy Lopez",
            fromVariation: "Berlin Defense"
          }
        ]
      }
    }
  });

  console.log("✅ Game inserted:", game);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });





