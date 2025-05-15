import { Chess} from "chess.js";

export function extractPiecePositions(chess: Chess, color: "w" | "b") {
  const board = chess.board();
  const positions: string[] = [];

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file];
      if (piece && piece.color === color) {
        const square = String.fromCharCode(97 + file) + (8 - rank);
        positions.push(square);
      }
    }
  }

  return { pieces: positions };
}

console.log(extractPiecePositions(new Chess(), "w"));