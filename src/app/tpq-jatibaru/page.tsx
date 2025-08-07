"use client";



import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockStudents } from '@/lib/mock-data';
import { Users, UserCheck, TrendingUp } from 'lucide-react';
import { getTPQHeaderColors } from '@/lib/utils';


// Daftar level/kelas di Jatibaru
const LEVELS = [
  'Pra PAUD',
  'PAUD',
  'Paket A1',
  'Paket A2',
  'Paket B',
];

// TPQ Group
const TPQ_GROUP = 'Jatibaru';

// Mock progress per kelas (bisa diambil dari mockStudents jika ingin granular)
const mockProgressPerLevel: Record<string, { attendance: number; memorization: number }> = {
  'Pra PAUD': { attendance: 0.91, memorization: 0.62 },
  'PAUD': { attendance: 0.85, memorization: 0.68 },
  'Paket A1': { attendance: 0.88, memorization: 0.72 },
  'Paket A2': { attendance: 0.83, memorization: 0.59 },
  'Paket B': { attendance: 0.79, memorization: 0.55 },
};

export default function TpqJatibaru() {
  // Get TPQ colors
  const colors = getTPQHeaderColors(TPQ_GROUP);
  // State: level/kelas yang dipilih
  const [selectedLevel, setSelectedLevel] = useState<string>(LEVELS[0]);

  // State: mock absensi (per TPQ)
  const [attendance, setAttendance] = useState<{
    id: string;
    studentId: string;
    date: string;
    status: string;
  }[]>([]);
  const [form, setForm] = useState<{ studentId: string; date: string; status: string }>({ studentId: '', date: '', status: '' });

  // Filter students untuk Jatibaru & level terpilih
  const students = mockStudents.filter(
    s => s.tpqGroup === TPQ_GROUP && s.isActive && s.level === selectedLevel
  );
  const totalSantri = mockStudents.filter(s => s.tpqGroup === TPQ_GROUP && s.isActive).length;
  const totalSantriLevel = students.length;

  // Progress per kelas
  const attendanceProgress = mockProgressPerLevel[selectedLevel]?.attendance ?? 0;
  const memorizationProgress = mockProgressPerLevel[selectedLevel]?.memorization ?? 0;

  // Absensi untuk level terpilih
  const attendanceForLevel = attendance.filter(a => {
    const student = mockStudents.find(s => s.id === a.studentId);
    return student && student.tpqGroup === TPQ_GROUP && student.level === selectedLevel;
  });

  // CRUD handlers
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleAddAttendance() {
    if (!form.studentId || !form.date) return;
    setAttendance(prev => [
      ...prev,
      { id: Date.now().toString(), studentId: form.studentId, date: form.date, status: form.status },
    ]);
    setForm({ studentId: '', date: '', status: '' });
  }
  // Tidak ada edit/update
  function handleDeleteAttendance(id: string) {
    setAttendance(prev => prev.filter(a => a.id !== id));
    setForm({ studentId: '', date: '', status: '' });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${colors.gradient} rounded-2xl p-6 border ${colors.border} mb-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              TPQ <span className={colors.titleColor}>{TPQ_GROUP}</span>
            </h1>
            <p className="text-gray-600 text-lg">
              بِسْمِ اللّهِ الرَّحْمـَنِ الرَّحِيمِ
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Selamat datang di halaman statistik dan progress TPQ {TPQ_GROUP}
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
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Generus */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-60" />
          <CardContent className="relative p-8 pt-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-3">Total Generus</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{totalSantri}</p>
                <p className="text-xs text-gray-500 mb-4">Generus Terdaftar</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generus Aktif */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-60" />
          <CardContent className="relative p-8 pt-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-3">Generus Aktif</p>
                <p className="text-3xl font-bold text-green-700 mb-2">{totalSantri}</p>
                <p className="text-xs text-gray-500 mb-4">Mengaji rutin</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Kehadiran Bulan Ini */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-60" />
          <CardContent className="relative p-8 pt-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-3">Progress Rata-Rata Kehadiran Bulan Ini</p>
                <p className="text-3xl font-bold text-green-700 mb-2">{Math.round(attendanceProgress * 100)}%</p>
                <p className="text-xs text-gray-500 mb-4">Kehadiran bulan ini</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Hapalan Bulan Ini */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-100 opacity-60" />
          <CardContent className="relative p-8 pt-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-3">Progress Rata-Rata Hapalan Bulan Ini</p>
                <p className="text-3xl font-bold text-orange-700 mb-2">{Math.round(memorizationProgress * 100)}%</p>
                <p className="text-xs text-gray-500 mb-4">Target hapalan bulan ini</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="mt-8 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800 font-bold">Informasi TPQ Jatibaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-blue-900 text-base">
            <p><span className="font-semibold">Alamat:</span> Jatibaru, Desa Jati</p>
            <p><span className="font-semibold">Waktu KBM:</span> 15:30 - 17:00 WIB</p>
            <p><span className="font-semibold">Program:</span> Tilawati, Akhlakul Karimah</p>
          </div>
        </CardContent>
      </Card>

      {/* Filter/tab per kelas/level */}
      <div className="mt-8 flex flex-wrap gap-2">
        {LEVELS.map(level => (
          <button
            key={level}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              selectedLevel === level
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
            }`}
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Progress summary per kelas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Kehadiran {selectedLevel}</span>
            <span className="text-2xl font-bold text-green-700">{Math.round(attendanceProgress * 100)}%</span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Hapalan {selectedLevel}</span>
            <span className="text-2xl font-bold text-orange-700">{Math.round(memorizationProgress * 100)}%</span>
          </CardContent>
        </Card>
      </div>

      {/* Tabel Data Generus per kelas */}
      <Card className="mt-4 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800 font-bold">Daftar Generus {selectedLevel} - TPQ Jatibaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">No</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Nama</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Wali</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Tanggal Lahir</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Gender</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Sekolah</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {students.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-blue-50">
                    <td className="px-4 py-2 text-sm text-blue-900 font-semibold">{idx + 1}</td>
                    <td className="px-4 py-2 text-sm text-blue-900">{s.name}</td>
                    <td className="px-4 py-2 text-sm text-blue-900">{s.parentName}</td>
                    <td className="px-4 py-2 text-sm text-blue-900">{s.dateOfBirth}</td>
                    <td className="px-4 py-2 text-sm text-blue-900">{s.gender}</td>
                    <td className="px-4 py-2 text-sm text-blue-900">{s.schoolLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {students.length === 0 && (
              <div className="text-center text-gray-400 py-8">Belum ada data generus untuk level ini.</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* CRUD Absensi per kelas/level */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card Form Tambah Absensi */}
        <Card className="border-0 shadow-lg md:col-span-1">
          <CardHeader>
            <CardTitle className="text-blue-800 font-bold text-base">Tambah Absensi {selectedLevel}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-4"
              onSubmit={e => {
                e.preventDefault();
                handleAddAttendance();
              }}
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-blue-700">Pilih Generus</label>
                <select
                  name="studentId"
                  value={form.studentId}
                  onChange={handleFormChange}
                  className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
                  required
                >
                  <option value="" disabled className="text-blue-700 italic bg-blue-50">Pilih Generus</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-blue-700">Tanggal</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleFormChange}
                  className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900 placeholder:text-blue-700 placeholder:italic"
                  required
                  placeholder="Pilih tanggal absensi"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-blue-700">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
                >
                  <option value="" disabled className="text-blue-700 italic bg-blue-50">Pilih status</option>
                  <option value="Hadir">Hadir</option>
                  <option value="Izin">Izin</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Alpa">Alpa</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow"
              >
                Tambah
              </button>
            </form>
          </CardContent>
        </Card>
        {/* Card Tabel Absensi */}
        <Card className="border-0 shadow-lg md:col-span-2">
          <CardHeader>
            <CardTitle className="text-blue-800 font-bold text-base">Daftar Absensi {selectedLevel}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto bg-white/90 border border-blue-200 rounded-lg shadow p-2">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">No</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Nama</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Tanggal</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {attendanceForLevel.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-400 py-8">Belum ada data absensi untuk level ini.</td>
                    </tr>
                  )}
                  {attendanceForLevel.map((a, idx) => {
                    const s = mockStudents.find(s => s.id === a.studentId);
                    return (
                      <tr key={a.id} className="hover:bg-blue-50">
                        <td className="px-4 py-2 text-sm text-blue-900 font-semibold">{idx + 1}</td>
                        <td className="px-4 py-2 text-sm text-blue-900">{s?.name ?? '-'}</td>
                        <td className="px-4 py-2 text-sm text-blue-900">{a.date}</td>
                        <td className="px-4 py-2 text-sm text-blue-900">{a.status}</td>
                        <td className="px-4 py-2 text-sm">
                          {/* Tidak ada tombol Edit */}
                          <button
                            className="text-xs text-red-600 hover:underline"
                            onClick={() => handleDeleteAttendance(a.id)}
                          >Hapus</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
