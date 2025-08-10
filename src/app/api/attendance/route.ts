
import { toZonedTime } from 'date-fns-tz';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/attendance/:id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { studentId, date, status, activityType } = await request.json();
    if (!studentId || !date || !status || !activityType) {
      return NextResponse.json({ error: 'studentId, date, status, dan activityType wajib diisi' }, { status: 400 });
    }
    // Validasi date format
    let dateObj: Date;
    try {
      if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date)) throw new Error('Invalid date format');
      const utcDate = new Date(`${date}T00:00:00Z`);
      dateObj = toZonedTime(utcDate, 'Asia/Jakarta');
    } catch {
      return NextResponse.json({ error: 'Format tanggal tidak valid (yyyy-mm-dd)' }, { status: 400 });
    }
    // Pastikan data ada
    const found = await prisma.attendance.findUnique({ where: { id } });
    if (!found) {
      return NextResponse.json({ error: 'Attendance not found' }, { status: 404 });
    }
    const updated = await prisma.attendance.update({
      where: { id },
      data: { studentId, date: dateObj, status, activityType },
    });
    const attendanceRes = { ...updated, date: updated.date.toISOString().slice(0, 10) };
    return NextResponse.json({ success: true, attendance: attendanceRes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const { studentId, date, status, activityType } = await request.json();
    if (!studentId || !date || !status || !activityType) {
      return NextResponse.json({ error: 'studentId, date, status, dan activityType wajib diisi' }, { status: 400 });
    }
    // Pastikan date dalam format yyyy-mm-dd dan konversi ke waktu Asia/Jakarta
    let dateObj: Date;
    try {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid date format');
      // Buat objek Date dari string tanggal (anggap jam 00:00 UTC)
      const utcDate = new Date(`${date}T00:00:00Z`);
      // Konversi ke waktu Jakarta (tidak akan mundur)
      dateObj = toZonedTime(utcDate, 'Asia/Jakarta');
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
