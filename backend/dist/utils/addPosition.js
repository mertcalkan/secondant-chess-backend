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
exports.addPosition = addPosition;
const client_1 = require("@prisma/client");
const generatePositionFromFEN_1 = require("./chess/generatePositionFromFEN");
const prisma = new client_1.PrismaClient();
function addPosition(fen, isFromGame, gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        let position = (0, generatePositionFromFEN_1.generatePositionFromFEN)(fen);
        const existingPosition = yield prisma.position.findFirst({ where: { fen: position.fen } });
        if (existingPosition && isFromGame && gameId) {
            yield prisma.position.update({
                where: { id: existingPosition.id },
                data: {
                    gameReferences: { connect: [{ id: gameId }] }
                },
            });
        }
        else {
            yield prisma.position.create({
                data: {
                    fen: position.fen,
                    fromGame: isFromGame,
                    gameReferences: isFromGame && gameId
                        ? JSON.stringify([gameId])
                        : JSON.stringify([]),
                    whitePieceCoordinates: JSON.stringify(position.whitePieceCoordinates),
                    blackPieceCoordinates: JSON.stringify(position.blackPieceCoordinates),
                    whitePieces: JSON.stringify(position.whitePieces),
                    blackPieces: JSON.stringify(position.blackPieces),
                    positionPhase: client_1.PositionPhase.Opening,
                    positionEvaluation: client_1.PositionEvaluation.WhiteSlightlyBetter,
                    isCheck: position.isCheck,
                    isMate: position.isMate,
                    isStaleMate: position.isStalemate,
                    isDoubleCheck: position.isDoubleCheck,
                    materialAdvantage: JSON.stringify(position.materialAdvantage),
                    // ✅ Missing required fields now included
                    moveTurn: "w", // Default moveTurn, adjust as necessary
                    fromEcoCode: JSON.stringify([]), // Adjust based on real data
                    fromOpening: JSON.stringify([]), // Adjust based on real data
                    fromVariation: JSON.stringify([]), // Adjust based on real data
                },
            });
        }
    });
}
