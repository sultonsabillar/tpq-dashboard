"use client";




import { mockStudents } from '@/lib/mock-data';
import { getTPQHeaderColors } from '@/lib/utils';
import { TPQDashboardPage } from '@/components/tpq/TPQDashboardPage';

const TPQ_GROUP = 'Desa';
const LEVELS = [
  'Paket C',
  'Paket D',
];
const mockProgressPerLevel: Record<string, { attendance: number; memorization: number }> = {
  'Paket C': { attendance: 0.84, memorization: 0.71 },
  'Paket D': { attendance: 0.78, memorization: 0.66 },
};
const colors = getTPQHeaderColors(TPQ_GROUP);
const info = {
  alamat: 'Desa Jati',
  waktu: '15:30 - 17:00 WIB',
  program: 'Tilawati, Akhlakul Karimah',
};

export default function TpqDesa() {
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
