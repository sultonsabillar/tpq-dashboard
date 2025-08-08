import { prisma } from '@/lib/prisma';
import { toZonedTime } from 'date-fns-tz';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Ambil bulan dari query, default ke bulan ini jika tidak ada
  const { searchParams } = new URL(req.url);
  const monthParam = searchParams.get('month'); // format: YYYY-MM
  let year, month;
  if (monthParam) {
    [year, month] = monthParam.split('-').map(Number);
  } else {
    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth() + 1;
  }
  try {
  // Hitung awal dan akhir bulan terpilih (Asia/Jakarta)
  const timeZone = 'Asia/Jakarta';
  const startOfMonth = toZonedTime(new Date(`${year}-${String(month).padStart(2, '0')}-01T00:00:00`), timeZone);
  const startOfNextMonth = toZonedTime(new Date(`${month === 12 ? year + 1 : year}-${String(month === 12 ? 1 : month + 1).padStart(2, '0')}-01T00:00:00`), timeZone);
  const startOfLastMonth = toZonedTime(new Date(`${month === 1 ? year - 1 : year}-${String(month === 1 ? 12 : month - 1).padStart(2, '0')}-01T00:00:00`), timeZone);
  const endOfLastMonth = toZonedTime(new Date(`${year}-${String(month).padStart(2, '0')}-01T00:00:00`), timeZone);

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
      // Semua absensi KBM bulan terpilih untuk santri ini (status apapun)
      const allKBM = await prisma.attendance.findMany({
        where: {
          studentId: student.id,
          date: {
            gte: startOfMonth,
            lt: startOfNextMonth,
          },
          activityType: 'KBM',
        },
        select: { status: true },
      });
      const pertemuanCount = allKBM.length;
      const hadirCount = allKBM.filter(a => a.status === 'Hadir').length;
      const persen = pertemuanCount > 0 ? hadirCount / pertemuanCount : 0;
      console.log(`Santri ${student.id}: pertemuan=${pertemuanCount}, hadir=${hadirCount}, persen=${persen}`);
      percentSum += persen;
      count++;
    }
    const attendanceRateMonth = count > 0 ? Math.round((percentSum / count) * 100) : 0;

    // Hitung jumlah grup unik dari field tpqGroup di Student
    const groupResult = await prisma.student.findMany({
      select: { tpqGroup: true },
      distinct: ['tpqGroup'],
    });
    const totalClasses = groupResult.length;
    // Hitung kehadiran hari pertama bulan terpilih (bisa diganti sesuai kebutuhan)
    const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const end = new Date(year, month - 1, 1, 23, 59, 59, 999);
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
