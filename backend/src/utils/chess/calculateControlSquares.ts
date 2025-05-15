import { Chess} from "chess.js";

export function calculateControlSquares(chess: Chess, color: "w" | "b") {
  const board = chess.board();
  const controlMap: Record<string, number> = {};

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file];
      if (piece && piece.color === color) {
        const square = String.fromCharCode(97 + file) + (8 - rank);
        const legalMoves = chess.moves({ square, verbose: true });

        for (const move of legalMoves) {
          if (move.to !== square) {
            controlMap[move.to] = (controlMap[move.to] || 0) + 1;
          }
        }
      }
    }
  }

  return controlMap;
}
