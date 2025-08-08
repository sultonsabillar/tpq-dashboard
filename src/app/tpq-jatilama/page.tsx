
import { getTPQHeaderColors } from '../../lib/utils';
import { TPQDashboardPage, Student, Attendance } from '../../components/tpq/TPQDashboardPage';
import { prisma } from '../../../lib/prisma';

const TPQ_GROUP = 'Jatilama';
const LEVELS = [
  'Pra PAUD',
  'PAUD',
  'Paket A',
  'Paket B',
];
const colors = getTPQHeaderColors(TPQ_GROUP);
const info = {
  alamat: 'Jatilama, Desa Jati',
  waktu: '15:30 - 17:00 WIB',
  program: 'Tilawati, Akhlakul Karimah',
};

export default async function TpqJatilama() {
  const students: Student[] = (await prisma.student.findMany()).map((s: any) => ({
    ...s,
    dateOfBirth: s.dateOfBirth.toISOString().split('T')[0],
  }));
  const attendance: Attendance[] = (await prisma.attendance.findMany()).map((a: any) => ({
    ...a,
    date: a.date.toISOString().split('T')[0],
  }));
  return (
    <TPQDashboardPage
      tpqGroup={TPQ_GROUP}
      levels={LEVELS}
      students={students}
      attendance={attendance}
      colors={colors}
      info={info}
    />
  );
}

