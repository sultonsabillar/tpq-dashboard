import { type ClassValue, clsx } from 'clsx';
import { format, parseISO, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}${timestamp}${random}`;
}

export function getLevelBadgeClass(level: string): string {
  switch (level) {
    case 'Paket D':
      return 'bg-green-100 text-green-800';
    case 'Paket C':
      return 'bg-blue-100 text-blue-800';
    case 'Paket B':
      return 'bg-yellow-100 text-yellow-800';
    case 'Paket A':
      return 'bg-purple-100 text-purple-800';
    case 'PAUD':
      return 'bg-pink-100 text-pink-800';
    case 'Pra PAUD':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getTPQBadgeClass(tpqGroup: string): string {
  switch (tpqGroup) {
    case 'Jatilama':
      return 'bg-blue-100 text-blue-800';
    case 'Jatibaru':
      return 'bg-green-100 text-green-800';
    case 'Bumimas':
      return 'bg-purple-100 text-purple-800';
    case 'Rawacana':
      return 'bg-orange-100 text-orange-800';
    case 'Desa':
      return 'bg-cyan-100 text-cyan-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getTPQHeaderColors(tpqGroup: string): { 
  gradient: string; 
  border: string; 
  titleColor: string; 
  buttonColors: string;
  tableColors: string;
  formColors: string;
} {
  switch (tpqGroup) {
    case 'Jatilama':
      return {
        gradient: 'bg-gradient-to-r from-blue-50 to-blue-100',
        border: 'border-blue-100',
        titleColor: 'text-blue-600',
        buttonColors: 'bg-blue-600 text-white border-blue-600 focus:ring-blue-300 bg-white text-blue-700 border-blue-200 hover:bg-blue-50',
        tableColors: 'text-blue-800 bg-blue-50 text-blue-700 divide-blue-200 hover:bg-blue-50 text-blue-900 divide-blue-100 bg-blue-100 border-blue-200',
        formColors: 'text-blue-800 text-blue-700 border-blue-300 focus:ring-blue-200 focus:border-blue-500 text-blue-900 text-blue-700 bg-blue-600 hover:bg-blue-700'
      };
    case 'Jatibaru':
      return {
        gradient: 'bg-gradient-to-r from-green-50 to-green-100',
        border: 'border-green-100',
        titleColor: 'text-green-600',
        buttonColors: 'bg-green-600 text-white border-green-600 focus:ring-green-300 bg-white text-green-700 border-green-200 hover:bg-green-50',
        tableColors: 'text-green-800 bg-green-50 text-green-700 divide-green-200 hover:bg-green-50 text-green-900 divide-green-100 bg-green-100 border-green-200',
        formColors: 'text-green-800 text-green-700 border-green-300 focus:ring-green-200 focus:border-green-500 text-green-900 text-green-700 bg-green-600 hover:bg-green-700'
      };
    case 'Bumimas':
      return {
        gradient: 'bg-gradient-to-r from-purple-50 to-purple-100',
        border: 'border-purple-100',
        titleColor: 'text-purple-600',
        buttonColors: 'bg-purple-600 text-white border-purple-600 focus:ring-purple-300 bg-white text-purple-700 border-purple-200 hover:bg-purple-50',
        tableColors: 'text-purple-800 bg-purple-50 text-purple-700 divide-purple-200 hover:bg-purple-50 text-purple-900 divide-purple-100 bg-purple-100 border-purple-200',
        formColors: 'text-purple-800 text-purple-700 border-purple-300 focus:ring-purple-200 focus:border-purple-500 text-purple-900 text-purple-700 bg-purple-600 hover:bg-purple-700'
      };
    case 'Rawacana':
      return {
        gradient: 'bg-gradient-to-r from-orange-50 to-orange-100',
        border: 'border-orange-100',
        titleColor: 'text-orange-600',
        buttonColors: 'bg-orange-600 text-white border-orange-600 focus:ring-orange-300 bg-white text-orange-700 border-orange-200 hover:bg-orange-50',
        tableColors: 'text-orange-800 bg-orange-50 text-orange-700 divide-orange-200 hover:bg-orange-50 text-orange-900 divide-orange-100 bg-orange-100 border-orange-200',
        formColors: 'text-orange-800 text-orange-700 border-orange-300 focus:ring-orange-200 focus:border-orange-500 text-orange-900 text-orange-700 bg-orange-600 hover:bg-orange-700'
      };
    case 'Desa':
      return {
        gradient: 'bg-gradient-to-r from-cyan-50 to-cyan-100',
        border: 'border-cyan-100',
        titleColor: 'text-cyan-600',
        buttonColors: 'bg-cyan-600 text-white border-cyan-600 focus:ring-cyan-300 bg-white text-cyan-700 border-cyan-200 hover:bg-cyan-50',
        tableColors: 'text-cyan-800 bg-cyan-50 text-cyan-700 divide-cyan-200 hover:bg-cyan-50 text-cyan-900 divide-cyan-100 bg-cyan-100 border-cyan-200',
        formColors: 'text-cyan-800 text-cyan-700 border-cyan-300 focus:ring-cyan-200 focus:border-cyan-500 text-cyan-900 text-cyan-700 bg-cyan-600 hover:bg-cyan-700'
      };
    default:
      return {
        gradient: 'bg-gradient-to-r from-gray-50 to-gray-100',
        border: 'border-gray-100',
        titleColor: 'text-gray-600',
        buttonColors: 'bg-gray-600 text-white border-gray-600 focus:ring-gray-300 bg-white text-gray-700 border-gray-200 hover:bg-gray-50',
        tableColors: 'text-gray-800 bg-gray-50 text-gray-700 divide-gray-200 hover:bg-gray-50 text-gray-900 divide-gray-100 bg-gray-100 border-gray-200',
        formColors: 'text-gray-800 text-gray-700 border-gray-300 focus:ring-gray-200 focus:border-gray-500 text-gray-900 text-gray-700 bg-gray-600 hover:bg-gray-700'
      };
  }
}

export function formatDate(date: string | Date, formatStr: string = 'dd MMMM yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '-';
    return format(dateObj, formatStr, { locale: id });
  } catch {
    return '-';
  }
}

export function formatTime(time: string): string {
  try {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  } catch {
    return time;
  }
}

export function calculateAge(dateOfBirth: string): number {
  try {
    const birthDate = parseISO(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  } catch {
    return 0;
  }
}

export function getAttendanceColor(status: string): string {
  const colors = {
    'Hadir': 'bg-green-100 text-green-800',
    'Tidak Hadir': 'bg-red-100 text-red-800',
    'Izin': 'bg-yellow-100 text-yellow-800',
    'Sakit': 'bg-blue-100 text-blue-800',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

export function getProgressColor(evaluation: string): string {
  const colors = {
    'Sangat Baik': 'bg-green-100 text-green-800',
    'Baik': 'bg-blue-100 text-blue-800',
    'Cukup': 'bg-yellow-100 text-yellow-800',
    'Perlu Bimbingan': 'bg-red-100 text-red-800',
  };
  return colors[evaluation as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+62${cleaned.substring(1)}`;
  }
  return phone;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

