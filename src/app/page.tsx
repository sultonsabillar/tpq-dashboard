'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, BookOpen, TrendingUp } from 'lucide-react';
import { getLevelBadgeClass } from '@/lib/utils';
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

  const [levelStats, setLevelStats] = useState<{ level: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      // Fetch dashboard stats from API (real DB)
      try {
        const res = await fetch('/api/dashboard/stats');
        const data = await res.json();
        setStats(data);
      } catch (e) {
        console.error('Error fetching dashboard stats:', e);
      }
      // Fetch level stats
      try {
        const res = await fetch('/api/students/levels');
        if (res.ok) {
          const data = await res.json();
          setLevelStats(data);
        }
      } catch (e) {
        console.error('Error fetching level stats:', e);
      }
      setLoading(false);
    }
    fetchStats();
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
      title: 'Generus Desa Bulan Ini',
      value: `${stats.attendanceRate}%`,
      subtitle: 'Rata-rata kehadiran Generus Desa',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      change: '+3%',
      changeType: 'increase',
    },
    {
      title: 'Progress Hafalan',
      //value: `${stats.attendanceRate}%`,
      subtitle: 'Rata-rata Hapalan Generus Desa',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Pra PAUD', icon: Users },
          { label: 'PAUD', icon: Users },
          { label: 'Paket A', icon: Users },
          { label: 'Paket B', icon: Users },
          { label: 'Paket C', icon: Users },
          { label: 'Paket D', icon: Users },
        ].map((item) => {
          const stat = levelStats.find((l) => l.level === item.label);
          const Icon = item.icon;
          const badgeClass = getLevelBadgeClass(item.label);
          return (
            <Card key={item.label} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-3 ${badgeClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className={`text-2xl font-bold mb-1 ${badgeClass}`}>{stat ? stat.count : 0}</p>
                <p className="text-sm text-gray-600 font-medium">Generus {item.label}</p>
              </CardContent>
            </Card>
          );
        })}
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
