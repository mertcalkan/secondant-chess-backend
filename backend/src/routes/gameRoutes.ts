import express from 'express';
import prisma from '../prisma/client';
import { parseGameFilters, parsePositionFilters } from '../utils/queryParser';
import {parsePostPositionFilters } from '../utils/postBodyParser';
const router = express.Router();

// GET /api/games
router.get('/games', async (req, res) => {
  try {
    const { where, orderBy, take, skip } = parseGameFilters(req.query);
    const games = await prisma.game.findMany({ where, orderBy, take, skip });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch games', detail: err });
  }
});

// GET /api/positions
router.get('/positions', async (req, res) => {
  try {
    const { where, orderBy, take, skip } = parsePositionFilters(req.query);
    const positions = await prisma.position.findMany({ where, orderBy, take, skip });
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch positions', detail: err });
  }
});



router.post('/positions/filter', async (req, res) => {
  try {
    console.log('Received body:', req.body); // 👈 buraya ekle

    const { where, orderBy, take, skip } = parsePostPositionFilters(req.body);

    const positions = await prisma.position.findMany({
      where,
      orderBy,
      take,
      skip,
    });

    res.status(200).json(positions);
  } catch (error) {
    console.error('[ERROR] Filtering Positions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
