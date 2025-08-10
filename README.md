
# TPQ Dashboard

> Sistem manajemen modern untuk Taman Pendidikan Quran (TPQ) berbasis Next.js, Prisma, dan PostgreSQL.


## 🚀 Fitur Utama

- Dashboard analytics: statistik generus, kehadiran, aktivitas, dan progress
- Manajemen siswa, guru, kelas, dan absensi
- Filter & rekap kehadiran bulanan, per level, dan aktivitas
- Import data absensi dari Excel
- Responsive & mobile friendly
- UI modern dengan Tailwind CSS & shadcn/ui


## 🛠️ Teknologi

- Next.js 14+ (App Router, SSR/CSR)
- TypeScript
- Tailwind CSS
- shadcn/ui & Lucide React
- Prisma ORM
- PostgreSQL
- date-fns-tz

your_private_key

## ⚡️ Instalasi & Setup

### Prasyarat
- Node.js 18+ & npm/yarn
- PostgreSQL (local/remote)

### Langkah Cepat

1. **Clone repository**
   ```bash
   git clone https://github.com/sultonsabillar/tpq-dashboard.git
   cd tpq-dashboard
   ```
2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```
3. **Copy & edit environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local sesuai koneksi database Anda
   ```
4. **Setup database**
   ```bash
   npx prisma migrate dev --name init
   # atau
   npm run db:reset
   ```
5. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
6. **Akses di browser**
   http://localhost:3000


## � Struktur Utama

- `src/app/` — Halaman utama & API route
- `src/components/` — Komponen UI dashboard
- `prisma/schema.prisma` — Skema database
- `src/lib/` — Helper & utilitas


## � Environment Contoh

```
DATABASE_URL="postgresql://user:password@localhost:5432/tpq_dashboard"
TZ=Asia/Jakarta
```


## 📊 API Endpoints (Contoh)

| Method | Endpoint                      | Keterangan                  |
|--------|-------------------------------|-----------------------------|
| GET    | `/api/dashboard/stats`        | Statistik dashboard         |
| GET    | `/api/students`               | List siswa                  |
| POST   | `/api/students`               | Tambah siswa                |
| PUT    | `/api/students/:id`           | Update data siswa           |
| DELETE | `/api/students/:id`           | Hapus siswa                 |
| GET    | `/api/students/levels`        | Statistik siswa per level   |
| GET    | `/api/attendance`             | Data absensi                |
| POST   | `/api/attendance`             | Tambah absensi              |
| PUT    | `/api/attendance/:id`         | Update absensi              |
| DELETE | `/api/attendance/:id`         | Hapus absensi               |


## 📝 Contributing

1. Fork repo
2. Buat branch fitur (`git checkout -b fitur-anda`)
3. Commit & push
4. Pull Request


## 📄 Lisensi

MIT License


---

**Dibuat dengan ❤️ untuk komunitas TPQ Indonesia**
