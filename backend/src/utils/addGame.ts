import { PrismaClient, GameVariant, ResultReason, GameSource, PositionPhase, PositionEvaluation, PuzzleType } from '@prisma/client';
import { generatePositionsFromPGN } from "../utils/chess/generatePositionsFromPGN";
import { addPosition } from './addPosition';

const prisma = new PrismaClient();

// Interface for game data
interface GameData {
    white: string;
    black: string;
    result: string;
    resultReason: ResultReason;
    pgn: string;
    createdAt: Date;
    gameDate: Date;
    gameSource: GameSource;
    gameVariant: GameVariant;
    fromPosition: string;  // ✅ Added missing field
    ecoCode: string;       // ✅ Added missing field
    openingName?: string;
    variation?: string;
    playedOnDGT: boolean;
    organization?: string;
    year?: number;
    city?: string;
    country?: string;
    timeControl?: string;
}
// Function to add a game
export async function addGame(pgn: string, online: boolean, gameId?: number) {
    // Check if game already exists
    if (gameId) {
        const existingGame = await prisma.game.findUnique({ where: { id: gameId } });

        if (existingGame) {
            console.log(`🚨 Game with ID ${gameId} already exists. Skipping insertion.`);
            return;
        }
    }

    // Generate positions from PGN
    const positions = generatePositionsFromPGN(pgn);



    // Insert new game
        const game = await prisma.game.create({
        data: {
        white: "Magnus Carlsen",
        black: "Hikaru Nakamura",
        result: "1-0",
        resultReason: ResultReason.Checkmate,
        pgn: pgn,
        createdAt: new Date(),
        gameDate: new Date("2023-01-01"),
        gameSource: online ? GameSource.Lichess : GameSource.OTB,
        gameVariant: GameVariant.Standard,
        fromPosition: "startpos",  // ✅ Required field
        ecoCode: "A45",            // ✅ Required field
        openingName: "Ruy Lopez",
        variation: "Ruy Lopez: Classical",
        playedOnDGT: false,
        organization: "Lichess Masters",
        year: 2024,
        city: "Oslo",
        country: "Norway",
        timeControl: "3+2",
        }
    });


    console.log(`✅ Game inserted: ${game.id}`);

    for (const position of positions) {
        const existingPosition = await prisma.position.findFirst({
            where: { fen: position.fen }
        });

        if (existingPosition) {
            await prisma.position.update({
                where: { id: existingPosition.id },
                data: { gameReferences: { connect: [{ id: game.id }] } },
            });
            console.log(`🔄Updated game reference for FEN: ${position.fen}`);
        } else {
            await addPosition(position.fen, true, game.id);
        }
    }

    console.log("✅ Positions inserted separately.");
}