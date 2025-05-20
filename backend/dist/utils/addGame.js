"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGame = addGame;
const client_1 = require("@prisma/client");
const generatePositionsFromPGN_1 = require("../utils/chess/generatePositionsFromPGN");
const addPosition_1 = require("./addPosition");
const prisma = new client_1.PrismaClient();
// Function to add a game
function addGame(pgn, online, gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if game already exists
        if (gameId) {
            const existingGame = yield prisma.game.findUnique({ where: { id: gameId } });
            if (existingGame) {
                console.log(`🚨 Game with ID ${gameId} already exists. Skipping insertion.`);
                return;
            }
        }
        // Generate positions from PGN
        const positions = (0, generatePositionsFromPGN_1.generatePositionsFromPGN)(pgn);
        // Insert new game
        const game = yield prisma.game.create({
            data: {
                white: "Magnus Carlsen",
                black: "Hikaru Nakamura",
                result: "1-0",
                resultReason: client_1.ResultReason.Checkmate,
                pgn: pgn,
                createdAt: new Date(),
                gameDate: new Date("2023-01-01"),
                gameSource: online ? client_1.GameSource.Lichess : client_1.GameSource.OTB,
                gameVariant: client_1.GameVariant.Standard,
                fromPosition: "startpos", // ✅ Required field
                ecoCode: "A45", // ✅ Required field
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
            const existingPosition = yield prisma.position.findFirst({
                where: { fen: position.fen }
            });
            if (existingPosition) {
                yield prisma.position.update({
                    where: { id: existingPosition.id },
                    data: { gameReferences: { connect: [{ id: game.id }] } },
                });
                console.log(`🔄Updated game reference for FEN: ${position.fen}`);
            }
            else {
                yield (0, addPosition_1.addPosition)(position.fen, true, game.id);
            }
        }
        console.log("✅ Positions inserted separately.");
    });
}
