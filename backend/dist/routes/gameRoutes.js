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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../prisma/client"));
const router = express_1.default.Router();
router.get('/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield client_1.default.game.findMany();
    res.json(games);
}));
router.get('/positions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const positions = yield client_1.default.position.findMany();
    res.json(positions);
}));
// router.get('/puzzles', async (req, res) => {
//  const puzzles = await prisma.puzzle.findMany();
//   res.json(puzzles);
// });
exports.default = router;
