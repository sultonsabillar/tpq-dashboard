# TPQ Dashboard - Sistem Manajemen Taman Pendidikan Quran

Dashboard modern untuk mengelola TPQ (Taman Pendidikan Quran) dengan integrasi Google Sheets dan Google Apps Script.

## 🌟 Fitur Utama

### 📊 Dashboard Analytics
- Statistik real-time siswa, guru, dan kelas
- Tingkat kehadiran harian dan bulanan
- Aktivitas terbaru dan jadwal hari ini
- Ringkasan progress pembelajaran

### 👥 Manajemen Siswa
- Pendaftaran siswa baru
- Profil lengkap siswa dengan data orang tua
- Pengelompokan berdasarkan level (Iqro 1-6, Al-Quran)
- Riwayat progress pembelajaran
- Status aktif/non-aktif

### 👨‍🏫 Manajemen Guru
- Profil guru dan spesialisasi
- Penugasan kelas
- Jadwal mengajar
- Evaluasi kinerja

### 📚 Manajemen Kelas
- Pengaturan kelas berdasarkan level
- Kapasitas dan jadwal kelas
- Penugasan guru
- Daftar siswa per kelas

### ✅ Sistem Absensi
- Absensi harian digital
- Multiple status: Hadir, Tidak Hadir, Izin, Sakit
- Laporan kehadiran per siswa/kelas
- Notifikasi ketidakhadiran

### 📈 Tracking Progress
- Pencatatan progress pembelajaran Al-Quran
- Evaluasi per siswa (Sangat Baik, Baik, Cukup, Perlu Bimbingan)
- Laporan progress bulanan/semester
- Rekomendasi pembelajaran

### 📅 Manajemen Jadwal
- Jadwal kelas harian/mingguan
- Pengaturan jam belajar
- Kalender kegiatan TPQ
- Reminder otomatis

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Next.js 14+** - React framework dengan App Router
- **TypeScript** - Type safety dan developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI components

### Backend & Database
- **Google Sheets** - Database utama (cloud-based)
- **Google Apps Script** - Server-side logic dan API
- **Google APIs** - Integrasi dengan ekosistem Google

### Tools & Libraries
- **Date-fns** - Date manipulation
- **Recharts** - Data visualization
- **Clsx** - Conditional class names
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ dan npm/yarn
- Google Cloud Project dengan Google Sheets API enabled
- Google Service Account dengan kredensial JSON

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/tpq-dashboard.git
   cd tpq-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` dengan konfigurasi Anda:
   ```env
   GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
   GOOGLE_CLIENT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
your_private_key
-----END PRIVATE KEY-----"
   ```

4. **Setup Google Sheets**
   - Buat Google Spreadsheet baru
   - Buat sheets dengan nama: Students, Teachers, Classes, Attendance, Progress, Settings
   - Setup headers sesuai dengan struktur data di `src/lib/google-sheets.ts`
   - Bagikan spreadsheet dengan service account email

5. **Run development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

6. **Open browser**
   Buka [http://localhost:3000](http://localhost:3000)

## 📋 Struktur Google Sheets

### Sheet: Students
| id | name | parentName | phoneNumber | address | dateOfBirth | gender | classId | level | enrollmentDate | isActive | notes |

### Sheet: Teachers
| id | name | email | phoneNumber | address | dateOfBirth | gender | specialization | hireDate | isActive | classIds |

### Sheet: Classes
| id | name | level | teacherId | schedule | maxStudents | currentStudents | isActive |

### Sheet: Attendance
| id | studentId | classId | date | status | notes | recordedBy | recordedAt |

### Sheet: Progress
| id | studentId | classId | date | surah | ayah | page | evaluation | notes | teacherId |

## 🔧 Konfigurasi Google Apps Script

1. Buka Google Apps Script (script.google.com)
2. Buat project baru
3. Copy kode dari `gas-scripts/` folder
4. Deploy sebagai web app
5. Atur permissions dan sharing

## 📱 Responsive Design

Dashboard telah dioptimasi untuk:
- 💻 Desktop (1024px+)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (< 768px)

## 🔐 Keamanan

- Service Account untuk akses Google Sheets
- Environment variables untuk sensitive data
- Input validation dan sanitization
- HTTPS ready untuk production

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Manual Build
```bash
npm run build
npm start
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Create new student |
| PUT | `/api/students` | Update student |
| DELETE | `/api/students` | Delete student |
| GET | `/api/attendance` | Get attendance records |
| POST | `/api/attendance` | Record attendance |
| PUT | `/api/attendance` | Update attendance |

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Untuk dukungan dan pertanyaan:
- Email: support@tpqdashboard.com
- WhatsApp: +62xxx-xxxx-xxxx
- Documentation: [docs.tpqdashboard.com](https://docs.tpqdashboard.com)

## 🎯 Roadmap

### Version 2.0
- [ ] Mobile app dengan React Native
- [ ] Notifikasi push untuk orang tua
- [ ] Payment gateway untuk SPP
- [ ] Sistem ujian online
- [ ] Video call integration untuk kelas online

### Version 1.5
- [ ] Export laporan ke PDF
- [ ] Backup otomatis data
- [ ] Multi-language support
- [ ] Dark mode

---

**Dibuat dengan ❤️ untuk komunitas TPQ Indonesia**
