import React from 'react';

interface AddProgressFormProps {
  form: { studentId: string; tanggal: string; materi: string; capaian: string };
  students: { id: string; name: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddProgressForm({ form, students, onChange, onSubmit }: AddProgressFormProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
          name="tanggal"
          value={form.tanggal}
          onChange={onChange}
          className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900 placeholder:text-blue-700 placeholder:italic"
          required
          placeholder="Pilih tanggal capaian"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-blue-700">Materi</label>
        <input
          type="text"
          name="materi"
          value={form.materi}
          onChange={onChange}
          className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
          required
          placeholder="Contoh: Juz 30, Surat Al-Fatihah, dll"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-blue-700">Keterangan Capaian</label>
        <textarea
          name="capaian"
          value={form.capaian}
          onChange={onChange}
          className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-sm text-base font-normal text-blue-900"
          required
          placeholder="Contoh: Hafal, Belum Hafal, Sudah Setoran, dll"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 shadow"
      >
        Tambah Progress
      </button>
    </form>
  );
}
