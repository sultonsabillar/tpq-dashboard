import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Student } from '@/types';
import { User, Users, Calendar, MapPin, BookOpen, School } from 'lucide-react';
import { generateId, LEVELS, GENDER_OPTIONS, TPQ_GROUPS, SCHOOL_LEVELS, generateNomorInduk, calculateAge, getLevelBadgeClass, getTPQBadgeClass } from '@/lib/utils';

interface AddStudentFormProps {
  onSave: (student: Student) => void;
  trigger: React.ReactNode;
}

export function AddStudentForm({ onSave, trigger }: AddStudentFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    parentName: '',
    dateOfBirth: '',
    gender: undefined,
    tpqGroup: undefined,
    schoolLevel: '',
    level: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const nomorInduk = generateNomorInduk(formData.tpqGroup!, formData.dateOfBirth!);
      const age = calculateAge(formData.dateOfBirth!);
      const studentData: Student = {
        id: generateId('STD'),
        nomorInduk,
        age,
        ...formData as Omit<Student, 'id' | 'nomorInduk' | 'age'>,
        isActive: true,
      };
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(studentData);
      setOpen(false);
      setFormData({
        name: '',
        parentName: '',
        dateOfBirth: '',
        gender: undefined,
        tpqGroup: undefined,
        schoolLevel: '',
        level: undefined,
      });
    } catch (error) {
      alert('Gagal menyimpan data siswa. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Student, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
  <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-white p-0 sm:p-6 w-screen h-screen max-w-full max-h-screen fixed top-0 left-0 rounded-none z-50 flex flex-col overflow-hidden">
        <DialogHeader className="space-y-3 pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg border border-green-100">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-900">Tambah Generus Baru</span>
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm leading-relaxed">
            Isi formulir di bawah untuk menambahkan generus baru ke dalam sistem TPQ.
          </DialogDescription>
          {formData.level && formData.tpqGroup && (
            <div className="flex items-center gap-2 pt-2">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getLevelBadgeClass(formData.level as string)}`}>
                {formData.level}
              </span>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTPQBadgeClass(formData.tpqGroup as string)}`}>
                {formData.tpqGroup}
              </span>
            </div>
          )}
        </DialogHeader>
  <form onSubmit={handleSubmit} className="space-y-6 py-4 flex-1 overflow-y-auto max-h-screen px-4 sm:px-0">
          {/* Section 1: Data Pribadi */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Data Pribadi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  <User className="h-3 w-3 text-blue-500" />
                  Nama Generus *
                </label>
                <Input
                  required
                  value={formData.name || ''}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm text-gray-900 placeholder:text-gray-400"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  <Users className="h-3 w-3 text-blue-500" />
                  Nama Wali *
                </label>
                <Input
                  required
                  value={formData.parentName || ''}
                  onChange={e => handleChange('parentName', e.target.value)}
                  placeholder="Nama ayah/ibu/wali"
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm text-gray-900 placeholder:text-gray-400"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-blue-500" />
                  Tanggal Lahir *
                </label>
                <Input
                  required
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={e => handleChange('dateOfBirth', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Jenis Kelamin *</label>
                <select
                  required
                  value={formData.gender || ''}
                  onChange={e => handleChange('gender', e.target.value as 'Laki-laki' | 'Perempuan')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-gray-900"
                >
                  <option value="" disabled>Pilih jenis kelamin</option>
                  {GENDER_OPTIONS.map(gender => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Section 2: Data TPQ */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <div className="p-1.5 bg-green-50 rounded-lg">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Data TPQ</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Kelompok TPQ *</label>
                <select
                  required
                  value={formData.tpqGroup || ''}
                  onChange={e => handleChange('tpqGroup', e.target.value as typeof TPQ_GROUPS[number])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white shadow-sm text-gray-900"
                >
                  <option value="" disabled>Pilih kelompok TPQ</option>
                  {TPQ_GROUPS.map(group => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  <BookOpen className="h-3 w-3 text-green-500" />
                  Level Paket *
                </label>
                <select
                  required
                  value={formData.level || ''}
                  onChange={e => handleChange('level', e.target.value as typeof LEVELS[number])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white shadow-sm text-gray-900"
                >
                  <option value="" disabled>Pilih level paket</option>
                  {LEVELS.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Section 3: Data Sekolah */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <div className="p-1.5 bg-purple-50 rounded-lg">
                <School className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Data Sekolah</h3>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Kelas Sekolah *</label>
              <select
                required
                value={formData.schoolLevel}
                onChange={(e) => handleChange('schoolLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 bg-white shadow-sm text-gray-900"
              >
                <option value="" disabled>Pilih kelas sekolah</option>
                {SCHOOL_LEVELS.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter className="flex gap-3 pt-6 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800 bg-white shadow-sm font-medium"
            >
              Batal
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 text-white font-medium shadow-sm bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Menyimpan...
                </div>
              ) : (
                'Tambah Generus'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
