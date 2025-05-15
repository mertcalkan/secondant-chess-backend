import express from 'express';
import prisma from '../prisma/client';

const router = express.Router();

router.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      positions: true
    }
  });
  res.json(games);
});

export default router;
