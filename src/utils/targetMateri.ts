// src/utils/targetMateri.ts
// Define Student type locally to avoid importing from a component
export interface Student {
  id: string;
  name: string;
  dateOfBirth?: string;
  schoolLevel?: string;
  level?: string;
  parentName?: string;
  tpqGroup?: string;
  gender?: string;
}
import { calculateDetailedAge } from '@/lib/utils';

// Mapping target materi per usia, dalam bentuk array agar mudah diubah/extend
// Target materi per semester, per kategori
export type Semester = 'Semester 1' | 'Semester 2';
export interface TargetCategory {
  category: string;
  items: string[];
}

const targetMateriByAge: {
  max: number;
  semesters: {
    [key in Semester]?: TargetCategory[];
  };
}[] = [
  {
    max: 5,
    semesters: {
        'Semester 1': [
        { category: 'Tilawati', items: ['Melafalkan huruf hijaiyah', 'Mengucapkan dua huruf hijaiyah berharokat fathah', 'Menulis huruf tunggal hijaiyah', 'Menulis angka Arab'] },
        { category: 'Hafalan Surat', items: ['Surat Al-Fatihah', 'Surat An-Nas', 'Surat Al-Falaq', 'Surat Al-Ikhlas'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul Husna (1–10)', 'Doa Sebelum Tidur', 'Doa Setelah Bangun Tidur', 'Doa Akan Makan', 'Doa Selesai Makan'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman, Rukun Islam dan Ihsan', 'Pengertian Qur’an dan Hadits Jama’ah', 'Thoharoh dan Sholat'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah', 'Tri Sukses Generus', 'Enam Thobiat Luhur Jamaah'] },
        { category: 'Praktek Ibadah', items: ['Wudhu beserta doa', 'Sholat beserta bacaan', 'Menjaga kesucian', 'Tata cara buang air kecil dan besar', 'Mensucikan najis', 'Menghafal doa'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormati Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Di Tempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan'] }
        ],
        'Semester 2': [
        { category: 'Tilawati', items: ['Membaca Tilawaty PAUD 1', 'Menulis Tilawaty PAUD'] },
        { category: 'Hafalan Surat', items: ['Surat Al-Lahab', 'Surat An-Nashr'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul Husna (1–20)', 'Doa Kebaikan Dunia Akhirat', 'Doa untuk Kedua Orang Tua', 'Doa Masuk WC', 'Doa Keluar WC'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman', 'Rukun Islam', 'Ihsan'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah', 'Praktek Ibadah (Bacaan Sholat)'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormati Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Di Tempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan'] }
    ]
    },
  },
  {
    max: 6,
    semesters: {
        'Semester 1': [
        { category: 'Tilawati', items: ['Membaca huruf sambung', 'Membaca angka Arab', 'Menulis huruf sambung (depan, tengah, belakang)', 'Menulis angka Arab'] },
        { category: 'Hafalan Surat', items: ['Surat An-Nas', 'Surat Al-Falaq', 'Surat Al-Ikhlas', 'Surat Al-Kafirun', 'Surat Al-Kautsar', 'Surat Al-Ma’un', 'Surat Al-Quraisy'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul husna (1-30)', 'Doa & Dzikir sesudah sholat', 'Doa Ketetapan Iman', 'Doa Minta Ilmu yang Manfaat', 'Doa Minta Ilham yang Baik', 'Doa Masuk Rumah', 'Doa Keluar Rumah'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman, Rukun Islam dan Ihsan', 'Pengertian Qur’an dan Hadits Jama’ah', 'Thoharoh dan Sholat', 'Taat Ulil Amri', 'Hukum Halal dan Haram', 'Puasa Ramadhan'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Enam Alam Kehidupan Manusia', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah', 'Halal dan Haram'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormat Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Ditempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan'] }
    ],
        'Semester 2': [
        { category: 'Tilawati', items: ['Membaca tilawaty 2', 'Menulis tilawaty 2'] },
        { category: 'Hafalan Surat', items: ['Surat Al-Kautsar', 'Surat Al-Ma’un', 'Surat Al-Quraisy', 'Surat Al-Fiil'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul husna (1-40)', 'Doa Pagi dan Sore', 'Doa Masuk Masjid', 'Doa Keluar Masjid', 'Doa Memakai Pakaian', 'Doa Ketika Berbuka Puasa'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman', 'Rukun Islam', 'Ihsan', 'Pengertian Qur’an dan Hadits Jama’ah', 'Thoharoh dan Sholat'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah', 'Praktek Ibadah (Bacaan Wudhu dan Sholat, Dzikir Sesudah Sholat)'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormat Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Ditempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan', 'Terhadap Ulil Amri', 'Ketika Bertamu/Diajak Bertamu dan Kedatangan Tamu', 'Ketika Berpakaian', 'Ketika Tidur', 'Ketika Menguap', 'Ketika Bersin'] }
    ],
    },
  },
  {
    max: 7,
    semesters: {
        'Semester 1': [
        { category: 'Tilawati', items: ['Membaca tilawaty 3', 'Menulis tilawaty 3'] },
        { category: 'Hafalan Surat', items: ['Surat Al-Adiyat', 'Surat Al-Zalzalah'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul husna (1-50)', 'Doa Ketika Ada Angin Kencang'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman, Rukun Islam dan Ihsan', 'Pengertian Qur’an dan Hadits Jama’ah', 'Thoharoh dan Sholat', 'Wajibnya Taat dan Haramnya Maksiat', 'Hukum Halal dan Haram', 'Puasa Ramadhan'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah', 'Praktek Ibadah (Bacaan Wudhu dan Sholat, Dzikir Sesudah Sholat)'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormat Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Ditempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan'] }
    ],
        'Semester 2': [
        { category: 'Tilawati', items: ['Membaca tilawaty 4', 'Menulis tilawaty'] },
        { category: 'Hafalan Surat', items: ['Surat Al-Adiyat', 'Surat Al-Zalzalah'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul husna (1-60)', 'Doa Ketika Ada Angin Kencang'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman', 'Rukun Islam', 'Ihsan', 'Pengertian Qur’an dan Hadits Jama’ah', 'Thoharoh dan Sholat', 'Pengetahuan Wajibnya Taat dan Haramnya Maksiat', 'Pengetahuan Hukum Halal dan Haram', 'Puasa Ramadhan'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah', 'Praktek Ibadah (Bacaan Wudhu dan Sholat, Dzikir Sesudah Sholat)'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormat Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Ditempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan', 'Terhadap Ulil Amri', 'Ketika Bertamu/Diajak Bertamu dan Kedatangan Tamu', 'Ketika Berpakaian', 'Ketika Tidur', 'Ketika Menguap', 'Ketika Bersin'] }
    ],
    },
  },
  {
    max: 8,
    semesters: {
            'Semester 1': [
        { category: 'Tilawati', items: ['Membaca tilawaty 5', 'Menulis tilawaty 5', 'Menulis Pegon bukan baku'] },
        { category: 'Hafalan Surat', items: ['Surat Al-Qadr'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul husna (1-70)', 'Doa Lailatul Qadr', 'Doa Masuk Pasar', 'Doa Berlindung dari Syirik', 'Doa Berlindung dari Siksa Kubur'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman, Rukun Islam dan Ihsan', 'Pengertian Qur’an dan Hadits Jama’ah', 'Thoharoh dan Sholat', 'Pengetahuan Wajibnya Taat dan Haramnya Maksiat', 'Pengetahuan Hukum Halal dan Haram', 'Puasa Ramadhan', 'Keutamaan dan Pembatal Puasa', 'Hukum Mahrom'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah dan Praktek Ibadah'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormat Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Ditempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan'] }
    ],
    'Semester 2': [
        { category: 'Tilawati', items: ['Membaca tilawaty 6', 'Menulis tilawaty', 'Menulis Pegon bukan baku'] },
        { category: 'Hafalan Surat', items: ['Surat Al-Qadr'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul husna (1-80)', 'Doa Lailatul Qadr', 'Doa Masuk Pasar', 'Doa Berlindung dari Syirik', 'Doa Berlindung dari Siksa Kubur'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman', 'Rukun Islam', 'Ihsan', 'Pengertian Qur’an dan Hadits Jama’ah', 'Thoharoh dan Sholat', 'Pengetahuan Wajibnya Taat dan Haramnya Maksiat', 'Pengetahuan Hukum Halal dan Haram', 'Puasa Ramadhan', 'Keutamaan dan Hal yang Membatalkan Puasa', 'Hukum Mahrom'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah dan Praktek Ibadah'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormat Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Ditempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan', 'Terhadap Kerabat', 'Terhadap Tetangga', 'Bersepeda', 'Ketika Makan Bersama', 'Mencari Ilmu'] }
    ],
    },
  },
  {
    max: 9,
    semesters: {
        'Semester 1': [
        { category: 'Tilawati', items: ['Membaca tilawaty 7', 'Menulis tilawaty 7', 'Menulis Pegon bukan baku'] },
        { category: 'Hafalan Surat', items: ['Surat Al-Bayyinah'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul husna (1-90)', 'Doa Keluar Rumah', 'Doa Naik Kendaraan', 'Doa Turun Kendaraan', 'Doa Memakai Pakaian Baru'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman, Rukun Islam dan Ihsan', 'Pengertian Qur’an dan Hadits Jama’ah', 'Thoharoh dan Sholat', 'Wajibnya Taat dan Haramnya Maksiat', 'Hukum Halal dan Haram', 'Puasa Ramadhan', 'Keutamaan dan Hal yang Membatalkan Puasa', 'Hukum Mahrom', 'Fiqih Sederhana tentang Zakat'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah dan Praktek Ibadah'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormat Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Ditempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan'] }
    ],
        'Semester 2': [
        { category: 'Tilawati', items: ['Bacaan Al-Qur’an juz 1 dan 2', 'Tajwid', 'Makna Pegon'] },
        { category: 'Hafalan Surat', items: ['Surat Al-Tiin'] },
        { category: 'Hafalan Doa Harian', items: ['Asmaul husna (1-99)', 'Doa Agar Bisa Bersyukur', 'Doa Berlindung dari Jeleknya Pendengaran, Ucapan, dan Penglihatan', 'Doa Berlindung dari Sifat Pelit dan Penakut'] },
        { category: 'Keilmuan', items: ['Dasar-dasar Akidah', 'Rukun Iman', 'Rukun Islam', 'Ihsan', 'Pengertian Qur’an dan Hadits Jama’ah', 'Kemurnian Ibadah', 'Wajibnya Taat dan Haramnya Maksiat', 'Hukum Halal dan Haram', 'Thoharoh dan Sholat'] },
        { category: 'Kefahaman Agama', items: ['Faham Surga Neraka', 'Faham Al-Qur’an dan Al-Hadits', 'Faham Jamaah dan Praktek Ibadah'] },
        { category: 'Kemandirian', items: ['Kemandirian Pribadi', 'Kemandirian dalam Keluarga', 'Kemandirian dalam Lingkungan Jamaah / Sekolah'] },
        { category: 'Akhlak', items: ['Pribadi', 'Keluarga', 'Ulil Amri, Guru dan Mubaligh/ot', 'Masyarakat', 'Lingkungan'] },
        { category: 'Tata Krama', items: ['Kepada Kedua Orang Tua', 'Menghormat Saudara', 'Menghormati Guru dan Mubaligh/ot', 'Bergaul dengan Teman', 'Etika di Masjid', 'Ditempat Pengajian / Sekolah', 'Terhadap Alam Lingkungan', 'Terhadap Ulil Amri', 'Terhadap Kerabat', 'Terhadap Tetangga', 'Bersepeda', 'Ketika Makan Bersama', 'Mencari Ilmu'] }
    ],
    },
  },
  {
    max: 10,
    semesters: {
       'Semester 1': [
        { category: 'Tilawati', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Hafalan Surat', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Hafalan Doa Harian', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Keilmuan', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Kefahaman Agama', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Kemandirian', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Akhlak', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Tata Krama', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
      ],
      'Semester 2': [
        { category: 'Tilawati', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Hafalan Surat', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Hafalan Doa Harian', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Keilmuan', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Kefahaman Agama', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Kemandirian', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Akhlak', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Tata Krama', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
      ],
    },
  },
  {
    max: 11,
    semesters: {
       'Semester 1': [
        { category: 'Tilawati', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Hafalan Surat', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Hafalan Doa Harian', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Keilmuan', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Kefahaman Agama', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Kemandirian', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Akhlak', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Tata Krama', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
      ],
      'Semester 2': [
        { category: 'Tilawati', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Hafalan Surat', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Hafalan Doa Harian', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Keilmuan', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Kefahaman Agama', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Kemandirian', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
        { category: 'Akhlak', items: ['Al-Fatihah', 'An-Nas'] },
        { category: 'Tata Krama', items: ['Doa Mau Makan', 'Doa Mau Tidur'] },
      ],
    },
  },
];

export function getTargetsForStudent(student?: Student, semester: Semester = 'Semester 1'): TargetCategory[] {
  if (!student || !student.dateOfBirth) return [];
  const { years } = calculateDetailedAge(student.dateOfBirth);
  const found = targetMateriByAge.find(cfg => years <= cfg.max);
  return found && found.semesters[semester] ? found.semesters[semester]! : [];
}
