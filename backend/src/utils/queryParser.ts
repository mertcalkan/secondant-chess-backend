import { Prisma } from '@prisma/client';

export function parseGameFilters(query: any) {
  const where: Prisma.GameWhereInput = {};
  const orderBy: Prisma.GameOrderByWithRelationInput = {};

  // Filtering
  if (query.white) where.white = { contains: query.white, mode: 'insensitive' };
  if (query.black) where.black = { contains: query.black, mode: 'insensitive' };

  if (query.result) where.result = query.result;

  if (query.resultReason) where.resultReason = query.resultReason;
  if (query.gameSource) where.gameSource = query.gameSource;
  if (query.gameVariant) where.gameVariant = query.gameVariant;

  if (query.city) where.city = { contains: query.city, mode: 'insensitive' };
  if (query.country) where.country = { contains: query.country, mode: 'insensitive' };

  if (query.year) where.year = parseInt(query.year);

  if (query.openingName) where.openingName = {
    contains: query.openingName,
    mode: 'insensitive'
  };

  if (query.ecoCode) where.ecoCode = {
    contains: query.ecoCode,
    mode: 'insensitive'
  };

  if (query.gameDateRange) {
    const [start, end] = query.gameDateRange.split(',');
    where.gameDate = {
      gte: new Date(start),
      lte: end ? new Date(end) : new Date(start)
    };
  }

  // Pagination
  const take = query.limit ? parseInt(query.limit) : 20;
  const skip = query.offset ? parseInt(query.offset) : 0;

  // Sorting
  if (query.sort) {
    const sortField = query.sortField || 'gameDate';
    orderBy[sortField] = query.sort.toLowerCase() === 'desc' ? 'desc' : 'asc';
  }

  return { where, orderBy, take, skip };
}

export function parsePositionFilters(query: any) {
  const where: Prisma.PositionWhereInput = {};
  const orderBy: Prisma.PositionOrderByWithRelationInput = {};

  // Filtering
  if (query.fen) {
    where.fen = { contains: query.fen };
  }

  if (query.isMate !== undefined) {
    where.isMate = query.isMate === 'true';
  }

  if (query.isCheck !== undefined) {
    where.isCheck = query.isCheck === 'true';
  }

  if (query.moveTurn) {
    where.moveTurn = query.moveTurn;
  }

  if (query.positionEvaluation) {
    where.positionEvaluation = query.positionEvaluation;
  }

  if (query.positionPhase) {
    where.positionPhase = query.positionPhase;
  }

  if (query.whiteAccuracy) {
    where.whiteAccuracy = {
      gte: parseFloat(query.whiteAccuracy)
    };
  }

  if (query.blackAccuracy) {
    where.blackAccuracy = {
      gte: parseFloat(query.blackAccuracy)
    };
  }

  if (query.fromOpening) {
    where.fromOpening = {
      contains: query.fromOpening,
      mode: 'insensitive'
    } as any;
  }

  if (query.fromEcoCode) {
    where.fromEcoCode = {
      contains: query.fromEcoCode,
      mode: 'insensitive'
    } as any;
  }

  // Pagination
  const take = query.limit ? parseInt(query.limit) : 20;
  const skip = query.offset ? parseInt(query.offset) : 0;

  // Sorting
  if (query.sort) {
    const sortField = query.sortField || 'id';
    orderBy[sortField] = query.sort.toLowerCase() === 'desc' ? 'desc' : 'asc';
  }

  return { where, orderBy, take, skip };
}
