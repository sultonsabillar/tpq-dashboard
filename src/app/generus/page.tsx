
"use client";
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Plus, Search, Filter } from 'lucide-react';

import { Student } from '@/types';
import { getInitials, getLevelBadgeClass, getTPQBadgeClass } from '@/lib/utils';
import { StudentForm } from '@/components/students/student-form';
// import { StudentForm } from '@/components/students/student-form';


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
        <div className="flex gap-2 items-center">
          <StudentForm
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

      {/* Filters */}
      <Card className="shadow-sm border border-gray-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-4">
            {/* Search Input */}
            <div className="relative flex-1">
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
            <div className="flex items-center gap-2 sm:min-w-[200px]">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium hidden sm:inline text-gray-700">Level:</span>
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="flex-1 sm:flex-initial px-3 py-2 h-11 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm min-w-[120px] text-gray-900 font-medium"
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
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
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
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {student.name}
                          </h3>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${getLevelBadgeClass(student.level || '')}`}>
                            {student.level}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          {/* ID/Nomor Induk dihapus sesuai permintaan */}
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-700">Wali:</span>
                            <span className="truncate">{student.parentName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-700">TPQ:</span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTPQBadgeClass(student.tpqGroup || '')}`}>
                              {student.tpqGroup}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-700">Info:</span>
                            <span>{student.dateOfBirth ? (new Date().getFullYear() - new Date(student.dateOfBirth).getFullYear()) : '-'} tahun • {student.gender}</span>
                          </div>
                          <div className="flex items-center gap-1 md:col-span-2">
                            <span className="font-medium text-gray-700">Sekolah:</span>
                            <span>{student.schoolLevel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 ml-6 flex-shrink-0">
                      {student && (
                        <StudentForm
                          student={student}
                          onSave={updateStudent}
                          trigger={
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="px-4 py-2 bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 text-blue-600 hover:text-blue-700 shadow-sm transition-all duration-200 font-medium"
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
                        className="px-4 py-2 bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300 text-red-600 hover:text-red-700 shadow-sm transition-all duration-200 font-medium"
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
