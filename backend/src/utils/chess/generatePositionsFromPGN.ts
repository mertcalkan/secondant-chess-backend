import { Chess } from "chess.js";

interface PositionData {
  fen: string;
  moveNum: number;
  whitePieces: string[];
  blackPieces: string[];
  isDoubleCheck : boolean;
  whiteMaterialAdvantage : JSON;
  blackMaterialAdvantage : JSON;
  
}

export function generatePositionsFromPGN(pgn: string): PositionData[] {
  const game = new Chess();
  game.loadPgn(pgn);
  
  const positions: PositionData[] = [];

  let moveNum = 1;
  while (!game.isGameOver()) {
    const fen = game.fen();

    // Extract piece placement and material balance
    const board = game.board();
    const whitePieces: string[] = [];
    const blackPieces: string[] = [];
    let whiteMaterial = 0;
    let blackMaterial = 0;
    const isDoubleCheck = false
    board.forEach((row) => {
      row.forEach((piece) => {
        if (piece) {
          const symbol = `${piece.color === "w" ? "white" : "black"}${piece.type.toUpperCase()}`;
          piece.color === "w" ? whitePieces.push(symbol) : blackPieces.push(symbol);

          // Material values (pawn = 1, knight/bishop = 3, rook = 5, queen = 9)
          const materialValues: Record<string, number> = {
            p: 1, n: 3, b: 3, r: 5, q: 9, k: 0,
          };
          piece.color === "w"
            ? (whiteMaterial += materialValues[piece.type])
            : (blackMaterial += materialValues[piece.type]);
        }
      });
    });

    positions.push({ fen, moveNum, whitePieces, blackPieces, whiteMaterial, blackMaterial , isDiscoveredCheck , isDoubleCheck});

    game.move(game.turn() === "w" ? game.moves()[0] : game.moves()[1]); // Progress move
    moveNum++;
  }

  return positions;
}

// Example usage:
const pgn = "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6...";
const extractedPositions = generatePositionsFromPGN(pgn);
console.log(extractedPositions);