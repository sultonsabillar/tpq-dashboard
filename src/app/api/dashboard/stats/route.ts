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

    // Progress kehadiran KBM bulan ini (exclude Pra PAUD), peluang berdasarkan jumlah pertemuan KBM unik per TPQ
    const tpqGroups = await prisma.student.findMany({
      where: { NOT: { level: 'Pra PAUD' } },
      select: { tpqGroup: true },
      distinct: ['tpqGroup'],
    });
    // Rata-rata persentase kehadiran KBM per santri aktif (selain Pra PAUD)
    const activeStudentList = await prisma.student.findMany({
      where: { NOT: { level: 'Pra PAUD' } },
      select: { id: true },
    });
    let percentSum = 0;
    let count = 0;
    for (const student of activeStudentList) {
      // Ambil semua tanggal unik pertemuan KBM bulan ini untuk santri ini
      const uniqueKBMDates = await prisma.attendance.findMany({
        where: {
          studentId: student.id,
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
          },
          activityType: 'KBM',
        },
        select: { date: true },
        distinct: ['date'],
      });
      const pertemuanCount = uniqueKBMDates.length;
      if (pertemuanCount === 0) continue;
      // Hitung jumlah hadir KBM bulan ini untuk santri ini
      const hadirCount = await prisma.attendance.count({
        where: {
          studentId: student.id,
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
          },
          activityType: 'KBM',
          status: 'Hadir',
        },
      });
      percentSum += hadirCount / pertemuanCount;
      count++;
    }
    const attendanceRateMonth = count > 0 ? Math.round((percentSum / count) * 100) : 0;

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
