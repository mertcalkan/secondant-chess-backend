import { Chess } from "chess.js";
import { generatePositionFromFEN } from "./generatePositionFromFEN";
interface PositionData {
  fen: string;
  whitePieceCoordinates: Record<string, string[]>; // e.g., { "bishop": ["f4"], "knight": ["g5", "h6"] }
  blackPieceCoordinates: Record<string, string[]>;
  isDoubleCheck: boolean;
  isMate: boolean;
  isStalemate: boolean;
  // isDiscoveredCheck: boolean;
  isCheck: boolean;
  whitePieces: Record<string, number>;
  blackPieces: Record<string, number>;
  materialAdvantage: {
    white: Record<string, number>;
    black: Record<string, number>;
  };
}

// Step 1: Extracting the sequence of FEN positions from PGN
export function extractFENsFromPGN(pgn: string): string[] {
  const game = new Chess();
  game.loadPgn(pgn);

  const fenPositions: string[] = [];

  while (!game.isGameOver()) {
    fenPositions.push(game.fen());
    game.move(game.moves()[0]); // move progress
  }

  return fenPositions;
}

// Step 2: Process individual FEN positions


// Step 3: Convert PGN → Position Data
export function generatePositionsFromPGN(pgn: string): PositionData[] {
  const fens = extractFENsFromPGN(pgn);
  return fens.map((fen) => generatePositionFromFEN(fen));
}

// **Example FEN Input**
// exchange example
// const fenExample = "rnbqkb1r/ppp1pp1p/5p2/3p4/3P4/8/PPP1PPPP/RN1QKBNR w KQkq - 0 4";

//legal mate fen 
const fenExample = "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4"

const positionData = generatePositionFromFEN(fenExample);
console.log(JSON.stringify(positionData, null, 2));