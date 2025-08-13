"use client";
import React, { useState } from 'react';
import EditAttendanceModal from './EditAttendanceModal';
import AddAttendanceForm from './AddAttendanceForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, TrendingUp } from 'lucide-react';

export interface Student {
  id: string;
  name: string;
  parentName: string;
  dateOfBirth: string;
  gender: string;
  schoolLevel: string;
  tpqGroup: string;
  isActive: boolean;
  level: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: string;
  activityType?: string;
}

interface TPQDashboardPageProps {
  tpqGroup: string;
  levels: string[];
  students: Student[];
  attendance: Attendance[];
  colors: {
    gradient: string;
    border: string;
    titleColor: string;
  };
  info: {
    alamat: string;
    waktu: string;
    program: string;
  };
}

export function TPQDashboardPage({
  tpqGroup,
  levels,
  students,
  attendance: attendanceProp,
  colors,
  info,
}: TPQDashboardPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>(levels[0]);
  const [form, setForm] = useState<{ studentId: string; date: string; status: string; kegiatan?: string }>({ studentId: '', date: '', status: '', kegiatan: '' });
  const [attendance, setAttendance] = useState<Attendance[]>(attendanceProp);
  // State & handler edit absensi (sederhana, bisa dikembangkan modal/form)
  const [editingAttendance, setEditingAttendance] = useState<Attendance | null>(null);
  function handleEditAttendance(a: Attendance) {
    setEditingAttendance(a);
  }

  // State untuk form edit
  const [editForm, setEditForm] = useState<{ studentId: string; date: string; status: string; kegiatan?: string }>({ studentId: '', date: '', status: '', kegiatan: '' });
  // Sync editForm saat editingAttendance berubah
  React.useEffect(() => {
    if (editingAttendance) {
      setEditForm({
        studentId: editingAttendance.studentId,
        date: editingAttendance.date,
        status: editingAttendance.status,
        kegiatan: editingAttendance.activityType || '',
      });
    }
  }, [editingAttendance]);

  async function handleUpdateAttendance() {
    if (!editingAttendance) return;
    try {
      const res = await fetch(`/api/attendance/${editingAttendance.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: editForm.studentId,
          date: editForm.date,
          status: editForm.status,
          activityType: editForm.kegiatan,
        }),
      });
      const data = await res.json();
      if (res.ok && data.attendance) {
        setAttendance(prev => prev.map(a => a.id === editingAttendance.id ? data.attendance : a));
        setEditingAttendance(null);
      } else {
        alert('Gagal update absensi: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Gagal update absensi: ' + err);
    }
  }
  // ...existing code...
  // Dropdown bulan: selalu tampilkan 12 bulan dalam setahun (Januari-Desember tahun berjalan)
  const now = new Date();
  const currentYearNum = now.getFullYear();
  const monthOptions = Array.from({ length: 12 }, (_, i) => `${currentYearNum}-${String(i + 1).padStart(2, '0')}`);
  // Label bulan (tanpa tahun)
  function getMonthLabel(val: string) {
    const [, month] = val.split('-');
    return new Date(2000, Number(month) - 1).toLocaleString('id-ID', { month: 'long' });
  }
  // State bulan terpilih
  const currentMonthKey = `${currentYearNum}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  // Default ke bulan berjalan (current month)
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthKey);

  // Filter students untuk TPQ & level terpilih
  const studentsFiltered = students.filter(
    s => s.tpqGroup === tpqGroup && s.isActive && s.level === selectedLevel
  );
  // Total generus aktif = semua generus aktif di group ini, TIDAK termasuk Pra PAUD
  const totalSantri = students.filter(s => s.tpqGroup === tpqGroup && s.isActive).length;
  const totalSantriAktif = students.filter(s => s.tpqGroup === tpqGroup && s.isActive && s.level !== 'Pra PAUD').length;
  const totalSantriLevel = studentsFiltered.length;

  // Progress per kelas (attendance & memorization dummy, can be replaced with real logic)
  // Exclude Pra PAUD from progress calculation
  const currentMonth = Number(selectedMonth.split('-')[1]);
  const currentYear = Number(selectedMonth.split('-')[0]);
  // Progress rata-rata kehadiran seluruh generus aktif (bukan Pra PAUD) di TPQ ini
  const studentsAllActiveNoPraPaud = students.filter(s => s.tpqGroup === tpqGroup && s.isActive && s.level !== 'Pra PAUD');
  const attendancePercentsAll = studentsAllActiveNoPraPaud.map(s => {
    const absensiBulanIni = attendance.filter(a => {
      if (a.studentId !== s.id) return false;
      if (!('activityType' in a) || a.activityType !== 'KBM') return false;
      const tgl = new Date(a.date);
  return tgl.getMonth() + 1 === currentMonth && tgl.getFullYear() === currentYear && a.status === 'Hadir';
    });
    const totalHariAbsen = attendance.filter(a => {
      if (a.studentId !== s.id) return false;
      if (!('activityType' in a) || a.activityType !== 'KBM') return false;
      const tgl = new Date(a.date);
  return tgl.getMonth() + 1 === currentMonth && tgl.getFullYear() === currentYear;
    }).length;
    return totalHariAbsen > 0 ? absensiBulanIni.length / totalHariAbsen : 0;
  });
  const attendanceProgressAllActive = attendancePercentsAll.length > 0 ? attendancePercentsAll.reduce((a, b) => a + b, 0) / attendancePercentsAll.length : 0;

  // Progress rata-rata kehadiran untuk level terpilih (kecuali Pra PAUD)
  const studentsFilteredNoPraPaud = studentsFiltered.filter(s => s.level !== 'Pra PAUD');
  const attendancePercents = studentsFilteredNoPraPaud.map(s => {
    const absensiBulanIni = attendance.filter(a => {
      if (a.studentId !== s.id) return false;
      if (!('activityType' in a) || a.activityType !== 'KBM') return false;
      const tgl = new Date(a.date);
  return tgl.getMonth() + 1 === currentMonth && tgl.getFullYear() === currentYear && a.status === 'Hadir';
    });
    const totalHariAbsen = attendance.filter(a => {
      if (a.studentId !== s.id) return false;
      if (!('activityType' in a) || a.activityType !== 'KBM') return false;
      const tgl = new Date(a.date);
  return tgl.getMonth() + 1 === currentMonth && tgl.getFullYear() === currentYear;
    }).length;
    return totalHariAbsen > 0 ? absensiBulanIni.length / totalHariAbsen : 0;
  });
  const attendanceProgress = attendancePercents.length > 0 ? attendancePercents.reduce((a, b) => a + b, 0) / attendancePercents.length : 0;

  // Progress kehadiran KHQ untuk level terpilih
  const attendancePercentsKHQ = studentsFilteredNoPraPaud.map(s => {
    const absensiBulanIni = attendance.filter(a => {
      if (a.studentId !== s.id) return false;
      if (!('activityType' in a) || a.activityType !== 'KHQ') return false;
      const tgl = new Date(a.date);
  return tgl.getMonth() + 1 === currentMonth && tgl.getFullYear() === currentYear && a.status === 'Hadir';
    });
    const totalHariAbsen = attendance.filter(a => {
      if (a.studentId !== s.id) return false;
      if (!('activityType' in a) || a.activityType !== 'KHQ') return false;
      const tgl = new Date(a.date);
  return tgl.getMonth() + 1 === currentMonth && tgl.getFullYear() === currentYear;
    }).length;
    return totalHariAbsen > 0 ? absensiBulanIni.length / totalHariAbsen : 0;
  });
  const attendanceProgressKHQ = attendancePercentsKHQ.length > 0 ? attendancePercentsKHQ.reduce((a, b) => a + b, 0) / attendancePercentsKHQ.length : 0;
  // Memorization progress: placeholder (0), exclude Pra PAUD
  const memorizationProgress = 0;

  // Absensi untuk level terpilih dan bulan terpilih
  const attendanceForLevel = attendance.filter(a => {
    const student = students.find(s => s.id === a.studentId);
    if (!student || student.tpqGroup !== tpqGroup || student.level !== selectedLevel) return false;
    const tgl = new Date(a.date);
    return tgl.getMonth() + 1 === currentMonth && tgl.getFullYear() === currentYear;
  });

  // CRUD handlers (local state)
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  async function handleAddAttendance() {
    if (!form.studentId || !form.date || !form.status || !form.kegiatan) return;
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: form.studentId,
          date: form.date,
          status: form.status,
          activityType: form.kegiatan,
        }),
      });
      const data = await res.json();
      if (res.ok && data.attendance) {
        setAttendance(prev => [...prev, data.attendance]);
        setForm({ studentId: '', date: '', status: '', kegiatan: '' });
      } else {
        alert('Gagal menambah absensi: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Gagal menambah absensi: ' + err);
    }
  }
  function handleDeleteAttendance(id: string) {
    if (!confirm('Yakin ingin menghapus absensi ini?')) return;
    fetch('/api/attendance', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(async res => {
        if (res.ok) {
          setAttendance(prev => prev.filter(a => a.id !== id));
        } else {
          const err = await res.json();
          alert('Gagal menghapus absensi: ' + (err.error || 'Unknown error'));
        }
      });
  }

  return (
    <div className="space-y-6">
      <EditAttendanceModal
        open={!!editingAttendance}
        onClose={() => setEditingAttendance(null)}
        form={editForm}
        setForm={setEditForm}
        students={students}
        onChange={e => setEditForm(f => ({ ...f, [e.target.name]: e.target.value }))}
        onSubmit={e => {
          e.preventDefault();
          handleUpdateAttendance();
        }}
      />
      {/* Header */}
      <div className={`${colors.gradient} rounded-2xl p-6 border ${colors.border} mb-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              TPQ <span className={colors.titleColor}>{tpqGroup}</span>
            </h1>
            <p className="text-gray-600 text-lg">بِسْمِ اللّهِ الرَّحْمـَنِ الرَّحِيمِ</p>
            <p className="text-gray-500 text-sm mt-1">Selamat datang di halaman statistik dan progress TPQ {tpqGroup}</p>
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
        {/* Generus Aktif (tidak termasuk Pra PAUD) */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-60" />
          <CardContent className="relative p-8 pt-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-3">Generus Aktif</p>
                <p className="text-3xl font-bold text-green-700 mb-2">{totalSantriAktif}</p>
                {tpqGroup.toLowerCase() !== 'desa' && (
                  <p className="text-xs text-gray-500 mb-4">Mengaji rutin (tanpa Pra PAUD)</p>
                )}
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Progress Kehadiran Bulan Ini (semua generus aktif, tanpa Pra PAUD) */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-60" />
          <CardContent className="relative p-8 pt-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-3">Kehadiran KBM Generus {tpqGroup}</p>
                <p className="text-3xl font-bold text-purple-700 mb-2">{Math.round(attendanceProgressAllActive * 100)}%</p>
                {tpqGroup.toLowerCase() !== 'desa' && (
                  <p className="text-xs text-gray-500 mb-4">
                    Kehadiran bulan {getMonthLabel(selectedMonth)} (tanpa Pra PAUD)
                  </p>
                )}
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
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
          <CardTitle className="text-blue-800 font-bold">Informasi TPQ {tpqGroup}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-blue-900 text-base">
            <p><span className="font-semibold">Alamat:</span> {info.alamat}</p>
            <p><span className="font-semibold">Waktu KBM:</span> {info.waktu}</p>
            <p><span className="font-semibold">Program:</span> {info.program}</p>
          </div>
        </CardContent>
      </Card>

      {/* Filter/tab per kelas/level */}
      <div className="mt-8 flex flex-wrap gap-2">
        {levels.map(level => (
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
      {selectedLevel !== 'Pra PAUD' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Kehadiran KBM {selectedLevel}</span>
              <span className="text-2xl font-bold text-green-700">{Math.round(attendanceProgress * 100)}%</span>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Kehadiran KHQ {selectedLevel}</span>
              <span className="text-2xl font-bold text-purple-700">{Math.round(attendanceProgressKHQ * 100)}%</span>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Hapalan {selectedLevel}</span>
              <span className="text-2xl font-bold text-orange-700">{Math.round(memorizationProgress * 100)}%</span>
            </CardContent>
          </Card>
        </div>
      )}


      {/* Tabel Data Generus per kelas, dengan persentase kehadiran bulan ini */}
      <Card className="mt-4 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800 font-bold">Daftar Generus {selectedLevel} - TPQ {tpqGroup}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Dropdown bulan untuk tabel generus */}
          <div className="mb-4 flex items-center gap-2">
            <label className="text-xs font-semibold text-blue-700">Bulan</label>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              style={{ color: '#1d4ed8', backgroundColor: '#eff6ff' }}
            >
              {monthOptions.map(val => (
                <option key={val} value={val} className="text-blue-700 italic bg-blue-50">{getMonthLabel(val)}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">No</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Nama</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Wali</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Umur</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Gender</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Sekolah</th>
                  {(() => {
                    const [year, month] = selectedMonth.split('-');
                    const selectedMonthLabel = new Date(Number(year), Number(month) - 1).toLocaleString('id-ID', { month: 'long' });
                    return <>
                      <th className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase">KBM {selectedMonthLabel}</th>
                      <th className="px-4 py-2 text-left text-xs font-bold text-purple-700 uppercase">KHQ {selectedMonthLabel}</th>
                    </>;
                  })()}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {studentsFiltered.map((s, idx) => {

                  // KBM - hitung semua status
                  const absensiKBMBulanIni = attendance.filter(a => {
                    if (a.studentId !== s.id) return false;
                    if (!('activityType' in a) || a.activityType !== 'KBM') return false;
                    const tgl = new Date(a.date);
                    return tgl.getMonth() + 1 === currentMonth && tgl.getFullYear() === currentYear;
                  });
                  const countKBM = {
                    Hadir: absensiKBMBulanIni.filter(a => a.status === 'Hadir').length,
                    Izin: absensiKBMBulanIni.filter(a => a.status === 'Izin').length,
                    Sakit: absensiKBMBulanIni.filter(a => a.status === 'Sakit').length,
                    Alpa: absensiKBMBulanIni.filter(a => a.status === 'Alpa').length,
                  };
                  const totalKBM = absensiKBMBulanIni.length;
                  const persenKBM = totalKBM > 0 ? Math.round((countKBM.Hadir / totalKBM) * 100) : 0;

                  // KHQ - hitung semua status
                  const absensiKHQBulanIni = attendance.filter(a => {
                    if (a.studentId !== s.id) return false;
                    if (!('activityType' in a) || a.activityType !== 'KHQ') return false;
                    const tgl = new Date(a.date);
                    return tgl.getMonth() + 1 === currentMonth && tgl.getFullYear() === currentYear;
                  });
                  const countKHQ = {
                    Hadir: absensiKHQBulanIni.filter(a => a.status === 'Hadir').length,
                    Izin: absensiKHQBulanIni.filter(a => a.status === 'Izin').length,
                    Sakit: absensiKHQBulanIni.filter(a => a.status === 'Sakit').length,
                    Alpa: absensiKHQBulanIni.filter(a => a.status === 'Alpa').length,
                  };
                  const totalKHQ = absensiKHQBulanIni.length;
                  const persenKHQ = totalKHQ > 0 ? Math.round((countKHQ.Hadir / totalKHQ) * 100) : 0;

                  return (
                    <tr key={s.id} className="hover:bg-blue-50">
                      <td className="px-4 py-2 text-sm text-blue-900 font-semibold">{idx + 1}</td>
                      <td className="px-4 py-2 text-sm text-blue-900">{s.name}</td>
                      <td className="px-4 py-2 text-sm text-blue-900">{s.parentName}</td>
                      <td className="px-4 py-2 text-sm text-blue-900">{(() => {
                        const dob = new Date(s.dateOfBirth);
                        const now = new Date();
                        let age = now.getFullYear() - dob.getFullYear();
                        const m = now.getMonth() - dob.getMonth();
                        if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
                        return age;
                      })()}</td>
                      <td className="px-4 py-2 text-sm text-blue-900">{s.gender}</td>
                      <td className="px-4 py-2 text-sm text-blue-900">{s.schoolLevel}</td>
                      <td className="px-4 py-2 text-sm text-green-700 font-bold">
                        {persenKBM}%
                        <div className="text-xs text-gray-500 font-normal">
                          ({countKBM.Hadir} hadir, {countKBM.Izin} izin, {countKBM.Sakit} sakit, {countKBM.Alpa} alpa / {totalKBM} pertemuan)
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-purple-700 font-bold">
                        {persenKHQ}%
                        <div className="text-xs text-gray-500 font-normal">
                          ({countKHQ.Hadir} hadir, {countKHQ.Izin} izin, {countKHQ.Sakit} sakit, {countKHQ.Alpa} alpa / {totalKHQ} pertemuan)
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {studentsFiltered.length === 0 && (
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
            <AddAttendanceForm
              form={form}
              students={studentsFiltered}
              onChange={e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))}
              onSubmit={e => {
                e.preventDefault();
                handleAddAttendance();
              }}
            />
          </CardContent>
        </Card>
        {/* Card Tabel Absensi */}
        <Card className="border-0 shadow-lg md:col-span-2">
          <CardHeader>
            <CardTitle className="text-blue-800 font-bold text-base flex items-center gap-2">
              <span>Daftar Absensi {selectedLevel}</span>
              {selectedMonth && (
                <span className="text-blue-800 font-bold text-base">
                  (Bulan {getMonthLabel(selectedMonth)})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto bg-white/90 border border-blue-200 rounded-lg shadow p-2" style={{ maxHeight: 400, overflowY: 'auto' }}>
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">No</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Nama</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Tanggal</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Kegiatan</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {attendanceForLevel.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-400 py-8">Belum ada data absensi untuk bulan ini.</td>
                    </tr>
                  )}
                  {attendanceForLevel.map((a, idx) => {
                    const s = students.find(s => s.id === a.studentId);
                    return (
                      <tr key={a.id} className="hover:bg-blue-50">
                        <td className="px-4 py-2 text-sm text-blue-900 font-semibold">{idx + 1}</td>
                        <td className="px-4 py-2 text-sm text-blue-900">{s?.name ?? '-'}</td>
                        <td className="px-4 py-2 text-sm text-blue-900">{a.date}</td>
                        <td className="px-4 py-2 text-sm text-blue-900">{a.activityType ?? '-'}</td>
                        <td className="px-4 py-2 text-sm text-blue-900">{a.status}</td>
                        <td className="px-4 py-2 text-sm flex gap-2">
                          <button
                            className="text-xs text-blue-600 hover:underline"
                            onClick={() => handleEditAttendance(a)}
                          >Edit</button>
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
