
import { mockStudents } from '@/lib/mock-data';
import { getTPQHeaderColors } from '@/lib/utils';
import { TPQDashboardPage } from '@/components/tpq/TPQDashboardPage';

const TPQ_GROUP = 'Jatibaru';
const LEVELS = [
  'Pra PAUD',
  'PAUD',
  'Paket A1',
  'Paket A2',
  'Paket B',
];
const mockProgressPerLevel: Record<string, { attendance: number; memorization: number }> = {
  'Pra PAUD': { attendance: 0.91, memorization: 0.62 },
  'PAUD': { attendance: 0.85, memorization: 0.68 },
  'Paket A1': { attendance: 0.88, memorization: 0.72 },
  'Paket A2': { attendance: 0.83, memorization: 0.59 },
  'Paket B': { attendance: 0.79, memorization: 0.55 },
};
const colors = getTPQHeaderColors(TPQ_GROUP);
const info = {
  alamat: 'Jatibaru',
  waktu: '15:30 - 17:00 WIB',
  program: 'Tilawati, Akhlakul Karimah',
};

export default function TpqJatibaru() {
  return (
    <TPQDashboardPage
      tpqGroup={TPQ_GROUP}
      levels={LEVELS}
      mockStudents={mockStudents}
      mockProgressPerLevel={mockProgressPerLevel}
      colors={colors}
      info={info}
    />
  );
}
