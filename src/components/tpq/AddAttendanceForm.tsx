import React from 'react';

interface AddAttendanceFormProps {
  form: { studentId: string; date: string; status: string; kegiatan?: string };
  students: { id: string; name: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddAttendanceForm({ form, students, onChange, onSubmit }: AddAttendanceFormProps) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-blue-700">Kegiatan</label>
        <select
          name="kegiatan"
          value={form.kegiatan || ''}
          onChange={onChange}
          className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
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
          onChange={onChange}
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
          onChange={onChange}
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
  );
}
