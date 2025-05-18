import { PrismaClient, PositionPhase, PositionEvaluation } from '@prisma/client';
import { generatePositionFromFEN} from "./chess/generatePositionFromFEN";

const prisma = new PrismaClient();

export async function addPositions(gameId: number, pgn: string) {
    const positions = generatePositionFromFEN(pgn);

    for (const position of positions) {
        const existingPosition = await prisma.position.findFirst({ where: { fen: position.fen } });

        if (existingPosition) {
            await prisma.position.update({
                where: { id: existingPosition.id },
                data: {
                    gameReferences: [...existingPosition.gameReferences, { gameId }],
                },
            });
        } else {
            await prisma.position.create({
                data: {
                    fen: position.fen,
                    fromGame: true,
                    gameReference: [{ gameId }],
                    whitePieces: position.whitePieceCoordinates,
                    blackPieces: position.blackPieceCoordinates,
                    whiteMaterialAdvantage: position.whiteMaterialAdvantage,
                    blackMaterialAdvantage: position.blackMaterialAdvantage,
                    positionPhase: PositionPhase.Opening,
                    positionEvaluation: PositionEvaluation.WhiteSlightlyBetter,
                    isCheck: position.isCheck,
                    isMate: position.isMate,
                    isStalemate: position.isStalemate,
                    isDoubleCheck: position.isDoubleCheck,
                    isDiscoveredCheck: position.isDiscoveredCheck,
                },
            });
        }
    }
}