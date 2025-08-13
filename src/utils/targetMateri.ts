// src/utils/targetMateri.ts
// Define Student type locally to avoid importing from a component
export interface Student {
  id: string;
  name: string;
  dateOfBirth?: string;
  schoolLevel?: string;
  level?: string;
  parentName?: string;
  tpqGroup?: string;
  gender?: string;
}
import { calculateDetailedAge } from '@/lib/utils';

// Mapping target materi per usia, dalam bentuk array agar mudah diubah/extend
// Target materi per semester, per kategori
export type Semester = 'Semester 1' | 'Semester 2';
export interface TargetCategory {
  category: string;
  items: string[];
}

const targetMateriByAge: {
  max: number;
  semesters: {
    [key in Semester]?: TargetCategory[];
  };
}[] = [
  {
    max: 4,
    semesters: {
      'Semester 1': [
        { category: 'Surat', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Doa', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
      ],
      'Semester 2': [
        { category: 'Surat', items: ['Al-Falaq'] },
        { category: 'Doa', items: ['Doa Keluar Rumah'] },
      ],
    },
  },
  {
    max: 5,
    semesters: {
      'Semester 1': [
        { category: 'Surat', items: ['Al-Fatihah', 'An-Nas', 'Al-Falaq'] },
        { category: 'Doa', items: ['Doa Mau Makan', 'Doa Mau Tidur', 'Doa Keluar Rumah'] },
      ],
      'Semester 2': [
        { category: 'Surat', items: ['Al-Ikhlas'] },
        { category: 'Doa', items: ['Doa Masuk Rumah'] },
      ],
    },
  },
  {
    max: 6,
    semesters: {
      'Semester 1': [
        { category: 'Surat', items: ['Al-Fatihah', 'An-Nas', 'Al-Falaq', 'Al-Ikhlas'] },
        { category: 'Doa', items: ['Doa Mau Makan', 'Doa Mau Tidur', 'Doa Keluar Rumah', 'Doa Masuk Rumah'] },
      ],
      'Semester 2': [
        { category: 'Surat', items: ['Al-Lahab'] },
        { category: 'Doa', items: ['Doa Setelah Sholat'] },
      ],
    },
  },
  {
    max: Infinity,
    semesters: {
      'Semester 1': [
        { category: 'Surat', items: ['Al-Fatihah', 'An-Nas', 'Al-Falaq', 'Al-Ikhlas', 'Al-Lahab'] },
        { category: 'Doa', items: ['Doa Mau Makan', 'Doa Mau Tidur', 'Doa Keluar Rumah', 'Doa Masuk Rumah', 'Doa Setelah Sholat'] },
      ],
      'Semester 2': [
        { category: 'Surat', items: ['Al-Kafirun'] },
        { category: 'Doa', items: ['Doa Untuk Orang Tua'] },
      ],
    },
  },
];

export function getTargetsForStudent(student?: Student, semester: Semester = 'Semester 1'): TargetCategory[] {
  if (!student || !student.dateOfBirth) return [];
  const { years } = calculateDetailedAge(student.dateOfBirth);
  const found = targetMateriByAge.find(cfg => years <= cfg.max);
  return found && found.semesters[semester] ? found.semesters[semester]! : [];
}
