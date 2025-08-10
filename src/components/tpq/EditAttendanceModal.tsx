import React from 'react';

interface EditAttendanceModalProps {
  open: boolean;
  onClose: () => void;
  form: { studentId: string; date: string; status: string; kegiatan?: string };
  students: { id: string; name: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  setForm: React.Dispatch<React.SetStateAction<{ studentId: string; date: string; status: string; kegiatan?: string }>>;
}

export default function EditAttendanceModal({ open, onClose, form, students, onChange, onSubmit, setForm }: EditAttendanceModalProps) {
  if (!open) return null;
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-4 text-blue-800">Edit Absensi</h2>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-blue-700">Kegiatan</label>
            <select
              name="kegiatan"
              value={form.kegiatan || ''}
              onChange={onChange}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
              required
            >
              <option value="" disabled className="text-blue-700 italic bg-blue-50">Pilih kegiatan</option>
              <option value="KBM">KBM</option>
              <option value="KHQ">KHQ</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-blue-700">Pilih Generus</label>
            <select
              name="studentId"
              value={form.studentId}
              onChange={onChange}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
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
              onChange={onChange}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900 placeholder:text-blue-700 placeholder:italic"
              required
              placeholder="Pilih tanggal absensi"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-blue-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
              required
            >
              <option value="" disabled className="text-blue-700 italic bg-blue-50">Pilih status</option>
              <option value="Hadir">Hadir</option>
              <option value="Izin">Izin</option>
              <option value="Sakit">Sakit</option>
              <option value="Alpa">Alpa</option>
            </select>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow"
            >
              Simpan
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 shadow"
              onClick={onClose}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
