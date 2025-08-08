import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed students
  const students = await prisma.student.createMany({
    data: [
      {
        name: 'Ahmad Fauzi',
        parentName: 'Bapak Fauzi',
        dateOfBirth: new Date('2012-05-10'),
        gender: 'Laki-laki',
        schoolLevel: 'SD',
        tpqGroup: 'Jatilama',
        level: 'Paket A',
        isActive: true,
      },
      {
        name: 'Siti Aminah',
        parentName: 'Ibu Aminah',
        dateOfBirth: new Date('2013-08-21'),
        gender: 'Perempuan',
        schoolLevel: 'SD',
        tpqGroup: 'Desa',
        level: 'Paket C',
        isActive: true,
      },
      {
        name: 'Budi Santoso',
        parentName: 'Pak Santoso',
        dateOfBirth: new Date('2011-11-15'),
        gender: 'Laki-laki',
        schoolLevel: 'SMP',
        tpqGroup: 'Bumimas',
        level: 'Paket B',
        isActive: true,
      },
      {
        name: 'Nur Aini',
        parentName: 'Bu Aini',
        dateOfBirth: new Date('2014-02-02'),
        gender: 'Perempuan',
        schoolLevel: 'SD',
        tpqGroup: 'Rawacana',
        level: 'Paket A',
        isActive: true,
      },
    ],
  });

  // Get all students
  const allStudents = await prisma.student.findMany();

  // Seed attendance for each student (random 5 days in August 2025)
  for (const student of allStudents) {
    for (let i = 1; i <= 5; i++) {
      await prisma.attendance.create({
        data: {
          studentId: student.id,
          date: new Date(`2025-08-0${i}`),
          status: i % 2 === 0 ? 'Hadir' : 'Izin',
        },
      });
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
