import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/progress-materi?studentId=...&semester=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');
  const semester = searchParams.get('semester');
  if (!studentId || !semester) {
    return NextResponse.json({ error: 'studentId and semester required' }, { status: 400 });
  }
  const data = await prisma.progressMateri.findMany({
    where: { studentId, semester },
  });
  return NextResponse.json(data);
}

// POST /api/progress-materi
export async function POST(req: NextRequest) {
  const body = await req.json();
  // body: { studentId, semester, category, target, status }
  if (!body.studentId || !body.semester || !body.category || !body.target || !body.status) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  // Upsert: update jika sudah ada, insert jika belum
  const data = await prisma.progressMateri.upsert({
    where: {
      studentId_semester_category_target: {
        studentId: body.studentId,
        semester: body.semester,
        category: body.category,
        target: body.target,
      }
    },
    update: { status: body.status },
    create: {
      studentId: body.studentId,
      semester: body.semester,
      category: body.category,
      target: body.target,
      status: body.status,
    }
  });
  return NextResponse.json(data);
}
