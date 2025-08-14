import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getLevelBadgeClass, getTPQBadgeClass, calculateDetailedAge } from '@/lib/utils';
import { getTargetsForStudent } from '@/utils/targetMateri';
import type { Semester, TargetCategory } from '@/utils/targetMateri';

interface Student {
  id: string;
  name: string;
  dateOfBirth?: string;
  schoolLevel?: string;
  level?: string;
  parentName?: string;
  tpqGroup?: string;
  gender?: string;
}

// HAPUS deklarasi properti props yang berdiri sendiri di sini, cukup gunakan type AddProgressFormProps di bawah
type AddProgressFormProps = {
  form: { studentId: string; tanggal: string };
  students: Student[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  targetStatus: { [key: string]: string };
  setTargetStatus: Dispatch<SetStateAction<{ [key: string]: string }>>;
  selectedSemester: Semester;
  setSelectedSemester: Dispatch<SetStateAction<Semester>>;
  targetCategories: TargetCategory[];
  setTargetCategories: Dispatch<SetStateAction<TargetCategory[]>>;
  progressMateriList: any[];
};

// (semua logic dipindah ke dalam komponen di bawah)
export default function AddProgressForm({
  form,
  students,
  onChange,
  onSubmit,
  targetStatus,
  setTargetStatus,
  selectedSemester,
  setSelectedSemester,
  targetCategories,
  setTargetCategories,
  progressMateriList = []
}: AddProgressFormProps) {
  // Ambil data siswa terpilih
  const selectedStudent = students.find(s => s.id === form.studentId);
  // Update targetCategories jika student/semester berubah
  React.useEffect(() => {
    if (selectedStudent && (selectedSemester === 'Semester 1' || selectedSemester === 'Semester 2')) {
      const cats = getTargetsForStudent(selectedStudent, selectedSemester);
      setTargetCategories(cats);
      // Reset status target jika student/semester berubah
      const allTargets = cats.flatMap(cat => cat.items);
      setTargetStatus(Object.fromEntries(allTargets.map(t => [t, ''])));
    } else {
      setTargetCategories([]);
      setTargetStatus({});
    }
  }, [selectedStudent, selectedSemester, setTargetCategories, setTargetStatus]);
  function handleTargetChange(targetName: string, value: string) {
    setTargetStatus(prev => ({ ...prev, [targetName]: value }));
  }
    return (
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-blue-700 mb-4 mt-2 md:mt-4">Form Progress Materi</h2>
          <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
          {/* Student Info */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 mb-1 mt-2 md:mt-4 justify-between">
              <div className="flex flex-1 items-center gap-3">
                <label className="text-lg font-bold text-black whitespace-nowrap">Generus</label>
                <select
                  name="studentId"
                  value={students.some(s => s.id === form.studentId) ? form.studentId : ''}
                  onChange={onChange}
                  className="flex-1 px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
                  required
                >
                  <option value="" disabled className="text-blue-700 italic bg-blue-50">Pilih Generus</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <label className="text-lg font-bold text-black mb-0 whitespace-nowrap">Semester</label>
                <select
                  value={selectedSemester}
                  onChange={e => setSelectedSemester(e.target.value as Semester)}
                  className="min-w-[140px] px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
                >
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                </select>
              </div>
            </div>
            {/* Student details below select */}
            {selectedStudent && (
              <div className="flex-1 min-w-0">
                <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mb-1">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                    {selectedStudent.name}
                  </h3>
                  <span className={`inline-flex items-center justify-center px-1 md:px-2 py-0.5 text-sm font-medium rounded-full ${getLevelBadgeClass(selectedStudent.level || '')}`}>{selectedStudent.level || '-'}</span>
                </div>
                <div className="mb-1">
                  <span className="text-xs text-gray-400 select-all font-mono">{selectedStudent.id}</span>
                </div>
                <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">Wali:</span>
                    <span className="truncate">{selectedStudent.parentName || '-'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">Usia:</span>
                    <span>
                      {selectedStudent.dateOfBirth ? (() => {
                        const { years, months, days } = calculateDetailedAge(selectedStudent.dateOfBirth);
                        let result = '';
                        if (years > 0) result += years + ' tahun ';
                        if (months > 0) result += months + ' bulan ';
                        if (days > 0) result += days + ' hari';
                        return result.trim() || '-';
                      })() : '-'}
                      {' • '}{selectedStudent.gender || '-'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">Sekolah:</span>
                    <span>{selectedStudent.schoolLevel || '-'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">TPQ:</span>
                    <span className={`inline-flex items-center justify-center px-1 md:px-2 py-0.5 text-sm font-medium rounded-full ${getTPQBadgeClass(selectedStudent.tpqGroup || '')}`}>{selectedStudent.tpqGroup || '-'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            {/* Semester sudah di atas, tidak perlu di sini */}
            <label className="text-lg font-bold text-black mb-1">Target Materi</label>
            <div className="flex flex-col gap-2">
              {(!targetCategories || targetCategories.length === 0) && (
                <span className="text-sm text-gray-400 italic">Pilih siswa dan semester untuk melihat target materi</span>
              )}
              {Array.isArray(targetCategories) && targetCategories.map(category => (
                <div key={category.category} className="mb-2">
                  <div className="font-bold text-green-700 mb-1">{category.category}</div>
                  {category.items.map(target => {
                    // Cari status dari DB jika ada
                    const safeList = Array.isArray(progressMateriList) ? progressMateriList : [];
                    const dbItem = safeList.find(
                      (item) => item.category === category.category && item.target === target
                    );
                    // UX: jika user sudah mengubah (ada di targetStatus dan tidak kosong), pakai itu. Jika tidak, pakai dari DB
                    const value = (targetStatus[target] !== undefined && targetStatus[target] !== '')
                      ? targetStatus[target]
                      : (dbItem ? dbItem.status : '');
                    return (
                      <div key={target} className="flex items-center gap-2 border-b border-blue-50 pb-2">
                        <span className="flex-1 text-base text-blue-900 font-semibold">{target}</span>
                        <select
                          value={value}
                          onChange={e => handleTargetChange(target, e.target.value)}
                          className="px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-sm text-blue-900"
                          style={{
                            backgroundColor:
                              value === 'Tercapai' ? '#22c55e' : // green-500
                              value === 'Belum Tercapai' ? '#facc15' : // yellow-400
                              value === '' ? '#d1d5db' : undefined, // gray-300
                            color:
                              value === 'Tercapai' ? '#fff' :
                              value === 'Belum Tercapai' ? '#7c5700' :
                              value === '' ? '#374151' : undefined,
                          }}
                        >
                          <option value="" disabled className="text-gray-700 bg-gray-300">Belum Di Ajarkan</option>
                          <option value="Tercapai" className="text-white bg-green-500">Tercapai</option>
                          <option value="Belum Tercapai" className="text-yellow-900 bg-yellow-400">Belum Tercapai</option>
                        </select>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 shadow"
          >
            Simpan Progress
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
