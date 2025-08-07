// Types and interfaces for TPQ Dashboard

export interface Student {
  id: string;
  nomorInduk: string; // Nomor Induk Generus (TPQ code + birth date)
  name: string;
  parentName: string; // Nama Wali
  dateOfBirth: string;
  age: number; // Umur calculated
  gender: 'Laki-laki' | 'Perempuan';
  tpqGroup: 'Jatilama' | 'Jatibaru' | 'Bumimas' | 'Rawacana' | 'Desa'; // Kelompok TPQ
  schoolLevel: string; // Kelas Sekolah (TK, SD, SMP, SMA, dst)
  level: 'Pra PAUD' | 'PAUD' | 'Paket A1' | 'Paket A2' | 'Paket B' | 'Paket C' | 'Paket D'; // Level Paket
  isActive: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: 'Laki-laki' | 'Perempuan';
  specialization: string;
  hireDate?: string;
  isActive: boolean;
  classIds?: string[];
}

export interface Class {
  id: string;
  name: string;
  level: 'Pra PAUD' | 'PAUD' | 'Paket A1' | 'Paket A2' | 'Paket B' | 'Paket C' | 'Paket D';
  teacherId: string;
  schedule: string; // Simplified for frontend development
  capacity: number;
  currentStudents: number;
  description?: string;
  isActive?: boolean;
}

export interface ClassSchedule {
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  startTime: string;
  endTime: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'Hadir' | 'Tidak Hadir' | 'Izin' | 'Sakit';
  notes?: string;
  recordedBy: string;
  recordedAt: string;
}

export interface Progress {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  surah?: string;
  ayah?: string;
  page?: number;
  evaluation: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan';
  notes?: string;
  teacherId: string;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  credentials: {
    client_email: string;
    private_key: string;
  };
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalTeachers: number;
  totalClasses: number;
  todayAttendance: number;
  attendanceRate: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
