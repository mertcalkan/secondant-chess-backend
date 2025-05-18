import express from 'express';
import prisma from '../prisma/client';

const router = express.Router();

router.get('/games', async (req, res) => {
 const games = await prisma.game.findMany();
  res.json(games);
});

router.get('/positions', async (req, res) => {
 const positions = await prisma.position.findMany();
  res.json(positions);
});

// router.get('/puzzles', async (req, res) => {
//  const puzzles = await prisma.puzzle.findMany();
//   res.json(puzzles);
// });



export default router;
