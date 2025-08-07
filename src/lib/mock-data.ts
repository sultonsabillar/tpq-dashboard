import { Student, Teacher, Class } from '@/types';

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: 'TPQ/JTL/20150315',
    nomorInduk: 'TPQ/JTL/20150315',
    name: 'Ahmad Fauzan',
    parentName: 'Bapak Ahmad Ridwan',
    dateOfBirth: '2015-03-15',
    age: 10,
    gender: 'Laki-laki',
    tpqGroup: 'Jatilama',
    schoolLevel: 'SD Kelas 4',
    level: 'Paket A2',
    isActive: true
  },
  {
    id: 'TPQ/JTB/20130822',
    nomorInduk: 'TPQ/JTB/20130822',
    name: 'Siti Aisyah',
    parentName: 'Ibu Fatimah Sari',
    dateOfBirth: '2013-08-22',
    age: 12,
    gender: 'Perempuan',
    tpqGroup: 'Jatibaru',
    schoolLevel: 'SD Kelas 6',
    level: 'Paket D',
    isActive: true
  },
  {
    id: 'TPQ/BUM/20141210',
    nomorInduk: 'TPQ/BUM/20141210',
    name: 'Muhammad Rizki',
    parentName: 'Bapak Muhammad Yusuf',
    dateOfBirth: '2014-12-10',
    age: 11,
    gender: 'Laki-laki',
    tpqGroup: 'Bumimas',
    schoolLevel: 'SD Kelas 5',
    level: 'Paket A1',
    isActive: true
  },
  {
    id: 'TPQ/RWC/20160518',
    nomorInduk: 'TPQ/RWC/20160518',
    name: 'Fatimah Azzahra',
    parentName: 'Ibu Khadijah',
    dateOfBirth: '2016-05-18',
    age: 9,
    gender: 'Perempuan',
    tpqGroup: 'Rawacana',
    schoolLevel: 'SD Kelas 3',
    level: 'PAUD',
    isActive: true
  },
  {
    id: 'TPQ/DES/20121125',
    nomorInduk: 'TPQ/DES/20121125',
    name: 'Abdullah Hasan',
    parentName: 'Bapak Hasan Ali',
    dateOfBirth: '2012-11-25',
    age: 13,
    gender: 'Laki-laki',
    tpqGroup: 'Desa',
    schoolLevel: 'SMP Kelas 1',
    level: 'Paket C',
    isActive: true
  }
];

// Mock Teachers Data
export const mockTeachers: Teacher[] = [
  {
    id: 'TCH001',
    name: 'Ustadz Ahmad Ridwan',
    email: 'ahmad.ridwan@tpq.com',
    phoneNumber: '+62812-1111-1111',
    address: 'Jl. Ustadz No. 1, Desa Jati',
    dateOfBirth: '1985-04-12',
    gender: 'Laki-laki',
    specialization: 'Tahfidz Al-Quran',
    isActive: true
  },
  {
    id: 'TCH002',
    name: 'Ustadzah Fatimah Sari',
    email: 'fatimah.sari@tpq.com',
    phoneNumber: '+62813-2222-2222',
    address: 'Jl. Ustadzah No. 2, Desa Jati',
    dateOfBirth: '1988-07-25',
    gender: 'Perempuan',
    specialization: 'Iqro & Tajwid',
    isActive: true
  },
  {
    id: 'TCH003',
    name: 'Ustadz Muhammad Yusuf',
    email: 'muhammad.yusuf@tpq.com',
    phoneNumber: '+62814-3333-3333',
    address: 'Jl. Pengajar No. 3, Desa Jati',
    dateOfBirth: '1982-12-03',
    gender: 'Laki-laki',
    specialization: 'Fiqh & Akhlaq',
    isActive: true
  }
];

// Mock Classes Data
export const mockClasses: Class[] = [
  {
    id: 'CLS001',
    name: 'Kelas Pra PAUD A',
    level: 'Pra PAUD',
    teacherId: 'TCH002',
    schedule: 'Senin, Rabu, Jumat 14:00-15:30',
    capacity: 15,
    currentStudents: 12,
    description: 'Pengenalan huruf hijaiyah dan doa-doa harian'
  },
  {
    id: 'CLS002',
    name: 'Kelas PAUD B',
    level: 'PAUD',
    teacherId: 'TCH002',
    schedule: 'Selasa, Kamis, Sabtu 14:00-15:30',
    capacity: 15,
    currentStudents: 10,
    description: 'Pembelajaran huruf hijaiyah dan doa pendek'
  },
  {
    id: 'CLS003',
    name: 'Kelas Paket A1',
    level: 'Paket A1',
    teacherId: 'TCH001',
    schedule: 'Senin, Rabu, Jumat 15:45-17:15',
    capacity: 20,
    currentStudents: 18,
    description: 'Pembelajaran dasar membaca huruf hijaiyah'
  },
  {
    id: 'CLS004',
    name: 'Kelas Paket A2',
    level: 'Paket A2',
    teacherId: 'TCH001',
    schedule: 'Selasa, Kamis, Sabtu 15:45-17:15',
    capacity: 20,
    currentStudents: 15,
    description: 'Pembelajaran lanjutan dan pengenalan tajwid dasar'
  },
  {
    id: 'CLS005',
    name: 'Kelas Paket D',
    level: 'Paket D',
    teacherId: 'TCH003',
    schedule: 'Senin-Sabtu 16:00-17:30',
    capacity: 25,
    currentStudents: 20,
    description: 'Pembelajaran Al-Quran, tajwid lanjutan, dan tahfidz'
  }
];

// Mock Statistics
export const mockStats = {
  totalStudents: mockStudents.length,
  totalTeachers: mockTeachers.length,
  totalClasses: mockClasses.length,
  activeStudents: mockStudents.filter(s => s.isActive).length,
  genderDistribution: {
    'Laki-laki': mockStudents.filter(s => s.gender === 'Laki-laki').length,
    'Perempuan': mockStudents.filter(s => s.gender === 'Perempuan').length
  },
  tpqGroupDistribution: {
    'Jatilama': mockStudents.filter(s => s.tpqGroup === 'Jatilama').length,
    'Jatibaru': mockStudents.filter(s => s.tpqGroup === 'Jatibaru').length,
    'Bumimas': mockStudents.filter(s => s.tpqGroup === 'Bumimas').length,
    'Rawacana': mockStudents.filter(s => s.tpqGroup === 'Rawacana').length,
    'Desa': mockStudents.filter(s => s.tpqGroup === 'Desa').length
  },
  levelDistribution: {
    'Pra PAUD': mockStudents.filter(s => s.level === 'Pra PAUD').length,
    'PAUD': mockStudents.filter(s => s.level === 'PAUD').length,
    'Paket A1': mockStudents.filter(s => s.level === 'Paket A1').length,
    'Paket A2': mockStudents.filter(s => s.level === 'Paket A2').length,
    'Paket B': mockStudents.filter(s => s.level === 'Paket B').length,
    'Paket C': mockStudents.filter(s => s.level === 'Paket C').length,
    'Paket D': mockStudents.filter(s => s.level === 'Paket D').length
  }
};
