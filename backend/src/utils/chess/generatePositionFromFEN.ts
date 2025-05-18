import { Chess } from "chess.js";
interface PositionData {
  fen: string;
  whitePieceCoordinates: Record<string, string[]>; // e.g., { "bishop": ["f4"], "knight": ["g5", "h6"] }
  blackPieceCoordinates: Record<string, string[]>;
  isDoubleCheck: boolean;
  isMate: boolean;
  isStalemate: boolean;
  // isDiscoveredCheck: boolean;
  isCheck: boolean;
  whiteMaterial: Record<string, number>;
  blackMaterial: Record<string, number>;
  materialAdvantage: {
    white: Record<string, number>;
    black: Record<string, number>;
  };
}
export function generatePositionFromFEN(fen: string): PositionData {
  const game = new Chess(fen);
  const board = game.board();

  let whitePieceCoordinates: Record<string, string[]> = {};
  let blackPieceCoordinates: Record<string, string[]> = {};

  let whiteMaterial: Record<string, number> = { pawn: 0, knight: 0, bishop: 0, rook: 0, queen: 0, king: 0 };
  let blackMaterial: Record<string, number> = { pawn: 0, knight: 0, bishop: 0, rook: 0, queen: 0, king: 0 };

  board.forEach((row, rowIdx) => {
    row.forEach((piece, colIdx) => {
      if (piece) {
        const coord = `${String.fromCharCode(97 + colIdx)}${8 - rowIdx}`;
        const pieceNameMap: Record<string, string> = { p: "pawn", n: "knight", b: "bishop", r: "rook", q: "queen", k: "king" };
        const pieceType = pieceNameMap[piece.type];

        if (piece.color === "w") {
          if (!whitePieceCoordinates[pieceType]) whitePieceCoordinates[pieceType] = [];
          whitePieceCoordinates[pieceType].push(coord);
          whiteMaterial[pieceType]++;
        } else {
          if (!blackPieceCoordinates[pieceType]) blackPieceCoordinates[pieceType] = [];
          blackPieceCoordinates[pieceType].push(coord);
          blackMaterial[pieceType]++;
        }
      }
    });
  });

  // **Calculate Material Advantage** by comparing piece counts directly
  let materialAdvantageWhite: Record<string, number> = {};
  let materialAdvantageBlack: Record<string, number> = {};

  Object.keys(whiteMaterial).forEach((pieceType) => {
    const difference = whiteMaterial[pieceType] - blackMaterial[pieceType];
    if (difference > 0) materialAdvantageWhite[pieceType] = difference;
    else if (difference < 0) materialAdvantageBlack[pieceType] = -difference;
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
    whiteMaterial,
    blackMaterial,
    materialAdvantage: {
      white: materialAdvantageWhite,
      black: materialAdvantageBlack,
    },
  };
}