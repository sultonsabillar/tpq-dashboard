
// Get student counts for each level (Pra PAUD, PAUD, Paket A, Paket B, Paket C, Paket D)
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // All possible levels
  const levels = [
    'Pra PAUD',
    'PAUD',
    'Paket A',
    'Paket B',
    'Paket C',
    'Paket D',
  ];
  // Query counts for each level
  const counts = await Promise.all(
    levels.map(async (level) => ({
      level,
      count: await prisma.student.count({ where: { level } }),
    }))
  );
  return NextResponse.json(counts);
}
