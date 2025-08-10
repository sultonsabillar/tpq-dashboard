import React from 'react';
import { X, Calendar, Users, ClipboardEdit } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with blur and darken */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-all" aria-hidden="true" />
      {/* Dialog content */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-0 overflow-hidden animate-in">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-2 border-b border-gray-100">
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
            <ClipboardEdit className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-blue-900 flex-1">Edit Absensi</h2>
          <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition" onClick={onClose} aria-label="Tutup">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="flex flex-col gap-4 px-6 py-6" onSubmit={onSubmit}>
          {/* Kegiatan */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-blue-700 flex items-center gap-1">
              <ClipboardEdit className="h-3 w-3 text-blue-500" /> Kegiatan
            </label>
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
          {/* Generus */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-blue-700 flex items-center gap-1">
              <Users className="h-3 w-3 text-blue-500" /> Pilih Generus
            </label>
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
          {/* Tanggal */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-blue-700 flex items-center gap-1">
              <Calendar className="h-3 w-3 text-blue-500" /> Tanggal
            </label>
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
          {/* Status */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-blue-700 flex items-center gap-1">
              Status
            </label>
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
          {/* Footer */}
          <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
            <button
              type="submit"
              className="px-6 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow"
            >
              Simpan
            </button>
            <button
              type="button"
              className="px-6 py-2 rounded bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 shadow"
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
