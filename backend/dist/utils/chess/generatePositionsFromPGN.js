"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFENsFromPGN = extractFENsFromPGN;
exports.generatePositionsFromPGN = generatePositionsFromPGN;
const chess_js_1 = require("chess.js");
const generatePositionFromFEN_1 = require("./generatePositionFromFEN");
// Step 1: Extracting the sequence of FEN positions from PGN
function extractFENsFromPGN(pgn) {
    const game = new chess_js_1.Chess();
    game.loadPgn(pgn);
    const fenPositions = [];
    // Get all moves from PGN
    const moves = game.history(); // ✅ This retrieves the exact sequence of moves
    // Reset to initial position
    game.reset();
    // Apply moves one by one while recording FEN positions
    for (const move of moves) {
        game.move(move); // ✅ Apply each move sequentially
        fenPositions.push(game.fen()); // ✅ Capture FEN after each move
    }
    return fenPositions;
}
// Step 2: Process individual FEN positions
// Step 3: Convert PGN → Position Data
function generatePositionsFromPGN(pgn) {
    const fens = extractFENsFromPGN(pgn);
    return fens.map((fen) => (0, generatePositionFromFEN_1.generatePositionFromFEN)(fen));
}
// **Example FEN Input**
// exchange example
// const fenExample = "rnbqkb1r/ppp1pp1p/5p2/3p4/3P4/8/PPP1PPPP/RN1QKBNR w KQkq - 0 4";
//legal mate fen 
// const fenExample = "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4"
// const positionData = generatePositionFromFEN(fenExample);
// console.log(JSON.stringify(positionData, null, 2));
const pgnExample = "1. e4 e5 2. Nf3 Nc6 3. Bb5";
const positions = generatePositionsFromPGN(pgnExample);
console.log(JSON.stringify(positions, null, 2));
