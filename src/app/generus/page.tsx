
"use client";
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Student } from '@/types';
import { getInitials, getLevelBadgeClass, getTPQBadgeClass, calculateDetailedAge } from '@/lib/utils';
import { AddStudentForm } from '@/components/students/add-student-form';
import { EditStudentForm } from '@/components/students/edit-student-form';



export default function GenerusPage() {
  // Helper untuk fetch ulang data students
  const fetchStudents = useCallback(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => {
        // Urutkan dari yang terbaru (createdAt descending)
        const sorted = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setStudents(sorted.map((s: any) => ({
          id: s.id,
          name: s.name,
          parentName: s.parentName,
          dateOfBirth: s.dateOfBirth?.split('T')[0],
          age: s.dateOfBirth ? (new Date().getFullYear() - new Date(s.dateOfBirth).getFullYear()) : 0,
          gender: s.gender === 'Laki-laki' ? 'Laki-laki' : 'Perempuan',
          tpqGroup: s.tpqGroup,
          schoolLevel: s.schoolLevel,
          level: s.level,
          isActive: s.isActive !== undefined ? s.isActive : true,
        })));
      });
  }, []);
  const levels = ['all', 'Pra PAUD', 'PAUD', 'Paket A', 'Paket B', 'Paket C', 'Paket D'];
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  useEffect(() => {
    fetchStudents();
    // Pull-to-refresh: reload data saat visibility berubah (misal, user swipe down di mobile)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchStudents();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [fetchStudents]);

  const addStudent = async (student: Student) => {
    // Hanya kirim field yang valid ke backend
    const { age, nomorInduk, ...studentData } = student;
    // Pastikan dateOfBirth format ISO string
    if (studentData.dateOfBirth) {
      studentData.dateOfBirth = new Date(studentData.dateOfBirth).toISOString();
    }
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      const text = await res.text();
      alert('Gagal menambah generus: ' + text);
      return;
    }
    const newStudent = await res.json();
    fetchStudents(); // langsung fetch ulang agar urutan konsisten
  };
  const updateStudent = async (student: Student) => {
    // Hanya kirim field yang valid ke backend
    const { age, nomorInduk, ...studentData } = student;
    // Pastikan dateOfBirth format ISO string
    if (studentData.dateOfBirth) {
      studentData.dateOfBirth = new Date(studentData.dateOfBirth).toISOString();
    }
    const res = await fetch('/api/students', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    const updated = await res.json();
    setStudents(prev => prev.map(s => s.id === updated.id ? {
      ...updated,
      dateOfBirth: updated.dateOfBirth?.split('T')[0],
      age: updated.dateOfBirth ? (new Date().getFullYear() - new Date(updated.dateOfBirth).getFullYear()) : 0,
      isActive: updated.isActive !== undefined ? updated.isActive : true,
    } : s));
  };
  const deleteStudent = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus generus ini?')) return;
    await fetch('/api/students', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setStudents(prev => prev.filter(s => s.id !== id));
  };
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || student.level === selectedLevel;
    return matchesSearch && matchesLevel && student.isActive;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Generus</h1>
          <p className="text-gray-600">Kelola data generus TPQ</p>
        </div>
        <div className="hidden md:flex gap-2 items-center">
          <AddStudentForm
            onSave={addStudent}
            trigger={
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Generus
              </Button>
            }
          />
        </div>
      </div>
      {/* Tombol tambah generus khusus mobile */}
      <div className="block md:hidden mt-3">
        <AddStudentForm
          onSave={addStudent}
          trigger={
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Generus
            </Button>
          }
        />
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-gray-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 mb-4 px-1 sm:px-0">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-600" />
              </div>
              <Input
                placeholder="Cari generus atau nama wali..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 h-11 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm text-gray-900 placeholder:text-gray-500 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {/* Level Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto sm:min-w-[200px] pl-1 sm:pl-0">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="hidden sm:inline-block">
                  <Filter className="h-4 w-4 text-blue-600" />
                </span>
                <span className="text-sm font-medium hidden sm:inline text-gray-700">Level:</span>
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 h-11 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm min-w-[120px] text-gray-900 font-medium"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'Semua Level' : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Search Results Info */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
            <div className="text-sm text-gray-600">
              Menampilkan <span className="font-semibold text-blue-600">{filteredStudents.length}</span> dari <span className="font-semibold text-gray-800">{students.filter(s => s.isActive).length}</span> generus
            </div>
            {searchTerm && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Hasil untuk:</span>
                <span className="text-xs bg-blue-500 text-white px-2.5 py-1 rounded-full font-medium shadow-sm">
                  {searchTerm}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Daftar Generus
            </CardTitle>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredStudents.length} generus
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">Tidak ada generus yang ditemukan</p>
                <p className="text-sm text-gray-400 mt-1">
                  Tambah generus baru untuk memulai
                </p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 bg-white"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
                    <div className="flex flex-row md:flex-row items-start gap-3 flex-1">
                      {/* Avatar */}
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        student.gender === 'Laki-laki' 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-br from-pink-500 to-pink-600'
                      }`}>
                        <span className="text-sm font-semibold text-white">
                          {getInitials(student.name)}
                        </span>
                      </div>
                      {/* Student Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mb-1">
                          <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                            {student.name}
                          </h3>
                          <span className={`inline-flex items-center justify-center px-1 md:px-2 py-0.5 text-sm font-medium rounded-full ${getLevelBadgeClass(student.level || '')}`}>{student.level}</span>
                        </div>
                        <div className="mb-1">
                          <span className="text-xs text-gray-400 select-all font-mono">{student.id}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-700">Wali:</span>
                            <span className="truncate">{student.parentName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-700">TPQ:</span>
                            <span className={`inline-flex items-center justify-center px-1 md:px-2 py-0.5 text-sm font-medium rounded-full ${getTPQBadgeClass(student.tpqGroup || '')}`}>{student.tpqGroup}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-700">Info:</span>
                            <span>
                              {student.dateOfBirth ? (() => {
                                const { years, months, days } = calculateDetailedAge(student.dateOfBirth);
                                let result = '';
                                if (years > 0) result += years + ' tahun ';
                                if (months > 0) result += months + ' bulan ';
                                if (days > 0) result += days + ' hari';
                                return result.trim() || '-';
                              })() : '-'}
                              {' • '}{student.gender}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 md:col-span-2">
                            <span className="font-medium text-gray-700">Sekolah:</span>
                            <span>{student.schoolLevel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-2 md:gap-3 mt-3 md:mt-0">
                      {student && (
                        <EditStudentForm
                          student={student}
                          onSave={updateStudent}
                          trigger={
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="px-4 py-2 bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 text-blue-600 hover:text-blue-700 shadow-sm transition-all duration-200 font-medium w-full md:w-auto"
                            >
                              Edit
                            </Button>
                          }
                        />
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteStudent(student.id)}
                        className="px-4 py-2 bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300 text-red-600 hover:text-red-700 shadow-sm transition-all duration-200 font-medium w-full md:w-auto"
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
