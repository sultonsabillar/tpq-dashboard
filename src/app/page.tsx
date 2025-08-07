'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, BookOpen, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalTeachers: number;
  totalClasses: number;
  todayAttendance: number;
  attendanceRate: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    todayAttendance: 0,
    attendanceRate: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    // For now, using mock data
    setTimeout(() => {
      setStats({
        totalStudents: 120,
        activeStudents: 115,
        totalTeachers: 8,
        totalClasses: 12,
        todayAttendance: 102,
        attendanceRate: 85,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total Generus',
      value: stats.totalStudents,
      subtitle: 'Generus terdaftar',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      change: '+5',
      changeType: 'increase',
    },
    {
      title: 'Generus Aktif',
      value: stats.activeStudents,
      subtitle: 'Mengaji rutin',
      icon: UserCheck,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-100',
      change: '+2',
      changeType: 'increase',
    },
    {
      title: 'Total Ustadz',
      value: stats.totalTeachers,
      subtitle: 'Pengajar aktif',
      icon: BookOpen,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      change: '0',
      changeType: 'stable',
    },
    {
      title: 'Progress Hafalan',
      value: `${stats.attendanceRate}%`,
      subtitle: 'Rata-rata santri',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-100',
      change: '+3%',
      changeType: 'increase',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Selamat datang di sistem manajemen TPQ</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Assalamu'alaikum, Dashboard TPQ 
              <span className="text-green-600">Desa Jati</span>
            </h1>
            <p className="text-gray-600 text-lg">
              بِسْمِ اللّهِ الرَّحْمـَنِ الرَّحِيمِ
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Selamat datang di sistem manajemen Taman Pendidikan Al-Quran
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-gray-500">Hari ini</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-60`}></div>
            <CardContent className="relative p-8 pt-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-3">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-xs text-gray-500 mb-4">{stat.subtitle}</p>
                  
                  {/* Change indicator */}
                  <div className="flex items-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.changeType === 'increase' 
                        ? 'text-green-700 bg-green-100' 
                        : stat.changeType === 'decrease'
                        ? 'text-red-700 bg-red-100'
                        : 'text-gray-700 bg-gray-100'
                    }`}>
                      {stat.changeType === 'increase' && '↗'} 
                      {stat.changeType === 'decrease' && '↘'} 
                      {stat.changeType === 'stable' && '→'} 
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">bulan ini</span>
                  </div>
                </div>
                
                {/* Icon with gradient background */}
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10"></div>
              <div className="absolute -right-2 -bottom-2 w-12 h-12 rounded-full bg-white/20"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generus Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-1">{stats.activeStudents}</p>
            <p className="text-sm text-gray-600 font-medium">Total Generus Aktif</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-1">12</p>
            <p className="text-sm text-gray-600 font-medium">Generus Paket D</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 000 6h1m1-6a3 3 0 013 3v2a3 3 0 01-3 3M9 10V9a3 3 0 113 0v1M9 10V9a3 3 0 113 0v1" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-purple-600 mb-1">8</p>
            <p className="text-sm text-gray-600 font-medium">Generus Pra PAUD & PAUD</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Ahmad Fadil hadir di kelas Iqro 3</p>
                  <p className="text-xs text-gray-500">2 menit yang lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Siswa baru: Fatimah Az-Zahra terdaftar</p>
                  <p className="text-xs text-gray-500">15 menit yang lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Jadwal kelas Al-Quran diperbarui</p>
                  <p className="text-xs text-gray-500">1 jam yang lalu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jadwal Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-sm font-medium">Iqro 1 - Ustadzah Siti</p>
                <p className="text-xs text-gray-500">08:00 - 09:30</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm font-medium">Iqro 3 - Ustadz Ahmad</p>
                <p className="text-xs text-gray-500">10:00 - 11:30</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm font-medium">Al-Quran - Ustadzah Fatimah</p>
                <p className="text-xs text-gray-500">13:00 - 14:30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Harian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.todayAttendance}</p>
              <p className="text-sm text-gray-600">Kehadiran Hari Ini</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.totalClasses}</p>
              <p className="text-sm text-gray-600">Kelas Aktif</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.totalTeachers}</p>
              <p className="text-sm text-gray-600">Guru Pengajar</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
