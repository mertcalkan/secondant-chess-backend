import { PrismaClient, GameVariant, ResultReason, GameSource, PositionPhase, PositionEvaluation, PuzzleType } from '@prisma/client';
import { generatePositionFromFEN } from "./chess/generatePositionFromFEN";

const prisma = new PrismaClient();
export interface PositionData {
  fen: string;
  whitePieceCoordinates: Record<string, string[]>; // e.g., { "bishop": ["f4"], "knight": ["g5", "h6"] }
  blackPieceCoordinates: Record<string, string[]>;
  isDoubleCheck: boolean;
  isMate: boolean;
  isStalemate: boolean;
  // isDiscoveredCheck: boolean;
  isCheck: boolean;
  whitePieces: Record<string, number>;
  blackPieces: Record<string, number>;
  materialAdvantage: {
    white: Record<string, number>;
    black: Record<string, number>;
  };
}

export async function addPosition(fen: string, isFromGame: boolean, gameId?: number) {
    let position = generatePositionFromFEN(fen);

    const existingPosition = await prisma.position.findFirst({ where: { fen: position.fen } });

    if (existingPosition && isFromGame && gameId) {
        await prisma.position.update({
            where: { id: existingPosition.id },
            data: {
                gameReferences: { connect: [{ id: gameId }] }
            },
        });
    } else {
         await prisma.position.create({
            data: {
                fen: position.fen,
                fromGame: isFromGame,
                gameReferences: isFromGame && gameId 
                    ? JSON.stringify([gameId]) 
                    : JSON.stringify([]),

                whitePieceCoordinates: position.whitePieceCoordinates,
                blackPieceCoordinates: position.blackPieceCoordinates,

                whitePieces: position.whitePieces,
                blackPieces: position.blackPieces,

                positionPhase: PositionPhase.Opening,
                positionEvaluation: PositionEvaluation.WhiteSlightlyBetter,
                isCheck: position.isCheck,
                isMate: position.isMate,
                isStaleMate: position.isStalemate,
                isDoubleCheck: position.isDoubleCheck,

                materialAdvantage: position.materialAdvantage,

                // ✅ Missing required fields now included
                moveTurn: "w", // Default moveTurn, adjust as necessary
                fromEcoCode: JSON.stringify([]), // Adjust based on real data
                fromOpening: JSON.stringify([]), // Adjust based on real data
                fromVariation: JSON.stringify([]), // Adjust based on real data
            },
        });
    }
}