export function calculateAttendanceRate(attendanceRecords: any[]): number {
  if (attendanceRecords.length === 0) return 0;
  
  const presentCount = attendanceRecords.filter(
    record => record.status === 'Hadir'
  ).length;
  
  return Math.round((presentCount / attendanceRecords.length) * 100);
}

export function getTodayDate(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function isToday(date: string): boolean {
  return date === getTodayDate();
}

export function getDayOfWeek(date: string): string {
  try {
    const dateObj = parseISO(date);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[dateObj.getDay()];
  } catch {
    return '-';
  }
}

export const DAYS_OF_WEEK = [
  'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'
] as const;

export const LEVELS = [
  'Pra PAUD', 'PAUD', 'Paket A', 'Paket B', 'Paket C', 'Paket D'
] as const;

export const TPQ_GROUPS = [
  'Jatilama', 'Jatibaru', 'Bumimas', 'Rawacana', 'Desa'
] as const;

export const SCHOOL_LEVELS = [
  'Belum Sekolah', 'PAUD', 'TK', 'SD 1', 'SD 2', 'SD 3', 'SD 4', 'SD 5', 'SD 6', 
  'SMP 1', 'SMP 2', 'SMP 3', 
  'SMA 1', 'SMA 2', 'SMA 3', 
  'SMK 1', 'SMK 2', 'SMK 3', 
  'Kuliah', 'Lainnya'
] as const;

// Generate Nomor Induk Generus: TPQ Code + Birth Date (DDMMYYYY)
export function generateNomorInduk(tpqGroup: string, dateOfBirth: string): string {
  const tpqCodes: Record<string, string> = {
    'Jatilama': '01',
    'Jatibaru': '02', 
    'Bumimas': '03',
    'Rawacana': '04',
    'Desa': '05'
  };

  try {
    const birthDate = parseISO(dateOfBirth);
    const day = birthDate.getDate().toString().padStart(2, '0');
    const month = (birthDate.getMonth() + 1).toString().padStart(2, '0');
    const year = birthDate.getFullYear().toString();
    
    const tpqCode = tpqCodes[tpqGroup] || '01';
    return `${tpqCode}${day}${month}${year}`;
  } catch {
    return '0101011990'; // fallback
  }
}

export const ATTENDANCE_STATUS = [
  'Hadir', 'Tidak Hadir', 'Izin', 'Sakit'
] as const;

export const PROGRESS_EVALUATIONS = [
  'Sangat Baik', 'Baik', 'Cukup', 'Perlu Bimbingan'
] as const;

export const GENDER_OPTIONS = [
  'Laki-laki', 'Perempuan'
] as const;
