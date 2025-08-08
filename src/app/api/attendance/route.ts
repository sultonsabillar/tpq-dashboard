export async function POST(request: Request) {
  try {
    const { studentId, date, status, activityType } = await request.json();
    if (!studentId || !date || !status || !activityType) {
      return NextResponse.json({ error: 'studentId, date, status, dan activityType wajib diisi' }, { status: 400 });
    }
    // Pastikan date dalam format ISO DateTime
    // Konversi yyyy-mm-dd ke Date (tanpa waktu, jam 00:00:00 lokal)
    let dateObj: Date | null = null;
    try {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid date format');
      const [year, month, day] = date.split('-').map(Number);
      dateObj = new Date(year, month - 1, day); // bulan 0-based
    } catch {
      return NextResponse.json({ error: 'Format tanggal tidak valid (yyyy-mm-dd)' }, { status: 400 });
    }
    const created = await prisma.attendance.create({
      data: {
        studentId,
        date: dateObj,
        status,
        activityType,
      },
    });
    // Saat response, kembalikan date dalam format yyyy-mm-dd
    const attendanceRes = { ...created, date: created.date.toISOString().slice(0, 10) };
    return NextResponse.json({ success: true, attendance: attendanceRes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    // Cek dulu apakah data ada
    const found = await prisma.attendance.findUnique({ where: { id } });
    if (!found) {
      return NextResponse.json({ error: 'Attendance not found' }, { status: 404 });
    }
    await prisma.attendance.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
