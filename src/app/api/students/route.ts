import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const students = await prisma.student.findMany();
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Jangan izinkan id custom, biar Prisma generate UUID
    if ('id' in data) delete data.id;
    const student = await prisma.student.create({ data });
    return NextResponse.json(student);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const student = await prisma.student.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(student);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    // Hapus semua attendance milik student ini dulu
    await prisma.attendance.deleteMany({ where: { studentId: id } });
    await prisma.student.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
