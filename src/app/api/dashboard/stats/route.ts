import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Hitung awal dan akhir bulan ini
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    // Total generus bulan ini
    const totalStudents = await prisma.student.count();
    // Total generus bulan lalu
    let totalStudentsLastMonth = 0;
    let changeTotalStudents = 0;
    let changeTypeTotalStudents = 'stable';
    if ('createdAt' in (await prisma.student.findFirst() || {})) {
      totalStudentsLastMonth = await prisma.student.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      });
      changeTotalStudents = totalStudents - totalStudentsLastMonth;
      changeTypeTotalStudents = changeTotalStudents > 0 ? 'increase' : changeTotalStudents < 0 ? 'decrease' : 'stable';
    }

    // Generus aktif = semua generus kecuali Pra PAUD
    const activeStudents = await prisma.student.count({ where: { NOT: { level: 'Pra PAUD' } } });
    // Generus aktif bulan lalu
    let activeStudentsLastMonth = 0;
    let changeActiveStudents = 0;
    let changeTypeActiveStudents = 'stable';
    if ('createdAt' in (await prisma.student.findFirst() || {})) {
      activeStudentsLastMonth = await prisma.student.count({
        where: {
          NOT: { level: 'Pra PAUD' },
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      });
      changeActiveStudents = activeStudents - activeStudentsLastMonth;
      changeTypeActiveStudents = changeActiveStudents > 0 ? 'increase' : changeActiveStudents < 0 ? 'decrease' : 'stable';
    }

    // Progress kehadiran bulan ini (exclude Pra PAUD)
    // Ambil semua studentId yang levelnya BUKAN Pra PAUD
    const nonPraPaudStudents = await prisma.student.findMany({
      where: { NOT: { level: 'Pra PAUD' } },
      select: { id: true },
    });
    const nonPraPaudIds = nonPraPaudStudents.map(s => s.id);
    const attendanceMonth = await prisma.attendance.count({
      where: {
        studentId: { in: nonPraPaudIds },
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
        status: 'Hadir',
      },
    });
    const totalAttendancePossible = nonPraPaudIds.length * (new Date().getDate()); // asumsi 1x absen per hari
    const attendanceRateMonth = totalAttendancePossible > 0 ? Math.round((attendanceMonth / totalAttendancePossible) * 100) : 0;

    // Hitung jumlah grup unik dari field tpqGroup di Student
    const groupResult = await prisma.student.findMany({
      select: { tpqGroup: true },
      distinct: ['tpqGroup'],
    });
    const totalClasses = groupResult.length;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const todayAttendance = await prisma.attendance.count({
      where: {
        date: {
          gte: start,
          lte: end,
        },
        status: 'Hadir',
      },
    });

    return NextResponse.json({
      totalStudents,
      changeTotalStudents,
      changeTypeTotalStudents,
      activeStudents,
      changeActiveStudents,
      changeTypeActiveStudents,
      totalClasses,
      todayAttendance,
      attendanceRate: attendanceRateMonth,
    });
  } catch (err) {
    console.error('API /api/dashboard/stats error:', err);
    return NextResponse.json({ error: 'Internal Server Error', detail: String(err) }, { status: 500 });
  }
}
