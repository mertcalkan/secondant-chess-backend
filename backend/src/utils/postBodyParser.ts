import { Prisma } from '@prisma/client';

type PositionFilterPayload = {
  whitePieceCoordinates?: Record<string, string[]>;
  blackPieceCoordinates?: Record<string, string[]>;
  whitePieces?: Record<string, number>;
  blackPieces?: Record<string, number>;
  materialAdvantage?: Record<'white' | 'black', Record<string, number>>;
  isMate?: boolean;
  isCheck?: boolean;
  isDoubleCheck?: boolean;
  isDiscoveredCheck?: boolean;
  positionEvaluation?: Prisma.positionEvaluation;
  positionPhase?: Prisma.positionPhase;
  isStalemate?: boolean;
  createdAt?: { gte?: string; lte?: string };
  limit?: number;
  offset?: number;
  sortField?: keyof Prisma.PositionOrderByWithRelationInput;
  sort?: 'asc' | 'desc';
};

export function parsePostPositionFilters(body: PositionFilterPayload) {
  console.log('whitePieceCoordinates (filtered):', normalizeFilterCoordinates(body.whitePieceCoordinates));

  const where: Prisma.PositionWhereInput = {};
  const orderBy: Prisma.PositionOrderByWithRelationInput = {};
//   if (body.whitePieceCoordinates) {
//    where.whitePieceCoordinates = {
//   path: ['king'],
//   array_contains: ["e1"],
// };
//   }
  //  if (body.whitePieceCoordinates) {
  //   where.whitePieceCoordinates = {
  //     equals: body.whitePieceCoordinates as any,
  //   } 
  // }
if (body.whitePieceCoordinates) {
  const pieceTypes = Object.keys(body.whitePieceCoordinates);

  for (const pieceType of pieceTypes) {
    const squares = body.whitePieceCoordinates[pieceType];

    
    if (squares.length > 0) {
      where.whitePieceCoordinates = {
        path: [pieceType],
        array_contains: squares,
      };
      break; // sadece bir filtre uygula, istersen birden fazlasını da işleyebilirsin
    }
  }
}
  if (body.blackPieceCoordinates) {
    where.blackPieceCoordinates = {
      equals: body.blackPieceCoordinates as any,
    };
  }

  if (body.whitePieces) {
    where.whitePieces = {
      equals: body.whitePieces as any,
    };
  }

  if (body.blackPieces) {
    where.blackPieces = {
      equals: body.blackPieces as any,
    };
  }

  if (body.materialAdvantage) {
    where.materialAdvantage = {
      equals: body.materialAdvantage as any,
    };
  }

  if (typeof body.isMate === 'boolean') where.isMate = body.isMate;
  if (typeof body.isCheck === 'boolean') where.isCheck = body.isCheck;
  if (typeof body.isDoubleCheck === 'boolean') where.isDoubleCheck = body.isDoubleCheck;
  if (typeof body.isDiscoveredCheck === 'boolean') where.isDiscoveredCheck = body.isDiscoveredCheck;
  if (typeof body.isStalemate === 'boolean') where.isStaleMate = body.isStalemate;

  if (body.positionEvaluation) {
    where.positionEvaluation = body.positionEvaluation;
  }

  if (body.positionPhase) {
    where.positionPhase = body.positionPhase;
  }
  console.log('whitePieceCoordinates:', body.whitePieceCoordinates);
  if (body.createdAt) {
    const range: any = {};
    if (body.createdAt.gte) range.gte = new Date(body.createdAt.gte);
    if (body.createdAt.lte) range.lte = new Date(body.createdAt.lte);
    where.createdAt = range;
  }

  const take = body.limit ?? 20;
  const skip = body.offset ?? 0;

  const sortField = body.sortField ?? 'id';
  orderBy[sortField] = body.sort === 'desc' ? 'desc' : 'asc';

  return { where, orderBy, take, skip };
}

function normalizeFilterCoordinates(input?: Record<string, string[]>): Record<string, string[]> | undefined {
  if (!input) return undefined;
  const result: Record<string, string[]> = {};
  for (const key in input) {
    result[key] = [...input[key]].sort();
  }
  return result;
}