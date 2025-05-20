"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePositionFromFEN = generatePositionFromFEN;
const chess_js_1 = require("chess.js");
function generatePositionFromFEN(fen) {
    const game = new chess_js_1.Chess(fen);
    const board = game.board();
    let whitePieceCoordinates = {};
    let blackPieceCoordinates = {};
    let whitePieces = { pawn: 0, knight: 0, bishop: 0, rook: 0, queen: 0, king: 0 };
    let blackPieces = { pawn: 0, knight: 0, bishop: 0, rook: 0, queen: 0, king: 0 };
    board.forEach((row, rowIdx) => {
        row.forEach((piece, colIdx) => {
            if (piece) {
                const coord = `${String.fromCharCode(97 + colIdx)}${8 - rowIdx}`;
                const pieceNameMap = { p: "pawn", n: "knight", b: "bishop", r: "rook", q: "queen", k: "king" };
                const pieceType = pieceNameMap[piece.type];
                if (piece.color === "w") {
                    if (!whitePieceCoordinates[pieceType])
                        whitePieceCoordinates[pieceType] = [];
                    whitePieceCoordinates[pieceType].push(coord);
                    whitePieces[pieceType]++;
                }
                else {
                    if (!blackPieceCoordinates[pieceType])
                        blackPieceCoordinates[pieceType] = [];
                    blackPieceCoordinates[pieceType].push(coord);
                    blackPieces[pieceType]++;
                }
            }
        });
    });
    // **Calculate Material Advantage** by comparing piece counts directly
    let materialAdvantageWhite = {};
    let materialAdvantageBlack = {};
    Object.keys(whitePieces).forEach((pieceType) => {
        const difference = whitePieces[pieceType] - blackPieces[pieceType];
        if (difference > 0)
            materialAdvantageWhite[pieceType] = difference;
        else if (difference < 0)
            materialAdvantageBlack[pieceType] = -difference;
    });
    return {
        fen,
        whitePieceCoordinates,
        blackPieceCoordinates,
        isDoubleCheck: game.inCheck() && game.moves().filter(m => m.includes("+")).length > 1,
        isMate: game.isCheckmate(),
        isStalemate: game.isStalemate(),
        // isDiscoveredCheck: (game.inCheck() && game.moves().filter(m => m.includes("+")).length > 1), // Rough estimation
        isCheck: game.inCheck(),
        whitePieces,
        blackPieces,
        materialAdvantage: {
            white: materialAdvantageWhite,
            black: materialAdvantageBlack,
        },
    };
}
