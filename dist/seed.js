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
const client_1 = require("@prisma/client");
const addGame_1 = require("./utils/addGame");
const addPosition_1 = require("./utils/addPosition");
// import { addPuzzle } from "./utils/addPuzzle";
// import { addTheoryTable } from "../src/utils/addTheoryTable";
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.game.deleteMany({});
        yield prisma.position.deleteMany({});
        const pgnTest = "1. c4 e6 2. g3 d5 3. Bg2 Nf6 4. Nf3 Be7 5. d4 O-O 6. O-O dxc4 7. Qc2 b5 8. a4 b4 9. Nfd2 Nd5 10. Nxc4 c5 11. dxc5 Bxc5 12. e4 Nb6 13. Ncd2 N8d7 14. a5 Ba6 15. axb6 Rc8 16. Rxa6 Bxf2+ 17. Kxf2 Rxc2 18. bxa7 Nb6 19. Kg1 Qc8 20. Rxb6 Qc5+ 21.Kh1 Qxb6 22. Nf3 Qxa7 23. Bf4 Rxb2 24. Nbd2 Qa2 25. Rc1 Rd8 0-1"; // Özetlenmiş PGN
        const fenTest = "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4";
        try {
            const game = yield (0, addGame_1.addGame)(pgnTest, true, 1);
            console.log("Game inserted:", game);
            yield (0, addPosition_1.addPosition)(fenTest, false);
            console.log("Positions inserted");
            // await addPuzzle(pgn, "Qxf7#");
            // console.log("✅ Puzzle inserted");
            // await addTheoryTable("Ruy Lopez", ["e4 e5", "Nf3 Nc6", "Bb5"]);
            // console.log("✅ Theory Table inserted");
        }
        catch (error) {
            console.error("❌ Error:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
main();
