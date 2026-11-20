<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 10
<br>
HASIL IMPLEMENTASI DAN UJI PERANGKAT LUNAK (HIUPL)
</h1>
<br>

## *APATIS: Aplikasi Pelaporan Air dan Sanitasi*
### <img alt="Logo APATIS" src="./assets/logo.png" width="50%">

### Untuk: *Made Branenda Jordhy*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *\[K01\]* |
| Kelompok | *\[5\]*  |

| NIM | Nama |
|---|---|
| *13525016* | *Kenzo Yo* |
| *13525112* | *Justin Sepvian* |
| *13525142* | *Jessica Audrey Tjahjadi* |
| *13525073* | *Nadia Layla Safira* |
| *13525097* | *Arini Karimatunnikmah* |

## Daftar Isi

- [BAB 1: Pendahuluan](#bab-1-pendahuluan)
  - [1.1 Tujuan Penulisan Dokumen](#11-tujuan-penulisan-dokumen)
  - [1.2 Lingkup Masalah](#12-lingkup-masalah)
  - [1.3 Definisi, Istilah, dan Singkatan](#13-definisi-istilah-dan-singkatan)
  - [1.4 Aturan Penomoran](#14-aturan-penomoran)
  - [1.5 Referensi](#15-referensi)
  - [1.6 Deskripsi Umum Dokumen (Ikhtisar)](#16-deskripsi-umum-dokumen-ikhtisar)
- [BAB 2: Deskripsi Umum Perangkat Lunak](#bab-2-deskripsi-umum-perangkat-lunak)
- [BAB 3: Implementasi](#bab-3-implementasi)
  - [3.1 Lingkungan Implementasi](#31-lingkungan-implementasi)
  - [3.2 Implementasi Modul](#32-implementasi-modul)
  - [3.3 Implementasi Antarmuka](#33-implementasi-antarmuka)
  - [3.4 File Lain](#34-file-lain)
- [BAB 4: Hasil Pengujian](#bab-4-hasil-pengujian)
  - [4.1 Strategi dan Kedalaman Pengujian Kelas](#41-strategi-dan-kedalaman-pengujian-kelas)
  - [4.2 Pengujian Unit Kelas](#42-pengujian-unit-kelas)
  - [4.3 Pengujian Integrasi](#43-pengujian-integrasi)
  - [4.4 Pengujian Use Case](#44-pengujian-use-case)
  - [4.5 Pengujian Kebutuhan Non-Fungsional (KNF)](#45-pengujian-kebutuhan-non-fungsional-knf)
  - [4.6 Tangkapan Layar dan Bukti Hasil Pengujian](#46-tangkapan-layar-dan-bukti-hasil-pengujian)
- [BAB 5: Traceability](#bab-5-traceability)

---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

---

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen

Penulisan HIUPL APATIS ini bertujuan untuk menunjukkan bagaimana hasil implementasi dari desain website dan mengetahui bagaimana pengujian dari fungsionalitas pada website tersebut. Dokumen ini juga menjelaskan ruang lingkup pembuatan website dan batasan dari pembuatan website. Dokumen ini menjadi acuan selama proses implementasi perangkat lunak Proyek APATIS berbasis Web Application dan merupakan kelengkapan dokumentasi proyek.

## 1.2 Lingkup Masalah
Fasilitas air bersih dan sanitasi penting untuk mendukung kegiatan di lingkungan kampus dan berkaitan dengan SDG 6. Namun, proses pelaporan masalah fasilitas masih dapat terkendala karena belum dilakukan secara terpusat, informasi lokasi dapat kurang lengkap, dan pelapor sulit mengetahui apakah suatu masalah sudah pernah dilaporkan. Untuk membantu mengatasi masalah tersebut, APATIS menyediakan pelaporan terpusat yang memungkinkan pengguna mencantumkan foto, deskripsi, dan lokasi masalah, melihat laporan pengguna lain, memberikan like, serta memantau perkembangan penanganan melalui status laporan. Pengguna yang mengirimkan laporan valid akan memperoleh poin yang digunakan untuk menentukan peringkat pada leaderboard, sedangkan pengguna dalam 20 peringkat teratas dapat menjadi calon penerima merchandise apabila hadiah tersedia.

## 1.3 Definisi, Istilah, dan Singkatan
Semua definisi dan singkatan yang digunakan dalam dokumen ini beserta penjelasannya.

Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| *P/L* | *Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu.* |
| *SKPL* | *Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan untuk membangun aplikasi menjalankan tugasnya.* |
| *APL* | *Arsitektur Perangkat Lunak* |
| *DPPL* | *Singkatan dari Deskripsi Perancangan Perangkat Lunak, yaitu dokumen yang menjelaskan rancangan arsitektur, kelas, dan antarmuka P/L.* |
| *HIUPL* | *Singkatan dari Hasil Implementasi dan Uji Perangkat Lunak, yaitu dokumen yang melaporkan hasil implementasi dan pengujian P/L.* |
| *KF* | *Singkatan dari Kebutuhan Fungsional.* |
| *KNF* | *Singkatan dari Kebutuhan Non-Fungsional.* |
| *UC* | *Singkatan dari Use Case.* |
| *TC* | *Singkatan dari Test Case, yaitu satu kasus uji untuk skenario tertentu.* |
| *UT* | *Singkatan dari Unit Test, yaitu test case tingkat kelas/operasi.* |
| *INT* | *Singkatan dari Integration Test, yaitu test case yang menguji interaksi antarkomponen.* |
| *Boundary* | *Kasus uji pada nilai batas masukan, misalnya nilai minimum, maksimum, atau tepat di ambang aturan.* |
| *Coverage* | *Persentase baris/cabang kode yang dieksekusi oleh pengujian.* |
| *SDG* | *Sustainable Development Goals atau Tujuan Pembangunan Berkelanjutan.* |
| *OTP* | *One Time Password, yaitu kode sekali pakai yang digunakan dalam proses autentikasi.* |
| *DBMS* | *Database Management System, yaitu sistem yang digunakan untuk mengelola basis data.* |
| *APATIS* | *Aplikasi Pelaporan Air dan Sanitasi* |

## 1.4 Aturan Penomoran
Tuliskan aturan penomoran (ID) yang digunakan dalam dokumen ini. Gunakan pola ID yang **sama** dengan yang sudah dipakai pada dokumen-dokumen sebelumnya (SKPL, APL, DPPL), kecuali untuk ID pengujian yang baru diperkenalkan pada dokumen ini.

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| *Kebutuhan Fungsional* | *KFXX* | *Menunjukkan kebutuhan fungsional perangkat lunak.* |
| *Kebutuhan Non-Fungsional* | *KNFXX* | *Menunjukkan kebutuhan non-fungsional perangkat.* |
| *Use Case* | *UCXX* | *Menunjukkan kegunaan perangkat lunak dari perspektif pengguna.* |
| *Kelas* | *CXX* | *Menunjukkan kelas-kelas pada perangkat lunak.* |
| *Antarmuka* | *I-XX* | *Sesuai DPPL* |
| *Test Case Unit* | *CXX-UTYY* | *XX adalah nomor kelas, YY adalah nomor urut test case unit pada kelas tersebut* |
| *Test Case Integrasi* | *INT-TCYY* | *YY adalah nomor urut test case integrasi* |
| *Test Case Use Case* | *UCXX-TCYY* | *XX adalah nomor use case, YY adalah nomor urut test case pada use case tersebut* |
| *Test Case KNF* | *KNFXX-TCYY* | *XX adalah nomor KNF, YY adalah nomor urut test case pada KNF tersebut* |
| *Bukti foto KNF* | *KNFXX-TCYY-Z* | **XX adalah nomor KNF, YY adalah nomor urut test case, dan Z adalah nomor bukti ke-Z* |

## 1.5 Referensi
Cantumkan daftar buku, panduan, atau dokumentasi lain yang dirujuk dalam pembuatan dokumen dan pengembangan P/L, **minimal dokumen SKPL, APL, DPPL, dan Implementasi (Tugas 9)**. Tambahkan dokumentasi *framework*/*library*/*testing tool* atau referensi lain apabila digunakan.

Kelompok Furina: Forum RPL Indonesia Jaya, *K01_G05_SKPL*, Institut Teknologi Bandung, Semester 1, Tahun Ajaran 2026/2027.

Kelompok Furina: Forum RPL Indonesia Jaya, *K01_G05_APL*, Institut Teknologi Bandung, Semester 1, Tahun Ajaran 2026/2027.

Kelompok Furina: Forum RPL Indonesia Jaya, *K01_G05_DPPL*, Institut Teknologi Bandung, Semester 1, Tahun Ajaran 2026/2027.

Kelompok Furina: Forum RPL Indonesia Jaya, *K01_G05_Implementasi*, Institut Teknologi Bandung, Semester 1, Tahun Ajaran 2026/2027.

Tim Asisten IF2150, *Hasil Implementasi dan Uji Perangkat Lunak*, Institut Teknologi Bandung, Semester 1, Tahun Ajaran 2026/2027.

Tim Pengajar IF2150, *Perancangan Test Case: Partisi, Batas, dan Jalur*, Institut Teknologi Bandung, Semester 1, Tahun Ajaran 2026/2027.

Tim Pengajar IF2150, *Teknik Pengujian Unit: Test Double dan Pembangkitan Test Otomatis*, Institut Teknologi Bandung, Semester 1, Tahun Ajaran 2026/2027.

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Dokumen HIUPL APATIS ini terdiri atas lima bab. BAB 1 berisi tujuan penulisan dokumen, lingkup masalah, definisi, istilah dan singkatan, aturan penomoran, serta referensi. BAB 2 menjelaskan deskripsi umum perangkat lunak APATIS. BAB 3 berisi informasi tentang elemen P/L yang diimplementasikan. BAB 4 melaporkan hasil pengujian P/L pada level unit, integrasi, dan sistem. Terakhir, BAB 5 berisi kerunutan antara implementasi dan pengujian serta kerunutan antara KNF dan Pengujian.

<br>

---

# BAB 2: Deskripsi Umum Perangkat Lunak

APATIS merupakan sistem yang membantu pengguna melaporkan masalah fasilitas air dan sanitasi di lingkungan ITB, seperti kebocoran air, kondisi air yang tidak wajar, serta perlengkapan kamar mandi yang kurang. Melalui sistem ini, proses pelaporan diharapkan menjadi lebih mudah, terpusat, dan transparan.

APATIS melibatkan tiga jenis pengguna, yaitu Pelapor, Petugas, dan Admin. Pelapor membuat laporan mengenai masalah fasilitas air dan sanitasi. Admin melakukan validasi atau moderasi administratif terhadap laporan, sedangkan Petugas memeriksa laporan dan memperbarui status penanganannya.

Penerapan APATIS diharapkan dapat membantu memusatkan proses pelaporan dan mempercepat penyampaian informasi mengenai masalah fasilitas air dan sanitasi. Sistem ini juga mendukung pelaksanaan SDG 6 di lingkungan ITB, khususnya dalam pengelolaan fasilitas air bersih dan sanitasi.

<p align="center">
<img alt="Activity Diagram" src="./assets/use case diagram.png" width="70%">
</p>
<p align="center">
<i>Gambar 1. Use Case Diagram APATIS</i>
</p>

Sistem perangkat lunak ini akan menggunakan layanan eksternal _hosting server_, seperti Cloudflare, agar banyak pengguna, baik pelapor, petugas, maupun admin, dapat mengaksesnya secara sekaligus. Kemudian, sistem juga akan berinteraksi dengan sistem basis data relasional eksternal untuk menyimpan, mengambil, serta melakukan pembaruan terhadap data-data relasional sederhana, seperti data akun pelapor, petugas, admin, data laporan, dan sebagainya. Sistem akan berinteraksi dengan layanan ini setiap kali terdapat perubahan data, seperti pelapor membuat laporan, petugas memberi tanggapan, dan seterusnya. Sistem juga akan berinteraksi dengan layanan eksternal _object storage_ atau penyimpanan objek untuk menyimpan serta mengambil data berukuran besar seperti foto yang dilampirkan pada laporan. Terakhir, sistem juga akan menggunakan layanan autentikasi eksternal untuk melakukan validasi akun pengguna ketika pengguna melakukan login.

---

# BAB 3: Implementasi

Bagian ini diisi dengan informasi tentang elemen P/L yang dikembangkan (*executable files*, *configuration files*, *data files*, dan sebagainya) serta perubahannya terhadap rancangan pada DPPL (jika ada).

## 3.1 Lingkungan Implementasi

Tuliskan *hardware* dan *software* yang digunakan untuk implementasi, mencakup *operating system*, bahasa pemrograman beserta versinya, *framework*/*library*, DBMS, *development tools*, dan *version control*. Lingkungan ini harus konsisten dengan **Subbab 2.1 DPPL**; jelaskan jika ada perubahan. Cantumkan juga *framework* dan alat pengujian yang dipakai.

Tabel 3.1. Lingkungan Implementasi

| Aspek | Keterangan |
| :--- | :--- |
| *Hardware* | *Laptop pengembang dan penguji unit: Intel Core i7-13620H (8 thread), RAM 10 GB. Sisi server berjalan serverless di Cloudflare Workers sehingga tidak memerlukan server fisik.* |
| *Operating System* | *Pengembangan dan pengujian unit: Ubuntu 26.04.1 LTS (kernel Linux 7.0.0). Aplikasi dapat diakses lintas platform melalui browser modern sesuai DPPL 2.1.* |
| *Bahasa Pemrograman* | *TypeScript 5.9.3 (`strict: true`, target ES2017) di atas Node.js v22.14.0 (npm 10.9.2)* |
| *Framework/Library* | *Next.js 16.4 (App Router, `package.json`: `^16.4.5`), React 19.3.0, Tailwind CSS 4.3.3, `@supabase/supabase-js` 2.118.0, `@supabase/ssr` 0.12.7, `@opennextjs/cloudflare` `^1.20.16`, Wrangler `^4.158.0`, ESLint 9.39.5* |
| *DBMS* | *Supabase dengan PostgreSQL 15 (sesuai DPPL 2.1), beserta Supabase Auth dan Supabase Storage (bucket `laporan-foto`) sebagai object storage* |
| *Development Tools* | *WebStorm sebagai IDE, Git 2.53.0 sebagai version control, GitHub sebagai repositori dan Pull Request, npm 10.9.2 sebagai package manager, Supabase Dashboard untuk pengelolaan basis data* |
| *Testing Tools* | *Test runner bawaan Node.js (`node:test` dan `node:assert/strict`) yang dijalankan melalui `tsx` v4.23.15 dengan perintah `npm test`. Alat coverage: V8 code coverage bawaan Node.js v22 (`--experimental-test-coverage`) yang melaporkan `% line`, `% branch`, dan `% funcs`. Database dan Supabase Storage pada unit test disimulasikan dengan `tests/helpers/mockSupabase.ts`.* |

## 3.2 Implementasi Modul

Daftar modul/kelas yang **TELAH** diimplementasikan. Gunakan nama dan ID kelas yang sama dengan DPPL, dan konsisten dengan Tabel B.5 pada dokumen Implementasi (Tugas 9).

Tabel 3.2. Implementasi Modul

| No | ID Kelas | Nama Modul/Kelas | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *C01* | *PelaporEntity* | *types/pelapor.ts* | *-* |
| 2 | *C02* | *LaporanEntity* | *types/laporan.ts* | *-* |
| 3 | *C03* | *HalamanLaporan* | *app/(app)/HalamanLaporan/page.tsx, components/layout/laporancard.tsx* | *-* |
| 4 | *C04* | *HalamanFormulirLaporan* | *app/(app)/HalamanFormulirLaporan/page.tsx, app/(app)/HalamanFormulirLaporan/actions.tsx, components/laporan/KartuFormLapor.tsx* | *-* |
| 5 | *C05* | *LaporanController* | *services/laporanService.ts, app/api/laporan/route.ts, app/api/laporan/[id]/route.ts, app/api/laporan/upload/route.ts* | *-* |
| 6 | *C08* | *HalamanFormulirTanggapan* | *app/(app)/(petugas)/HalamanDetailTanggapanLaporan/page.tsx, app/(app)/(petugas)/HalamanDetailTanggapanLaporan/actions.tsx, components/tanggapanlaporan/KartuTanggapanLaporan.tsx* | *-* |
| 7 | *C09* | *TanggapanController* | *services/tanggapanService.ts, types/tanggapan.ts, app/api/tanggapan/route.ts, app/api/laporan/[id]/tanggapan/route.ts* | *-* |
| 8 | *C10* | *LikeController* | *services/likeService.ts, repositories/likeRepository.ts, types/like.ts, app/api/like/route.ts* | *-* |
| 9 | *C11* | *HalamanLeaderboard* | *app/(app)/HalamanLeaderboard/page.tsx, components/layout/LbComponent.tsx* | *-* |
| 10 | *C12* | *DatabaseLaporanEntity* | *repositories/laporanRepository.ts* | *-* |
| 11 | *C13* | *DatabasePelaporEntity* | *repositories/pelaporRepository.ts, services/pelaporService.ts, app/api/pelapor/[id]/route.ts, app/api/pelapor/me/route.ts* | *-* |
| 12 | *C14* | *LeaderboardController* | *services/leaderboardService.ts, types/leaderboard.ts, app/api/leaderboard/route.ts, app/api/leaderboard/me/route.ts* | *-* |
| 13 | *C15* | *HalamanAkun* | *app/(app)/HalamanAkun/page.tsx, app/(app)/HalamanAkun/actions.tsx, components/layout/AccountCard.tsx* | *-* |
| 14 | *C16* | *HalamanNotifikasi* | *app/(app)/HalamanNotifikasi/page.tsx, components/layout/NotifCard.tsx* | *-* |
| 15 | *C17* | *NotifikasiController* | *services/notifikasiService.ts, repositories/notifikasiRepository.ts, types/notifikasi.ts, app/api/notifikasi/route.ts* | *-* |
| 16 | *C18* | *HalamanLogin* | *app/login/page.tsx, app/login/ForgotPassword/page.tsx* | *-* |
| 17 | *C19* | *LoginController* | *app/api/auth/login/route.ts, app/auth/callback/route.ts, lib/supabase/server.ts, lib/supabase/client.ts, app/login/ForgotPassword/actions.tsx, app/login/actions.tsx* | *-* |

## 3.3 Implementasi Antarmuka

Daftar antarmuka yang telah diimplementasikan. Gunakan ID dan nama layar yang sama dengan ID dan nama layar pada tugas DPPL.

Tabel 3.3. Implementasi Antarmuka

| No | ID Antarmuka | Nama Antarmuka | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *I-01* | *Halaman Login* | *app/login/page.tsx, app/login/ForgotPassword/page.tsx* | *-* |
| 2 | *I-02* | *Halaman Laporan Pelapor* | *app/(app)/HalamanLaporan/page.tsx, components/layout/laporancard.tsx* | *-* |
| 3 | *I-03* | *Halaman Laporan Petugas* | *app/(app)/(petugas)/HalamanTanggapanLaporan/page.tsx, components/tanggapanlaporan/Tanggapansections.tsx, components/tanggapanlaporan/tanggapanlaporansection.tsx, components/tanggapanlaporan/tanggapanlaporancard.tsx* | *-* |
| 4 | *I-04* | *Halaman Akun* | *app/(app)/HalamanAkun/page.tsx, components/layout/AccountCard.tsx* | *-* |
| 5 | *I-05* | *Halaman Notifikasi* | *app/(app)/HalamanNotifikasi/page.tsx, components/layout/NotifCard.tsx* | *-* |
| 6 | *I-06* | *Halaman Formulir Laporan* | *app/(app)/HalamanFormulirLaporan/page.tsx, components/laporan/KartuFormLapor.tsx* | *-* |
| 7 | *I-07* | *Halaman Formulir Tanggapan* | *app/(app)/(petugas)/HalamanDetailTanggapanLaporan/page.tsx, components/tanggapanlaporan/KartuTanggapanLaporan.tsx* | *-* |
| 8 | *I-08* | *Halaman Leaderboard* | *app/(app)/HalamanLeaderboard/page.tsx, components/layout/LbComponent.tsx* | *-* |

## 3.4 File Lain

Daftar file lain yang dibuat selain file kelas dan antarmuka, misalnya file *utility*, *configuration*, *database schema/seed*, *file test*, atau *data*.

Tabel 3.4. File Lain

| No | Nama File | Keterangan |
| :--- | :--- | :--- |
| 1 | *components/layout/Header.tsx* | *Header bersama untuk halaman setelah login* |
| 2 | *components/layout/SideBar.tsx* | *Menu samping dengan isi sesuai role* |
| 3 | *components/ui/button.tsx, avatar.tsx, sheet.tsx* | *Komponen UI* |
| 4 | *app/layout.tsx, app/(app)/layout.tsx* | *Layout halaman setelah login* |
| 7 | *app/globals.css* | *Gaya global, tema warna, dan font HyWenHei* |
| 8 | *lib/supabase/admin.ts, client.ts, server.ts, storage.ts* | *Konfigurasi klien Supabase* |
| 9 | *lib/roles.ts, lib/utils.ts* | *Utilitas role dan fungsi bantu (cn)* |
| 10 | *types/role.ts, route-roles.ts, start-pages.ts, allowed-domains.ts* | *Tipe dan aturan akses halaman per role, halaman awal per role, dan domain email yang diizinkan* |
| 11 | *public/icon/*.svg, logoPutih.svg, Logo.png, dummy.svg, 3dotlb.svg, logout.svg* | *Aset ikon, logo, dan gambar dummy* |
| 12 | *public/zhcn.ttf, public/Mermaid1001.ttf* | *Berkas font HyWenHei dan Mermaid* |
| 13 | *public/_headers* | *Konfigurasi header HTTP untuk deployment Cloudflare* |
| 14 | *next.config.ts, components.json, package.json, tsconfig.json, eslint.config.mjs* | *File konfigurasi proyek P/L* |
| 15 | *.env.example* | *Contoh variabel lingkungan* |
| 16 | *tests/*.test.ts* | *Unit test* |
| 17 | *proxy.ts* | *Proteksi akses halaman dan sesi Supabase pada setiap request* |

<br>

---

# BAB 4: Hasil Pengujian

Bab ini melaporkan hasil pengujian P/L pada level unit, integrasi, dan sistem. Pengujian dilakukan pada tag release terakhir Tugas 9. Hasil aktual diisi berdasarkan pengamatan saat pengujian. Kesimpulan diisi `Pass` atau `Fail`, dan untuk `Fail` dilengkapi penyebab serta usulan perbaikan.

## 4.1 Strategi dan Kedalaman Pengujian Kelas

Setiap kelas perancangan pada Tabel 4.1 DPPL diklasifikasikan ke dalam tiga tingkat kedalaman pengujian. Tingkat **Mendalam** diberikan pada kelas yang memuat logika bisnis, perhitungan, validasi, aturan status, algoritma, integrasi eksternal, atau keamanan. Tingkat **Sedang** diberikan pada kelas yang hanya mengoordinasikan atau mendelegasikan proses. Tingkat **Tidak perlu** diberikan pada kelas tanpa logika, seperti *entity/DTO* dan kelas konfigurasi, yang teruji secara tidak langsung melalui test case use case. Seluruh kelas wajib dicantumkan beserta alasan penentuan tingkatnya.

Tabel 4.1.1. Identifikasi Tingkat Pengujian Kelas

| ID Kelas | Nama Kelas | Tingkat | Alasan | Test Case Terkait |
| :--- | :--- | :--- | :--- | :--- |
| *C01* | *PelaporEntity* | *Tidak perlu* | *Kelas entity berisi atribut (id, nama, NIM/NIP, poin, email) beserta getter/setter tanpa logika.* | *-* |
| *C02* | *LaporanEntity* | *Tidak perlu* | *Kelas entity berisi atribut laporan (id, judul, deskripsi, foto, like, status) beserta getter/setter tanpa logika.* | *-* |
| *C03* | *HalamanLaporan* | *Tidak perlu* | *Kelas boundary UI yang menampilkan daftar laporan dan meneruskan aksi like ke `LikeController` (`C10`). Diuji melalui integrasi (`4.3`) dan use case (`UC01, UC03`).* | *-* |
| *C04* | *HalamanFormulirLaporan* | *Tidak perlu* | *Kelas boundary UI formulir pelaporan. Aturan validasi batas karakter judul/deskripsi serta ukuran dan jenis foto diuji mendalam pada `LaporanController` (`C05`) dan alur `UC01`.* | *-* |
| *C05* | *LaporanController* | *Mendalam* | *Memuat validasi laporan (`isLaporanValid()`, batas karakter, ukuran/tipe foto), upload ke object storage, pembuatan laporan, dan perubahan status.* | *C05-UT01 s.d. C05-UT12* |
| *C06* | *AdminEntity* | *Tidak perlu* | *Kelas entity berisi data admin (id, nama, NIP, email) beserta getter/setter tanpa logika.* | *-* |
| *C07* | *PetugasEntity* | *Tidak perlu* | *Kelas entity berisi data petugas (id, nama, NIP, email) beserta getter/setter tanpa logika.* | *-* |
| *C08* | *HalamanFormulirTanggapann* | *Tidak perlu* | *Kelas boundary UI formulir tanggapan. Aturan status laporan, validasi status wajib, dan pemberian poin diuji mendalam pada `TanggapanController` (`C09`) dan alur `UC02`.* | *-* |
| *C09* | *TanggapanController* | *Mendalam* | *sendTanggapan() mengubah status dan menambah poin sesuai aturan status dan perhitungannya.* | *C09-UT01 s.d. C09-UT12* |
| *C10* | *LikeController* | *Mendalam* | *Kelas ini harus dapat memenuhi aturan satu like per Pelapor dan toggle like/unlike* | *C10-UT01 s.d. C10-UT10* |
| *C11* | *HalamanLeaderboard* | *Tidak perlu* | *Kelas boundary UI yang menampilkan 20 peringkat teratas; pengurutan dan perhitungan peringkat diuji mendalam pada `LeaderboardController` (`C14`) dan `UC04`.* | *-* |
| *C12* | *DatabaseLaporanEntity* | *Tidak perlu* | *Kelas akses data yang hanya menjalankan query sederhana (SELECT, INSERT, UPDATE). Teruji tidak langsung melalui test case UC01 sampai UC03.* | *-* |
| *C13* | *DatabasePelaporEntity* | *Tidak perlu* | *Kelas akses data yang hanya menjalankan query sederhana pada data Pelapor. Teruji tidak langsung melalui test case UC04* | *-* |
| *C14* | *LeaderboardController* | *Mendalam* | *Memuat algoritma pengurutan Pelapor berdasarkan poin dan perhitungan peringkat, sehingga perlu diuji untuk data kosong, poin sama, dan urutan benar* | *C14-UT01 s.d. C14-UT07* |
| *C15* | *HalamanAkun* | *Tidak perlu* | *Kelas boundary yang hanya menampilkan nama, NIM/NIP, dan poin Pelapor tanpa perhitungan, validasi, atau aturan bisnis. Teruji tidak langsung melalui test case UC04.* | *-* |
| *C16* | *HalamanNotifikasi* | *Tidak perlu* | *Kelas boundary yang hanya menampilkan daftar notifikasi tanpa perhitungan, validasi, atau aturan bisnis. Teruji tidak langsung melalui test case UC02 dan UC04.* | *-* |
| *C17* | *NotifikasiController* | *Sedang* | *Mengoordinasikan pembuatan dan pengiriman notifikasi dengan validasi sederhana (id Pelapor dan pesan tidak kosong).* | *C17-UT01 s.d. C17-UT06* |
| *C18* | *HalamanLogin* | *Tidak perlu* | *Kelas boundary UI penerima input login yang mendelegasikan autentikasi ke `LoginController` (`C19`). Diuji pada pengujian integrasi (`INT-TC01` s.d. `INT-TC03`).* | *-* |
| *C19* | *LoginController* | *Mendalam* | *Validasi domain email ITB, resolusi sesi & role Supabase (`pelapor`/`petugas`/`admin`), penanganan error autentikasi (`401`), dan keamanan akses profil.* | *C19-UT01 s.d. C19-UT07, INT-TC01 s.d. INT-TC03* |

## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai *coverage* minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan unit test: `npm test` (atau dengan laporan cakupan: `npx tsx --test --experimental-test-coverage tests/*.test.ts` di dalam direktori `src/`).

Lokasi file test: `src/tests/`.

### 4.2.1 Kelas TanggapanController

**ID Kelas:** *C09*  
**Nama Kelas:** *TanggapanController* (`src/services/tanggapanService.ts`)  
**Tingkat:** *Mendalam*

Tabel 4.2.1. Hasil Pengujian Unit Kelas C09

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C09-UT01* | *`isStatusValidForPoin(status)` & `isStatusRejected(status)`* | *Normal & Batas* | *Status `"  VaLiD  "`, `"dalam penanganan"`, `"SELESAI"` pada `isStatusValidForPoin`; `"  DiToLaK  "`, `"INVALID"` pada `isStatusRejected`* | *Mengembalikan `true` untuk seluruh variasi huruf kapital dan spasi* | *Seluruh pemanggilan mengembalikan `true`* | *Pass* |
| *C09-UT02* | *`isStatusValidForPoin(status)` & `isStatusRejected(status)`* | *Negatif* | *Status `"menunggu"`, `"   "`, `null` pada `isStatusValidForPoin`; `"valid"`, `undefined` pada `isStatusRejected`* | *Mengembalikan `false` tanpa melempar exception* | *Seluruh pemanggilan mengembalikan `false`* | *Pass* |
| *C09-UT03* | *`addPoinPelapor(idPelapor, poin)`* | *Batas (Data Korup)* | *Pelapor `idPelapor = "1"` (string) dengan data korup `poin = -10` di DB ditambah `5`, lalu ditambah batas positif terkecil `1`* | *Poin negatif dinormalkan ke `0` (`poinLama = 0`, `poinBaru = 5`), lalu menjadi `6`* | *`poinLama = 0`, `poinBaru = 5`, lalu `poinBaru = 6`* | *Pass* |
| *C09-UT04* | *`addPoinPelapor(idPelapor, poin)`* | *Negatif* | *`poin` bernilai `0`, desimal `1.5`, negatif `-3`, `NaN`; serta `idPelapor = "abc"` dan `idPelapor = 999` (tidak ada di DB)* | *Melempar `TanggapanServiceError`: `INVALID_POIN_VALUE` (400), `INVALID_PELAPOR_ID` (400), dan `PELAPOR_NOT_FOUND` (404)* | *Seluruh kasus melempar `TanggapanServiceError` dengan kode dan status HTTP yang sesuai* | *Pass* |
| *C09-UT05* | *`setStatusLaporan(idLaporan, status, extraUpdates)`* | *Normal & Batas* | *Laporan `idLaporan = "5"` diubah statusnya ke `"  dalam penanganan  "` dengan catatan `"Teknisi otw"`* | *Mengembalikan `true` dan status tersimpan ter-trim menjadi `"dalam penanganan"`* | *Mengembalikan `true` dan `status_laporan` di DB menjadi `"dalam penanganan"`* | *Pass* |
| *C09-UT06* | *`setStatusLaporan(idLaporan, status, extraUpdates)`* | *Batas & Negatif* | *`idLaporan = 999` (tidak ada), `idLaporan = 0` (batas invalid), dan `status = "    "` (spasi kosong)* | *`999` mengembalikan `false`; `0` melempar `INVALID_LAPORAN_ID` (400); `"    "` melempar `INVALID_STATUS_LAPORAN` (400)* | *Hasil sesuai ekspektasi (`false` untuk 999, exception 400 untuk ID 0 dan status kosong)* | *Pass* |
| *C09-UT07* | *`sendTanggapan(idLaporan, input)`* | *Normal* | *Petugas memvalidasi laporan `id = 5` milik pelapor `id = 1` (`poin = 10`, `points_awarded = false`) dengan status `"valid"`* | *Status menjadi `"valid"`, `pointsAwardedNow = true`, `poinDitambahkan = 1`, `poinPelaporBaru = 11`, dan `notifikasiSent = true`* | *Status menjadi `"valid"`, poin pelapor menjadi 11, dan 1 notifikasi terkirim* | *Pass* |
| *C09-UT08* | *`sendTanggapan(idLaporan, input)`* | *Batas* | *Petugas memperbarui laporan `id = 5` yang sudah `points_awarded = true` ke status `"selesai"`* | *Status berubah ke `"selesai"` tanpa poin ganda (`pointsAwardedNow = false`, `poinDitambahkan = 0`, poin tetap 11)* | *Status berubah ke `"selesai"`, `poinDitambahkan = 0`, poin tetap 11* | *Pass* |
| *C09-UT09* | *`sendTanggapan(idLaporan, input)`* | *Normal & Batas* | *Admin menolak laporan `id = 7` yang `judul_laporan = null` dengan status `"ditolak"` dan catatan `"Foto tidak jelas"`* | *Status menjadi `"ditolak"`, tidak menambah poin (`0`), notifikasi penolakan terkirim memakai label fallback `#7`* | *Status `"ditolak"`, poin tetap 10, pesan notifikasi mengandung `#7` dan `"tidak dapat diproses"`* | *Pass* |
| *C09-UT10* | *`sendTanggapan(idLaporan, input)`* | *Batas (Laporan Yatim)* | *Petugas memberi input string langsung `"selesai"` pada laporan `id = 8` dengan `id_pelapor = null`* | *Status menjadi `"selesai"` tanpa error, tidak menambah poin (`0`), dan tidak mengirim notifikasi (`notifikasiSent = false`)* | *Status menjadi `"selesai"`, `pointsAwardedNow = false`, `notifikasiSent = false`* | *Pass* |
| *C09-UT11* | *`sendTanggapan(idLaporan, input)`* | *Negatif* | *Pengguna dengan role `"pelapor"` memanggil `sendTanggapan(1, { statusLaporan: "valid" })`* | *Melempar `TanggapanServiceError` dengan kode `FORBIDDEN` (403)* | *Melempar `TanggapanServiceError` (`FORBIDDEN`, status 403)* | *Pass* |
| *C09-UT12* | *`sendTanggapan(idLaporan, input)`* | *Negatif* | *Petugas memanggil `sendTanggapan` dengan `idLaporan = -1`, `statusLaporan = "   "`, dan `idLaporan = 999`* | *Melempar `INVALID_LAPORAN_ID` (400), `INVALID_STATUS_LAPORAN` (400), dan `LAPORAN_NOT_FOUND` (404)* | *Ketiganya melempar `TanggapanServiceError` dengan kode dan status HTTP sesuai* | *Pass* |

Khusus kelas **Mendalam**:

Tabel 4.2.1b. Ringkasan Cakupan Kelas C09

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `addPoinPelapor()`, `setStatusLaporan()`, `sendTanggapan()` (beserta helper validasi `isStatusValidForPoin()`, `isStatusRejected()`, `resolveTanggapanActorContext()`) |
| Operasi yang diuji | `isStatusValidForPoin()`, `isStatusRejected()`, `addPoinPelapor()`, `setStatusLaporan()`, `sendTanggapan()` (serta `resolveTanggapanActorContext()` melalui `sendTanggapan()`) |
| ID Algoritma yang tercakup | `Algo-005`, `Algo-006` |
| Coverage (wajib ≥ 70%) | **86.71% line / 78.38% branch / 76.19% funcs** (`npx tsx --test --experimental-test-coverage tests/tanggapan.test.ts`, bukti pada 4.6) |

### 4.2.2 Kelas LikeController

**ID Kelas:** *C10*  
**Nama Kelas:** *LikeController* (`src/services/likeService.ts`)  
**Tingkat:** *Mendalam*

Tabel 4.2.2. Hasil Pengujian Unit Kelas C10

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C10-UT01* | *`isLaporanLiked(idLaporan, idPelapor)`* | *Normal* | *Cek status like sebelum like, sesudah like, dan sesudah unlike untuk `idLaporan = 10`, `idPelapor = 2`* | *Berturut-turut mengembalikan `false`, `true`, lalu `false`* | *Mengembalikan `false`, `true`, dan `false` sesuai urutan aksi* | *Pass* |
| *C10-UT02* | *`likeLaporan(idLaporan, idPelapor)`* | *Normal* | *Pelapor `2` me-like laporan `10` yang semula `jumlah_like = 3`* | *`liked = true`, `jumlahLike = 4`, dan record like tersimpan* | *`liked = true`, `jumlahLike = 4`* | *Pass* |
| *C10-UT03* | *`likeLaporan(idLaporan, idPelapor)`* | *Negatif (Duplikat)* | *Pelapor `2` mencoba me-like ulang laporan `10` yang sudah di-like* | *Melempar `LikeServiceError` dengan kode `DUPLICATE_LIKE` (409)* | *Melempar `LikeServiceError` (`DUPLICATE_LIKE`, status 409)* | *Pass* |
| *C10-UT04* | *`unlikeLaporan(idLaporan, idPelapor)`* | *Normal & Negatif* | *Pelapor `2` membatalkan like pada laporan `10` (`jumlah_like = 4`), lalu membatalkan like pada laporan yang belum di-like* | *Pertama: `liked = false`, `jumlahLike = 3`; kedua: melempar `LIKE_NOT_FOUND` (404)* | *Pertama kembali ke `3`; kedua melempar `LIKE_NOT_FOUND` (404)* | *Pass* |
| *C10-UT05* | *`unlikeLaporan(idLaporan, idPelapor)`* | *Batas (Batas Bawah 0)* | *Unlike pada laporan `id = 21` dengan `jumlah_like = 0` meski record like ada di DB* | *`unlikeLaporan` menahan batas bawah `0` (`Math.max(0, 0 - 1) = 0`)* | *`liked = false` dan `jumlahLike` tetap `0` (tidak menjadi `-1`)* | *Pass* |
| *C10-UT06* | *`getLikedLaporanIdsByPelaporService(idPelapor)`* | *Normal & Batas* | *Pelapor `2` memiliki like di laporan `10` & `12`; pelapor `3` belum me-like laporan mana pun* | *Pelapor `2` mengembalikan `[10, 12]`; pelapor `3` mengembalikan `[]`* | *Mengembalikan `[10, 12]` untuk pelapor `2` dan `[]` untuk pelapor `3`* | *Pass* |
| *C10-UT07* | *`getLikedLaporanIdsByPelaporService(idPelapor)`* | *Negatif* | *Memanggil dengan `idPelapor = 0`* | *Melempar `LikeServiceError` (`INVALID_PELAPOR_ID`, 400)* | *Melempar `LikeServiceError` (`INVALID_PELAPOR_ID`, 400)* | *Pass* |
| *C10-UT08* | *`likeLaporan()`, `unlikeLaporan()`, `isLaporanLiked()`* | *Negatif (Not Found & ID Invalid)* | *`likeLaporan(999, 1)`, `unlikeLaporan(999, 1)`, `isLaporanLiked(0, 1)`, dan `likeLaporan(1, -5)`* | *Berturut-turut melempar `LAPORAN_NOT_FOUND` (404), `LAPORAN_NOT_FOUND` (404), `INVALID_LAPORAN_ID` (400), `INVALID_PELAPOR_ID` (400)* | *Seluruh kasus melempar `LikeServiceError` dengan kode dan status HTTP sesuai* | *Pass* |
| *C10-UT09* | *`resolveAuthenticatedPelaporForLike()`* | *Normal & Batas (Fallback Email)* | *Auth dengan `idPelapor = 2`, serta auth dengan `idPelapor = null` dan `auth_user_id = null` di DB tetapi memiliki `email` valid* | *Pertama mengembalikan `{ idPelapor: 2 }`; kedua fallback mencari via email dan mengembalikan `{ idPelapor: 7 }`* | *Mengembalikan `{ idPelapor: 2 }` dan `{ idPelapor: 7 }`* | *Pass* |
| *C10-UT10* | *`resolveAuthenticatedPelaporForLike()`* | *Negatif* | *Auth role `"petugas"`, auth `null` (belum login), dan email pelapor yang tidak terdaftar di DB* | *Berturut-turut melempar `FORBIDDEN` (403), `UNAUTHORIZED` (401), dan `INVALID_PELAPOR_SESSION` (401)* | *Ketiganya melempar `LikeServiceError` dengan kode dan status HTTP sesuai* | *Pass* |

Khusus kelas **Mendalam**:

Tabel 4.2.2b. Ringkasan Cakupan Kelas C10

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `isLaporanLiked()`, `likeLaporan()`, `unlikeLaporan()` (beserta helper `getLikedLaporanIdsByPelaporService()`, `resolveAuthenticatedPelaporForLike()`) |
| Operasi yang diuji | `isLaporanLiked()`, `likeLaporan()`, `unlikeLaporan()`, `getLikedLaporanIdsByPelaporService()`, `resolveAuthenticatedPelaporForLike()` |
| ID Algoritma yang tercakup | `Algo-007`, `Algo-008`, `Algo-009` |
| Coverage (wajib ≥ 70%) | **87.15% line / 82.14% branch / 77.78% funcs** (`npx tsx --test --experimental-test-coverage tests/like.test.ts`, bukti pada 4.6) |

### 4.2.3 Kelas LaporanController

**ID Kelas:** *C05*  
**Nama Kelas:** *LaporanController* (`src/services/laporanService.ts`)  
**Tingkat:** *Mendalam*

Tabel 4.2.3. Hasil Pengujian Unit Kelas C05

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C05-UT01* | *`isJumlahKarakterValid(desc, max)`* | *Normal, Batas & Negatif* | *Teks valid, spasi `"   "`, panjang tepat `300` (`MAX_DESKRIPSI_CHARS`), dan panjang `301`* | *Valid & `300` bernilai `true`; `"   "` & `301` bernilai `false`* | *Mengembalikan `true`, `false`, `true`, `false` sesuai batas* | *Pass* |
| *C05-UT02* | *`isUkuranFotoValid(size, max)`* | *Normal, Batas & Negatif* | *Ukuran `1024`, tepat `10 MB` (`MAX_FOTO_SIZE_BYTES`), `0`, dan `10 MB + 1 byte`* | *`1024` & `10 MB` bernilai `true`; `0` & `10 MB + 1` bernilai `false`* | *Mengembalikan `true`, `true`, `false`, `false` sesuai batas* | *Pass* |
| *C05-UT03* | *`isJenisFotoValid(mime, name)`* | *Normal, Batas & Negatif* | *`image/jpeg`+`.jpg`, `image/png`+`.png`, MIME kosong dengan `.png`, `image/png` tanpa ekstensi, `application/pdf`, dan `image/jpeg` dengan `.gif`* | *JPEG/PNG/tanpa ekstensi valid bernilai `true`; PDF & mismatch `.gif` bernilai `false`* | *Seluruh variasi MIME & ekstensi menghasilkan nilai boolean sesuai ekspektasi* | *Pass* |
| *C05-UT04* | *`isLaporanValid(desc, foto)`* | *Normal & Negatif* | *Deskripsi valid + foto JPEG 500 KB, serta deskripsi valid + `foto = null`* | *Pertama mengembalikan `true`; kedua mengembalikan `false`* | *Mengembalikan `true` dan `false`* | *Pass* |
| *C05-UT05* | *`parseAndValidateIdLaporan(rawId)`* | *Normal & Negatif* | *ID `1`, `" 42 "`, serta `0`, `-1`, `1.5`, `"abc"`, `"   "`* | *`1` & `" 42 "` menjadi `1` & `42`; selain itu melempar `INVALID_LAPORAN_ID` (400)* | *ID valid ter-parse; kelima input invalid melempar `INVALID_LAPORAN_ID` (400)* | *Pass* |
| *C05-UT06* | *`validateFotoLaporanInput()` & `uploadFotoLaporanService()`* | *Normal & Negatif* | *Upload PNG 3 byte valid; serta file `size = 0`, tipe `application/pdf`, dan `size = 10 MB + 1`* | *File valid terunggah ke bucket `laporan-foto`; file invalid melempar `EMPTY_FOTO_FILE`, `INVALID_FOTO_TYPE`, `FOTO_TOO_LARGE` (400)* | *Upload berhasil dengan URL publik `pelapor-5`; ketiga kasus gagal melempar kode error yang sesuai* | *Pass* |
| *C05-UT07* | *`createLaporanService()` & `getValidLaporanService()`* | *Normal* | *Buat laporan baru dengan foto JPEG 4 byte pada DB berisi 1 laporan berstatus `"ditolak"`, lalu panggil `listLaporanService()` dan `getValidLaporanService()`* | *Laporan tersimpan dengan URL storage; `listLaporanService()` berjumlah 2, `getValidLaporanService()` berjumlah 1 (memfilter yang ditolak)* | *Laporan tersimpan, `all.length = 2`, `validOnly.length = 1`* | *Pass* |
| *C05-UT08* | *`createLaporanService(input)`* | *Batas (Resolve Auth)* | *Buat laporan tanpa `idPelapor` dengan `authOverride` (`idPelapor: 2`)* | *`idPelapor` otomatis terisi `2` dari konteks autentikasi* | *Laporan tersimpan dengan `idPelapor = 2`* | *Pass* |
| *C05-UT09* | *`createLaporanService(input)`* | *Negatif (Validasi Input)* | *Deskripsi `"   "`, deskripsi `301` karakter, judul `101` karakter, dan tanpa `fotoFile`/`fotoLaporan`* | *Berturut-turut melempar `INVALID_LAPORAN_DESKRIPSI`, `DESKRIPSI_TOO_LONG`, `JUDUL_TOO_LONG`, `MISSING_FOTO_LAPORAN` (400)* | *Keempatnya melempar `LaporanServiceError` dengan kode yang sesuai* | *Pass* |
| *C05-UT10* | *`getLaporanByIdService(rawId)`* | *Normal & Negatif* | *Ambil laporan dengan `rawId = "10"` (ada di DB) dan `rawId = 999` (tidak ada)* | *`"10"` mengembalikan entitas laporan `10`; `999` melempar `LAPORAN_NOT_FOUND` (404)* | *Data laporan `10` ditemukan; `999` melempar `LAPORAN_NOT_FOUND` (404)* | *Pass* |
| *C05-UT11* | *`setStatusLaporanService(rawId, status)`* | *Normal* | *Ubah status laporan `10` ke `"  tuntas  "`* | *Mengembalikan `true` dan status laporan di DB menjadi `"tuntas"`* | *Mengembalikan `true` dan `status_laporan` menjadi `"tuntas"`* | *Pass* |
| *C05-UT12* | *`setStatusLaporanService(rawId, status)`* | *Negatif* | *Ubah status laporan `10` ke `"   "` (kosong) dan laporan `999` ke `"tuntas"`* | *Melempar `INVALID_STATUS_LAPORAN` (400) dan `LAPORAN_NOT_FOUND` (404)* | *Keduanya melempar `LaporanServiceError` dengan kode dan status HTTP sesuai* | *Pass* |

Khusus kelas **Mendalam**:

Tabel 4.2.3b. Ringkasan Cakupan Kelas C05

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `isLaporanValid()`, `setStatusLaporanService()`, `getValidLaporanService()` (beserta helper & operasi lain: `parseAndValidateIdLaporan()`, `isJumlahKarakterValid()`, `isUkuranFotoValid()`, `isJenisFotoValid()`, `validateFotoLaporanInput()`, `uploadFotoLaporanService()`, `createLaporanService()`, `listLaporanService()`, `getLaporanByIdService()`) |
| Operasi yang diuji | Seluruh 12 fungsi public di `src/services/laporanService.ts` |
| ID Algoritma yang tercakup | `Algo-003` |
| Coverage (wajib ≥ 70%) | **84.15% line / 76.47% branch / 91.43% funcs** (`npx tsx --test --experimental-test-coverage tests/laporan.test.ts`, bukti pada 4.6) |

### 4.2.4 Kelas LeaderboardController

**ID Kelas:** *C14*  
**Nama Kelas:** *LeaderboardController* (`src/services/leaderboardService.ts`)  
**Tingkat:** *Mendalam*

Tabel 4.2.4. Hasil Pengujian Unit Kelas C14

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C14-UT01* | *`getTop20Pelapor()`* | *Normal & Batas* | *25 data pelapor dengan poin bertingkat `5..125`* | *Mengembalikan tepat 20 entri (`rank = 1` berpoin `125` / `id = 25`; `rank = 20` adalah `id = 6`)* | *`top20.length = 20`, peringkat 1 dan 20 sesuai urutan tertinggi* | *Pass* |
| *C14-UT02* | *`getPelaporPoin(id)` & `getPelaporRank(id)`* | *Normal* | *Panggil dengan `idPelapor = 1` (poin `5`) pada dataset 25 pelapor* | *`getPelaporPoin(1) = 5` dan `getPelaporRank(1) = 25`* | *Mengembalikan `5` dan `25`* | *Pass* |
| *C14-UT03* | *`getMyLeaderboardService()`* | *Normal & Batas Top 20* | *Uji pelapor `id = 25` (`rank = 1`), `id = 6` (batas tepat `rank = 20`), `id = 5` (batas luar `rank = 21`), dan `id = 1` (`rank = 25`)* | *`inTop20 = true` untuk `rank` 1 dan 20; `inTop20 = false` untuk `rank` 21 dan 25* | *Seluruh status `rank` dan `inTop20` sesuai batas `MAX_LEADERBOARD_ENTRIES = 20`* | *Pass* |
| *C14-UT04* | *`sortPelaporByPoin()`, `getTop20Pelapor()`, `getPelaporPoin()`, `getPelaporRank()`* | *Batas (Data Kosong)* | *Dataset pelapor kosong `[]` dengan pemanggilan masing-masing operasi dan `idPelapor = 1`* | *`sortPelaporByPoin()` & `getTop20Pelapor()` mengembalikan `[]`; `getPelaporPoin(1)` & `getPelaporRank(1)` mengembalikan `0`* | *Seluruh hasil sesuai (`[]` dan `0`)* | *Pass* |
| *C14-UT05* | *`sortPelaporByPoin()` & `getPelaporRank(id)`* | *Batas (Poin Sama / Tie-breaker)* | *Pelapor `id = 5` (poin 50), `id = 8` (poin 80), `id = 2` (poin 50)* | *Urutan `[8, 2, 5]` (poin sama diurutkan berdasarkan `idPelapor` terkecil), `rank(2) = 2`, `rank(5) = 3`* | *Urutan ID `[8, 2, 5]` dengan `rank(2) = 2` dan `rank(5) = 3`* | *Pass* |
| *C14-UT06* | *`getPelaporPoin(id)` & `getPelaporRank(id)`* | *Negatif* | *`getPelaporPoin(0)` dan `getPelaporRank(-1)`* | *Melempar `PelaporServiceError` (`INVALID_PELAPOR_ID`, status `400`)* | *Keduanya melempar `PelaporServiceError` (`INVALID_PELAPOR_ID`, 400)* | *Pass* |
| *C14-UT07* | *`getMyLeaderboardService()`* | *Negatif* | *Pemanggilan dengan `authOverride = null` (belum terautentikasi)* | *Melempar `LeaderboardServiceError` (`UNAUTHORIZED`, status `401`)* | *Melempar `LeaderboardServiceError` (`UNAUTHORIZED`, 401)* | *Pass* |

Khusus kelas **Mendalam**:

Tabel 4.2.4b. Ringkasan Cakupan Kelas C14

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `getPelaporPoin()`, `getPelaporRank()`, `sortPelaporByPoin()` (beserta helper & operasi tambahan `comparePelaporByPoin()`, `toLeaderboardEntry()`, `getTop20Pelapor()`, `getMyLeaderboardService()`) |
| Operasi yang diuji | Seluruh 7 fungsi public di `src/services/leaderboardService.ts` |
| ID Algoritma yang tercakup | `Algo-018`, `Algo-019`, `Algo-020` |
| Coverage (wajib ≥ 70%) | **99.24% line / 93.10% branch / 80.00% funcs** (`npx tsx --test --experimental-test-coverage tests/leaderboard.test.ts`, bukti pada 4.6) |

### 4.2.5 Kelas NotifikasiController

**ID Kelas:** *C17*  
**Nama Kelas:** *NotifikasiController* (`src/services/notifikasiService.ts`)  
**Tingkat:** *Sedang*

Tabel 4.2.5. Hasil Pengujian Unit Kelas C17

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C17-UT01* | *`createNotifikasi(idPelapor, pesan)`* | *Normal* | *Panggil `createNotifikasi(1, "Laporan Anda telah diverifikasi!")`* | *Notifikasi tersimpan dengan `idPelapor = 1` dan `statusNotifikasi = "Belum Dibaca"`* | *Mengembalikan objek notifikasi dengan `idPelapor = 1` dan status `"Belum Dibaca"`* | *Pass* |
| *C17-UT02* | *`createNotifikasi(idPelapor, pesan)`* | *Negatif* | *Panggil `createNotifikasi(0, "Pesan valid")` dan `createNotifikasi(1, "   ")`* | *Keduanya melempar `NotifikasiServiceError` (`INVALID_NOTIFIKASI_INPUT`, status `400`)* | *Keduanya melempar `NotifikasiServiceError` (`INVALID_NOTIFIKASI_INPUT`, 400)* | *Pass* |
| *C17-UT03* | *`sendNotifikasi(notifikasi)`* | *Normal* | *Kirim objek notifikasi valid hasil `createNotifikasi(1, "Status berubah")`* | *Mengembalikan `true` dan mengubah `statusNotifikasi` menjadi `"Terkirim"`* | *Mengembalikan `true` dan `statusNotifikasi = "Terkirim"`* | *Pass* |
| *C17-UT04* | *`sendNotifikasi(notifikasi)`* | *Negatif* | *Panggil `sendNotifikasi(null)` dan objek dengan `idNotifikasi = 0`* | *Keduanya mengembalikan `false`* | *Keduanya mengembalikan `false`* | *Pass* |
| *C17-UT05* | *`getNotifikasiPelapor(id)` & `markNotifikasiAsRead(idNotif, idPelapor)`* | *Normal* | *Ambil daftar notifikasi pelapor `1` lalu tandai sudah dibaca oleh pelapor `1`* | *Daftar berisi 1 notifikasi dengan pesan sesuai; `markNotifikasiAsRead` mengembalikan `true`* | *Daftar berjumlah 1 dan `markNotifikasiAsRead` mengembalikan `true`* | *Pass* |
| *C17-UT06* | *`markNotifikasiAsRead(idNotif, idPelapor)`* | *Negatif* | *Pelapor `2` menandai notifikasi milik pelapor `1`, serta menandai `idNotifikasi = 999` (tidak ada)* | *Berturut-turut melempar `FORBIDDEN` (`403`) dan `NOTIFIKASI_NOT_FOUND` (`404`)* | *Keduanya melempar `NotifikasiServiceError` dengan kode dan status HTTP sesuai* | *Pass* |

### 4.2.6 Kelas LoginController

**ID Kelas:** *C19*  
**Nama Kelas:** *LoginController* (unit test mencakup fungsi pendukung autentikasi di `src/types/allowed-domains.ts` dan `src/services/pelaporService.ts`; alur login pada `src/app/login/actions.tsx` diuji melalui pengujian integrasi `INT-TC01` s.d. `INT-TC03`)  
**Tingkat:** *Mendalam*

Tabel 4.2.6. Hasil Pengujian Unit Kelas C19

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C19-UT01* | *`isAllowedEmail(email)`* | *Normal & Batas* | *Email domain resmi ITB (`@mahasiswa.itb.ac.id`, `@std.stei.itb.ac.id`, `@staff.itb.ac.id`, `@itb.ac.id`) termasuk huruf kapital `@MAHASISWA.ITB.AC.ID`* | *Seluruhnya mengembalikan `true`* | *Seluruhnya mengembalikan `true`* | *Pass* |
| *C19-UT02* | *`isAllowedEmail(email)`* | *Negatif* | *Email `user@gmail.com`, `fake@itb.ac.id.evil.com`, `""`, dan `"tanpa-at-sign"`* | *Seluruhnya mengembalikan `false`* | *Seluruhnya mengembalikan `false`* | *Pass* |
| *C19-UT03* | *`resolvePelaporAuthContext()`* | *Normal* | *Sesi Supabase dengan `app_metadata.role = "admin"` serta akun tanpa metadata berdomain `@staff.itb.ac.id`* | *Masing-masing mengembalikan `role = "admin"` dan `role = "petugas"`* | *Mengembalikan `role = "admin"` dan `role = "petugas"`* | *Pass* |
| *C19-UT04* | *`resolvePelaporAuthContext()`* | *Batas (Role Tak Dikenal)* | *Sesi dengan `user_metadata: { role: "superuser", id_pelapor: 12 }`* | *Fallback aman ke `role = "pelapor"` dengan `idPelapor = 12`* | *Mengembalikan `role = "pelapor"` dan `idPelapor = 12`* | *Pass* |
| *C19-UT05* | *`resolvePelaporAuthContext()`* | *Negatif (Auth Error / Timeout)* | *Client tanpa properti `auth` dan `supabase.auth.getUser()` mengembalikan error `"Auth timeout / token expired"`* | *Keduanya melempar `PelaporServiceError` (`UNAUTHORIZED`, status `401`)* | *Keduanya melempar `PelaporServiceError` (`UNAUTHORIZED`, 401)* | *Pass* |
| *C19-UT06* | *`getMyPelaporProfileService()` & `getPelaporByIdService()`* | *Normal & Keamanan Privasi* | *Pemilik akun (`id = 7`) vs pelapor lain (`id = 99`) mengakses profil pelapor `7`* | *Pemilik mendapat data lengkap (termasuk `nimnipPelapor`); pelapor lain hanya mendapat data publik (tanpa `nimnipPelapor`)* | *Pemilik menerima `nimnipPelapor`; pelapor lain hanya menerima data publik (`namaPelapor = "Kenzo"`)* | *Pass* |
| *C19-UT07* | *`parseAndValidateIdPelapor()` & `getPelaporByIdService()`* | *Negatif* | *ID `"abc"` dan profil `id = 999` (tidak ditemukan)* | *Melempar `INVALID_PELAPOR_ID` (`400`) dan `PELAPOR_NOT_FOUND` (`404`)* | *Keduanya melempar `PelaporServiceError` dengan kode dan status HTTP sesuai* | *Pass* |

Khusus kelas **Mendalam**:

Tabel 4.2.6b. Ringkasan Cakupan Kelas C19

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `validateITBLogin()`, `validateNormalLogin()`, `getRole()` (diimplementasikan melalui `isAllowedEmail()`, `resolvePelaporAuthContext()`, `getMyPelaporProfileService()`, `getPelaporByIdService()`, serta Server Actions `loginWithPass()` dan `loginByITBEmail()` yang diuji integrasinya pada `INT-TC01` s.d. `INT-TC03`) |
| Operasi yang diuji | `isAllowedEmail()`, `resolvePelaporAuthContext()`, `parseAndValidateIdPelapor()`, `getMyPelaporProfileService()`, `getPelaporByIdService()` |
| ID Algoritma yang tercakup | `Algo-027` dan `Algo-028` tercakup sebagian: unit test hanya menguji pembatasan domain email ITB dan penanganan error sesi autentikasi. Pengiriman OTP dan verifikasi SSO melalui layanan eksternal diuji pada pengujian integrasi `INT-TC01` s.d. `INT-TC03` |
| Coverage (wajib ≥ 70%) | **`allowed-domains.ts`: 100.00% line / 75.00% branch**; **`pelaporService.ts`: 85.49% line / 77.19% branch / 85.71% funcs** (`npx tsx --test --experimental-test-coverage tests/login.test.ts`, bukti pada 4.6) |

<br>

## 4.3 Pengujian Integrasi

Pengujian integrasi memeriksa interaksi antarkomponen yang melewati batas, yaitu *Controller* ke *Model*, aplikasi ke basis data, dan aplikasi ke sistem eksternal. Daftar antarmuka mengacu pada dokumen DPPL, dengan minimal satu test case untuk setiap antarmuka. Pengujian memakai komponen nyata, bukan *mock*. Apabila ada antarmuka tambahan yang belum didaftarkan pada dokumen DPPL, cantumkan juga.

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| *I-01* | *HalamanLogin* | *LoginController(loginWithPass, loginByITBEmail, POST/api/auth/login)* | *Client - Server* | *INT-TC01, INT-TC03, INT-TC04* |
| *I-02* | *LoginController* | *Supabase Auth (password & OAuth Google)* | *Aplikasi - Sistem eksternal* | *INT-TC01, INT-TC02, INT-TC03, INT-TC05, INT-TC06* |
| *I-03* | *Supabase Auth / Google* | */auth/callback* | *Sistem eksternal - Aplikasi* | *INT-TC06, INT-TC07, INT-TC08* |
| *I-04* | *resolveRole/getRole* | *Database pelapor + Supabase Auth Admin* | *Aplikasi - Basis data* | *INT-TC09, INT-TC10* |
| *I-05* | *proxy.ts* | *Supabase Auth (getUser) + ROUTE_ROLES* | *Middleware-Sistem eksternal* | *INT-TC11, INT-TC12* |
| *I-06* | *LaporanController* | *Modul Laporan -> Database* | *Controller - Model - DB* | *INT-TC13 -- INT-TC16* |
| *I-07* | *LaporanController(upload)* | *Supabase storage* | *Aplikasi - Sistem eksternal* | *INT-TC17 -- INT-TC20* |
| *I-08* | *TanggapanController* | *Database (Status + poin)* | *Controller - DB* | *INT-TC21 -- INT-TC26* |
| *I-09* | *TanggapanController* | *NotifikasiController -> Database* | *Antarmodul* | *INT-TC27 -- INT-TC29* |
| *I-10* | *LikeController* | *Database (Likes)* | *Controller - DB* | *INT-TC30 -- INT-TC34* |
| *I-11* | *LeaderboardController* | *Database (pelapor)* | *Controller - DB* | *INT-TC35 -- INT-TC37* |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *INT-TC01* | *I-01, I-02* | *Normal: login password valid* | *Submit form login dengan akun uji* | *Cookie sesi terbentuk, redirect ke START_PAGE[role] (pelapor -> HalamanLaporan)* | *Tidak dapat diuji karena seluruh akun melalui OAuth Google, sehingga tidak memiliki password* | *FAIL* |
| *INT-TC02* | *I-02* | *Gagal: Password salah* | *Submit form dengan password salah* | *Redirect ke /error, tidak ada cookie sesi* | *Tidak dapat diuji karena seluruh akun melalui OAuth Google, sehingga tidak memiliki password* | *FAIL* |
| *INT-TC03* | *I-01, I-02* | *Normal: API login* | *POST /api/auth/login {email, password} valid* | *200, success: true, ada data.userId* | *Tidak dapat diuji karena seluruh akun melalui OAuth Google, sehingga tidak memiliki password* | *FAIL* |
| *INT-TC04* | *I-01* | *Gagal: field kosong* | *POST tanpa password* | *400, INVALID_LOGIN_CREDENTIALS* | *Server mengembalikan status 400 dengan code INVALID_LOGIN_CREDENTIALS dan pesan "Email dan password wajib diisi"* | *Pass* |
| *INT-TC05* | *I-02* | *Gagal: kredensial salah* | *POST password salah* | *401, INVALID_LOGIN_CREDENTIALS* | *Server mengembalikan status 401 dengan code INVALID_LOGIN_CREDENTIALS, permintaan ditolak oleh Supabase Auth* | *Pass* |
| *INT-TC06* | *I-02, I-03* | *Normal: login Google dengan email ITB* | *Klik "Sign in with Google", pilih akun @itb.ac.id* | *Callback menukar code menjadi sesi, redirect ke halaman awal sesuai peran* | *Alur OAuth Google berhasil, /auth/callback?code=... mengembalikan 307 ke /HalamanLaporan (200), cookie sesi sb-...-auth-token terbentuk untuk akun @itb.ac.id* | *Pass* |
| *INT-TC07* | *I-03* | *Gagal: login Google dengan email non-ITB* | *Klik "Sign in with Google", pilih akun @gmail.com* | *Redirect ke /error (isAllowedEmail bernilai false)* | *Alur OAuth Google selesai, /auth/callback?code=... mengarahkan pengguna ke /error karena domain email bukan ITB* | *Pass* |
| *INT-TC08* | *I-03* | *Gagal: callback tanpa code* | *GET /auth/callback tanpa parameter code* | *Redirect ke /login?error=nocode* | *Server mengembalikan status 307 dengan header location /login?error=nocode* | *Pass* |
| *INT-TC09* | *I-04* | *Normal: login pertama pelapor baru* | *Login dengan akun yang belum ada di tabel pelapor* | *Baris baru di tabel pelapor (nim_nip dari email), app_metadata.role = pelapor* | *Login berhasil dan diarahkan ke /HalamanLaporan. GET /api/pelapor/me mengembalikan 200 dengan data akun baru (email, NIM, nama, poin 0) yang dibaca dari tabel pelapor. /HalamanFormulirLaporan (khusus role pelapor) dapat diakses, membuktikan app_metadata.role = pelapor. Bukti diambil melalui API dan proxy aplikasi* | *Pass* |
| *INT-TC10* | *I-04* | *Normal: penentuan peran petugas* | *Login dengan akun @staff.itb.ac.id* | *Role = petugas, redirect ke HalamanTanggapanLaporan* | *Login berhasil, /auth/callback?code=... mengarahkan ke /HalamanTanggapanLaporan (200), yaitu halaman awal untuk role petugas, sehingga role = petugas terbukti* | *Pass* |
| *INT-TC11* | *I-05* | *Gagal: akses tanpa sesi* | *Buka /HalamanLaporan tanpa cookie sesi* | *Redirect ke /login* | *Server mengembalikan status 307 dengan header location /login, halaman tidak dapat diakses tanpa sesi* | *Pass* |
| *INT-TC12* | *I-05* | *Gagal: peran tidak sesuai* | *Pelapor membuka halaman khusus petugas (HalamanTanggapanLaporan)* | *Akses ditolak/dialihkan sesuai ROUTE_ROLES* | *Status 307 dengan location /HalamanLaporan, pelapor dialihkan ke halaman awalnya dan tidak dapat membuka halaman tanggapan* | *Pass* |
| *INT-TC13* | *I-06* | *Normal: buat laporan* | *POST /api/laporan (cookie pelapor) dengan judul, deskripsi valid, dan foto JPEG, lalu cek tabel laporan* | *201, baris baru di tabel laporan dengan judul/deskripsi sama, id_pelapor sesuai akun, status diproses, moderasi menunggu* | *201, laporan id 21 tersimpan dengan judul/deskripsi sama, status diproses, moderasi menunggu, foto tersimpan di Storage. Namun id_pelapor bernilai null (tidak terhubung ke akun pelapor). Penyebab: id pelapor dibaca dari user/app_metadata.id_pelapor yang tidak pernah diisi saat login. Usulan: isi app_metadata.id_pelapor pada resolveRole atau cari pelapor berdasarkan email* | *Fail* |
| *INT-TC14* | *I-06* | *Gagal: deskripsi lebih dari 300 karakter* | *POST /api/laporan dengan deskripsi 301 karakter* | *400, DESKRIPSI_TOO_LONG, tidak ada baris baru di tabel laporan* | *400, DESKRIPSI_TOO_LONG, tidak ada laporan baru yang tersimpan* | *Pass* |
| *INT-TC15* | *I-06* | *Gagal: deskripsi kosong* | *POST /api/laporan dengan deskripsi berisi spasi saja* | *400, INVALID_LAPORAN_DESKRIPSI, tidak ada baris baru di tabel laporan* | *400, INVALID_LAPORAN_DESKRIPSI, tidak ada laporan baru yang tersimpan* | *Pass* |
| *INT-TC16* | *I-06* | *Normal: baca laporan* | *GET /api/laporan dan GET /api/laporan/{id}* | *200, data yang dikembalikan sama dengan baris di tabel laporan* | *200, GET /api/laporan/21 dan GET /api/laporan mengembalikan data yang sama dengan laporan yang tersimpan* | *Pass* |
| *INT-TC17* | *I-07* | *Normal: upload foto JPEG/PNG* | *POST /api/laporan/upload dengan foto kurang dari 10 MB* | *201, file muncul di bucket laporan-foto, URL publik dapat dibuka* | *201, file tersimpan di bucket laporan-foto dan URL publik dapat dibuka (200, image/jpeg)* | *Pass* |
| *INT-TC18* | *I-07* | *Gagal: format file salah* | *POST /api/laporan/upload dengan file .pdf* | *400, INVALID_FOTO_TYPE, tidak ada file baru di bucket* | *400, INVALID_FOTO_TYPE* | *Pass* |
| *INT-TC19* | *I-07* | *Gagal: ukuran file terlalu besar* | *POST /api/laporan/upload dengan foto lebih dari 10 MB* | *400, FOTO_TOO_LARGE, tidak ada file baru di bucket* | *400, FOTO_TOO_LARGE* | *Pass* |
| *INT-TC20* | *I-07* | *Gagal: tanpa file* | *POST /api/laporan/upload tanpa field foto* | *400, MISSING_FOTO_FILE atau EMPTY_FOTO_FILE* | *400, MISSING_FOTO_FILE* | *Pass* |
| *INT-TC21* | *I-08* | *Normal: tanggapan status valid* | *POST /api/laporan/{id}/tanggapan (cookie petugas) dengan status valid pada laporan yang belum pernah divalidasi* | *200, status laporan berubah, points_awarded = true, poin pelapor bertambah 1 di tabel pelapor* | *200, status laporan berubah menjadi valid, tetapi pointsAwarded = false dan poin pelapor tidak bertambah (poinDitambahkan = 0). Penyebab: laporan tidak memiliki id_pelapor (lihat INT-TC13) sehingga tidak ada pelapor yang menerima poin* | *Fail* |
| *INT-TC22* | *I-08* | *Batas: validasi ulang laporan yang sama* | *Kirim status valid/selesai lagi ke laporan pada INT-TC21* | *Status laporan berubah, poin pelapor tidak bertambah lagi* | *200, status berubah menjadi selesai dan poin tidak bertambah. Aturan poin tidak diberikan dua kali belum dapat dibuktikan karena poin pada INT-TC21 juga tidak diberikan* | *Tidak dapat dinilai* |
| *INT-TC23* | *I-08* | *Normal: tanggapan status ditolak* | *POST tanggapan dengan status ditolak pada laporan uji lain* | *200, status laporan berubah menjadi ditolak, poin pelapor tetap* | *200, status laporan id 22 berubah menjadi ditolak, poin pelapor tetap* | *Pass* |
| *INT-TC24* | *I-08* | *Gagal: pengirim bukan petugas* | *POST tanggapan dengan cookie pelapor* | *403, FORBIDDEN, data di basis data tidak berubah* | *403, FORBIDDEN, status laporan tidak berubah* | *Pass* |
| *INT-TC25* | *I-08* | *Gagal: laporan tidak ditemukan* | *POST tanggapan ke id laporan yang tidak ada* | *404, LAPORAN_NOT_FOUND* | *404, LAPORAN_NOT_FOUND* | *Pass* |
| *INT-TC26* | *I-08* | *Gagal: status kosong* | *POST tanggapan tanpa status* | *400, INVALID_STATUS_LAPORAN* | *400, INVALID_STATUS_LAPORAN* | *Pass* |
| *INT-TC27* | *I-09* | *Normal: notifikasi saat laporan valid* | *Setelah INT-TC21, GET /api/notifikasi dengan cookie pelapor pemilik laporan* | *Baris baru di tabel notifikasi berisi pesan laporan dinyatakan valid dan memperoleh +1 poin* | *Tanggapan pada INT-TC21 tidak membuat notifikasi (notifikasiSent = false) karena laporan tidak memiliki id_pelapor. GET /api/notifikasi dengan sesi pelapor yang valid mengembalikan 401 UNAUTHORIZED (Profil pelapor tidak ditemukan pada sesi login) karena app_metadata.id_pelapor tidak ada* | *Fail* |
| *INT-TC28* | *I-09* | *Normal: notifikasi saat laporan ditolak* | *Setelah INT-TC23, GET /api/notifikasi dengan cookie pelapor pemilik laporan* | *Baris baru di tabel notifikasi berisi pesan laporan tidak dapat diproses (status: ditolak)* | *Tanggapan pada INT-TC23 tidak membuat notifikasi (notifikasiSent = false). GET /api/notifikasi dengan sesi pelapor yang valid mengembalikan 401 UNAUTHORIZED. Penyebab sama dengan INT-TC27* | *Fail* |
| *INT-TC29* | *I-09* | *Gagal: akses notifikasi tanpa sesi* | *GET /api/notifikasi tanpa cookie sesi* | *401, UNAUTHORIZED* | *401, UNAUTHORIZED (Pengguna belum terautentikasi)* | *Pass* |
| *INT-TC30* | *I-10* | *Normal: memberi like* | *POST /api/like (cookie pelapor) ke laporan uji* | *201, baris baru di tabel likes, jumlah like laporan bertambah 1* | *201, liked = true, jumlahLike laporan menjadi 1* | *Pass* |
| *INT-TC31* | *I-10* | *Gagal: like dua kali* | *POST /api/like yang sama sekali lagi* | *409, DUPLICATE_LIKE, tetap 1 baris di tabel likes, jumlah like tidak berubah* | *409, DUPLICATE_LIKE, jumlah like tidak berubah* | *Pass* |
| *INT-TC32* | *I-10* | *Normal: membatalkan like* | *DELETE /api/like pada laporan yang sudah di-like* | *200, baris di tabel likes terhapus, jumlah like laporan berkurang 1* | *200, liked = false, jumlahLike laporan kembali menjadi 0* | *Pass* |
| *INT-TC33* | *I-10* | *Gagal: membatalkan like yang belum ada* | *DELETE /api/like sekali lagi* | *404, LIKE_NOT_FOUND* | *404, LIKE_NOT_FOUND* | *Pass* |
| *INT-TC34* | *I-10* | *Gagal: petugas memberi like* | *POST /api/like dengan cookie petugas* | *403, FORBIDDEN* | *403, FORBIDDEN* | *Pass* |
| *INT-TC35* | *I-11* | *Normal: mengambil 20 peringkat teratas* | *GET /api/leaderboard* | *200, maksimal 20 entri, urutan dan poin sama dengan tabel pelapor yang diurutkan berdasarkan poin* | *200, 9 entri (kurang dari 20) terurut menurun berdasarkan poin (120, 80, 0, ...) dengan rank 1 s.d. 9* | *Pass* |
| *INT-TC36* | *I-11* | *Normal: mengambil peringkat sendiri* | *GET /api/leaderboard/me (cookie pelapor)* | *200, rank sesuai posisi di tabel pelapor, inTop20 bernilai benar* | *200, idPelapor 11 rank 8, inTop20 = true, sesuai posisi pada hasil INT-TC35* | *Pass* |
| *INT-TC37* | *I-08, I-11* | *Alur: peringkat berubah setelah poin bertambah* | *Jalankan INT-TC21, lalu GET /api/leaderboard/me lagi* | *Poin pelapor bertambah 1 dan rank menyesuaikan data di tabel pelapor* | *Poin pelapor sebelum dan sesudah INT-TC21 tetap 0 dan rank tetap 8. Penyebab: poin tidak diberikan pada INT-TC21 (lihat INT-TC13)* | *Fail* |

<br>

## 4.4 Pengujian Use Case

Pengujian use case dilakukan pada seluruh skenario normal dan alternatif sesuai Subbab 4.4 SKPL, dengan minimal satu test case untuk setiap skenario. Kolom ID KF menunjukkan KF yang diverifikasi oleh test case tersebut.

### 4.4.1 Use Case Melakukan Pelaporan

**ID Use Case:** *UC01*  
**Nama Use Case:** *Melakukan pelaporan*

Tabel 4.4.1. Hasil Pengujian Use Case [UC01]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC01-TC01* | *KF03* | *Normal* | *1. Buka halaman formulir laporan.<br>2. Masukkan judul, deskripsi, lokasi masalah, dan foto.<br>3. Klik tombol "Submit Report".* | *Judul: Help me the toilet is clogged<br>Deskripsi: anaxaaaaaaaaaaaa<br>Lokasi masalah: Labtek V Lantai 2<br>Foto dengan size dibawah 10mb dan merupakan file .jpg* | *Laporan berhasil dikirim ke database sebagai daftar laporan untuk ditanggapi Petuags atau Admin.* | *Laporan berhasil dikirim ke database sebagai daftar laporan untuk ditanggapi Petuags atau Admin sesuai hasil yang diharapkan.* | *Pass.* |
| *UC01-TC02* | *KF03* | *Alternatif 1: Laporan Tidak Valid Secara Teknis* | *1. Buka halaman formulir laporan.<br>2. Kosongkan judul, tetapi mengisi deskripsi, lokasi masalah, dan foto.<br>3. Klik tombol "Submit Report".* | *Judul: NULL<br>Deskripsi: anaxaaaaaaaaaaaa<br>Lokasi masalah: Labtek V Lantai 2<br>Foto dengan size dibawah 10mb dan merupakan file .jpg* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ dengan aspek teknis yang tidak terpenuhi sesuai hasil yang diharapakan* | *Fail, walaupun judul kosong, laporan tetap dikirim ke database sehingga tidak ada pesar _error_. Solusinya adalah memvalidasikan apakah judul mempunyai isi saat pelapor klik tombol "Submit Report" sebelum laporan dikirim agar sesuai dan tidak kekurangan sesuatu.* |
| *UC01-TC03* | *KF03* | *Alternatif 1: Laporan Tidak Valid Secara Teknis* | *1. Buka halaman formulir laporan.<br>2. Mengisi deskripsi melebihi batas karakter, mengisi judul, lokasi masalah, dan foto.<br>3. Klik tombol "Submit Report".* | *Judul: Help  me the toilet is clogged<br>Deskripsi: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa4aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa5aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa6aaaaaaaaaa<br>Lokasi masalah: Labtek V Lantai 2<br>Foto dengan size dibawah 10mb dan merupakan file .jpg* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi sesuai hasil yang diharapakan* | *Pass, pelapor tidak dapat melebihi 300 karakter di deskripsi.* |
| *UC01-TC04* | *KF03* | *Alternatif 1: Laporan Tidak Valid Secara Teknis* | *1. Buka halaman formulir laporan.<br>2. Mengisi judul, deskripsi, dan foto, tetapi membiarkan lokasi masalah kosong.<br>3. Klik tombol "Submit Report".* | *Judul: Help me the toilet is clogged<br>Deskripsi: anaxaaaaaaaaaaaa<br>Lokasi masalah: -<br>Foto dengan size dibawah 10mb dan merupakan file .jpg* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi sesuai hasil yang diharapakan* | *Fail, walaupun lokasi masalah kosong, laporan tetap dikirim ke database sehingga tidak ada pesar _error_. Solusinya adalah memvalidasikan apakah lokasi masalah mempunyai isi saat pelapor klik tombol "Submit Report" sebelum laporan dikirim agar sesuai dan tidak kekurangan sesuatu.* |
| *UC01-TC05* | *KF03* | *Alternatif 1: Laporan Tidak Valid Secara Teknis* | *1. Buka halaman formulir laporan.<br>2. Tidak memberi foto dan mengisi judul, deskripsi, dan lokasi masalah.<br>3. Klik tombol "Submit Report".* | *Judul: Help me the toilet is clogged<br>Deskripsi: anaxaaaaaaaaaaaa<br>Lokasi masalah: Labtek V Lantai 2<br>Foto dikosongkan* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi sesuai hasil yang diharapakan* | *Pass, tetapi error tidak menunjukkan aspek teknis yang tidak terpenuhi* |

### 4.4.2 Use Case Memberikan Status Laporan

**ID Use Case:** *UC02*  
**Nama Use Case:** *Memberikan status laporan*

Tabel 4.4.2. Hasil Pengujian Use Case [UC02]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC02-TC01* | *KF04, KF05* | *Normal* | *1. Log in dengan akun petugas.<br>2. Buka halaman daftar laporan.<br>3. Ubah status di satu laporan.<br>4. Klik tombol "Submit".* | *Mengganti salah satu laporan status unverified ke status ongoing* | *Laporan tersebut dimasukkan ke daftar laporan ongoing, mengirimkan notifikasi dan menambahkan poin ke pelapor yang berkaitan, dan laporan tersebut dapat dilihat di halaman laporan.* | *Laporan tersebut dimasukkan ke daftar laporan ongoing, mengirimkan notifikasi, menambahkan poin ke pelapor yang berkaitan dan laporan tersebut dapat dilihat di halaman laporan sesuai hasil yang diharapkan.* | *Fail, laporan berhasil dimasukkan ke daftar laporan ongoing tetapi tidak mengirim notifikasi dan menambah poin. Tidak ada notifikasi disebabkan oleh HalamanTanggapanLaporan tidak mempunyai fungsi sendNotifikasi() yang seharusnya ada sehingga tidak ada notifikasi yang terkirim setiap perubahan status. Tidak ada penambahan poin disebabkan oleh addPoin() adalah fungsi asynchronous, tetapi fungsinya dipanggil tanpa await() sehingga penambahan poin tidak bekerja.* |
| *UC02-TC02* | *KF04, KF05* | *Normal* | *1. Log in dengan akun petugas.<br>2. Buka halaman daftar laporan.<br>2. Ubah status di satu laporan.<br>3. Klik tombol "Submit".* | *Mengganti salah satu laporan status ongoing ke status denied* | *Laporan tersebut dimasukkan ke daftar laporan denied dan mengirimkan notifikasi ke pelapor yang berkaitan.* | *Laporan tersebut dimasukkan ke daftar laporan denied dan mengirimkan notifikasi ke pelapor yang berkaitan sesuai hasil yang diharapkan.* | *Fail, laporan berhasil dimasukkan ke daftar laporan denied tetapi tidak mengirim notifikasi. Tidak ada notifikasi disebabkan oleh HalamanTanggapanLaporan tidak mempunyai fungsi sendNotifikasi() yang seharusnya ada sehingga tidak ada notifikasi yang terkirim setiap perubahan status.* |
| *UC02-TC03* | *KF04, KF05* | *Alternatif 1: Admin Melakukan Validasi Administratif / Moderasi* | *1. Log in dengan akun admin.<br>2. Buka halaman daftar laporan.<br>2. Ubah status di satu laporan dan menambahkan tanggapan.<br>3. Klik tombol "Submit".* | *Mengganti salah satu laporan status denied ke status ongoing<br>Tanggapan: Laporan terbukti benar.* | *Laporan tersebut dimasukkan ke daftar laporan ongoing, mengirimkan notifikasi dan poin ke pelapor yang berkaitan, dan laporan tersebut dapat dilihat di halaman laporan.* | *Laporan tersebut dimasukkan ke daftar laporan ongoing, mengirimkan notifikasi dan poin ke pelapor yang berkaitan, dan laporan tersebut dapat dilihat di halaman laporan sesuai hasil yang diharapkan.* | *Fail, laporan berhasil dimasukkan ke daftar laporan ongoing tetapi tidak mengirim notifikasi dan menambah poin. Tidak ada notifikasi disebabkan oleh HalamanTanggapanLaporan tidak mempunyai fungsi sendNotifikasi() yang seharusnya ada sehingga tidak ada notifikasi yang terkirim setiap perubahan status. Tidak ada penambahan poin disebabkan oleh addPoin() adalah fungsi asynchronous, tetapi fungsinya dipanggil tanpa await() sehingga penambahan poin tidak bekerja.* |
| *UC02-TC04* | *KF04, KF05* | *Alternatif 1: Admin Melakukan Validasi Administratif / Moderasi* | *1. Log in dengan akun admin.<br>2. Buka halaman daftar laporan.<br>2. Ubah status di satu laporan dan menambahkan tanggapan.<br>3. Klik tombol "Submit".* | *Mengganti salah satu laporan status ongoing ke status denied<br>Tanggapan: Fotonya tidak berhubungan dengan laporan.* | *Laporan tersebut dimasukkan ke daftar laporan denied dan mengirimkan notifikasi ke pelapor yang berkaitan.* | *Laporan tersebut dimasukkan ke daftar laporan denied dan mengirimkan notifikasi ke pelapor yang berkaitan sesuai hasil yang diharapkan.* | *Fail, laporan berhasil dimasukkan ke daftar laporan denied tetapi tidak mengirim notifikasi. Tidak ada notifikasi disebabkan oleh HalamanTanggapanLaporan tidak mempunyai fungsi sendNotifikasi() yang seharusnya ada sehingga tidak ada notifikasi yang terkirim setiap perubahan status.* |

### 4.4.3 Use Case Memberi dan Membatalkan Like

**ID Use Case:** *UC03*  
**Nama Use Case:** *Memberi dan membatalkan like*

Tabel 4.4.3. Hasil Pengujian Use Case [UC03]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC03-TC01* | *KF06, KF08* | *Normal* | *1. Log in dengan akun pelapor.<br>2. Buka halaman laporan.<br>3. Klik tombol like pada salah satu laporan yang belum pernah di-like sebelumnya.* | *Klik tombol like sekali.* | *Jumlah like pada laporan tersebut bertambah satu.* | *Jumlah like pada laporan tersebut bertambah satu sesuai hasil yang diharapkan.* | *Pass* |
| *UC03-TC02* | *KF06, KF08* | *Alternatif 1: Membatalkan Like* | *1. Log in dengan akun pelapor.<br>2. Buka halaman laporan.<br>3. Klik tombol like pada salah satu laporan yang sudah di-like sebelumnya.* | *Klik tombol like sekali.* | *Jumlah like pada laporan tersebut berkurang satu.* | *Jumlah like pada laporan tersebut berkurang satu sesuai hasil yang diharapkan.* | *Pass* |
| *UC03-TC03* | *KF06, KF07, KF08* | *Alternatif 1: Membatalkan Like* | *1. Log in dengan akun pelapor.<br>2. Buka halaman laporan.<br>3. Klik tombol like pada salah satu laporan yang sudah di-like sebelumnya.* | *Klik tombol like tiga kali.* | *Jumlah like pada laporan tersebut berkurang satu.* | *Jumlah like pada laporan tersebut bertambah satu sesuai hasil yang diharapkan.* | *Pass* |

### 4.4.4 Use Case Memperoleh Poin

**ID Use Case:** *UC04*  
**Nama Use Case:** *Memperoleh poin*

Tabel 4.4.4. Hasil Pengujian Use Case [UC04]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC04-TC01* | *KF10, KF11* | *Normal* | *1. Log in dengan akun pelapor.<br>2. Menunggu laporan divalidasi.<br>3. Laporan divalidasi dengan status ongoing.* | *Mengirimkan laporan yang valid secara teknis dan secara etika.* | *Jumlah poin akun bertambah.* | *Jumlah poin akun bertambah sesuai hasil yang diharapkan.* | *Fail, laporan berhasil dimasukkan ke daftar laporan ongoing tetapi tidak menambah poin. Tidak ada penambahan poin disebabkan oleh addPoin() adalah fungsi asynchronous, tetapi fungsinya dipanggil tanpa await() sehingga penambahan poin tidak bekerja.* |
| *UC04-TC02* | *KF10, KF11* | *Alternatif 1: Laporan Tidak Lolos Validasi oleh Admin atau Petugas* | *1. Log in dengan akun pelapor.<br>2. Menunggu laporan divalidasi.<br>3. Laporan divalidasi dengan status denied.* | *Mengirimkan laporan yang tidak valid secara teknis ataupun secara etika.* | *Jumlah poin tetap sama.* | *Jumlah poin tetap sama sesuai hasil yang diharapkan.* | *Pass.* |

<br>

## 4.5 Pengujian Kebutuhan Non-Fungsional (KNF)

Tabel 4.5. Hasil Pengujian KNF

| ID Pengujian | ID KNF | Parameter | Target Terukur | Metode dan Alat | Hasil Aktual | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *KNF01-TC01* | *KNF01* | *Portability* | *Ketika pengguna ingin melapor dengan mengakses sistem APATIS, sistem dapat mengarahkan pengguna untuk masuk dengan mudah dan cepat serta menampilkan tampilan antarmuka yang sesuai dan memproses input secara konsisten meskipun melalui berbagai macam browser.* | *Membuka APATIS melalui browser yang berbeda-beda (Chrome, Edge, Firefox)* | *Setiap halaman memiliki tampilan yang cukup konsisten secara tata letak, sistem responsif dan cepat, input (seperti melakukan like, membuat laporan, merespons laporan, dan sebagainya) diproses dengan baik. Terdapat sedikit perbedaan pada ukuran teks, tampilan font, dan sebagainya, tetapi hal ini wajar dalam browser yang berbeda.* | *Pass* |
| *KNF02-TC01* | *KNF02* | *Response time* | *Ketika pengguna mencoba untuk masuk ke sistem APATIS, sistem melakukan verifikasi pengguna dan menampilkan keterangan berhasil atau gagal selambat-lambatnya 5 detik setelah pengajuan login dilakukan* | *Melakukan tes pengukuran waktu manual sebanyak 5 kali melalui DevTools di Microsoft Edge dan dari _tab_ network.* | *Pengukuran akan berupa total waktu login dan menampilkan halaman pertama (termasuk indikasi berhasil atau gagal). Tes 1: 2.79 detik. Tes 2: 3.84 detik. Tes 3: 3.07 detik. Tes 4: 3.45 detik. Tes 5: 3.02 detik. Rata-rata: 3.234 detik.* | *Pass* |
| *KNF03-TC01* | *KNF03* | *Response time* | *Ketika pengguna mengirimkan laporan, sistem harus bisa menampilkan keterangan sukses atau gagal selambat-lambatnya 3 detik setelah laporan dikirim.* | *Microsoft Edge DevTools, tiga kali ukur untuk berhasil, 3 kali ukur untuk gagal, ambil rata-rata* | *Tes 1: 1.50 detik (status: gagal membuat laporan). Tes 2: 2.34 detik (gagal membuat laporan). Tes 3: 1.02 detik (gagal membuat laporan). Tes 4: 2.46 detik (berhasil membuat laporan). Tes 5: 2.77 detik (berhasil membuat laporan). Tes 6: 2.08 detik (berhasil membuat laporan). Rata-rata waktu jika gagal: 1.62 detik. Rata-rata waktu jika berhasil: 2.43 detik.* | *Pass* |
| *KNF04-TC01* | *KNF04* | *Availability* | *Sistem harus selalu beroperasi secara kontinu dengan minimal tingkat ketersediaan (uptime) sebesar 99%, kecuali pada saat jadwal pemiliharaan sistem .* | *Mengecek waktu _uptime_ APATIS web menggunakan halaman Cloudflare Workers dengan mengecek persentase _error rate_.* | *Error rate dari web adalah sebesar 0% selama _deployment_ terakhir, yakni sekitar 1 minggu yang lalu.* | *Pass* |
| *KNF05-TC01* | *KNF05* | *Security* | *Jika pengguna mengunggah file selain JPEG/PNG atau ukuran file melebihi 10 MB, maka sistem harus menolak unggahan tersebut dan menampilkan pesan kesalahan kepada pengguna. Hal ini diperlukan untuk mencegah pengguna mengunggah file berbahaya.* | *Mencoba untuk membuat laporan dengan file selain JPG/JPEG/PNG* | *Gagal membuat laporan dengan file .webp (validasi dari backend).* | *Pass* |
| *KNF05-TC02* | *KNF05* | *Security* | *Jika pengguna mengunggah file selain JPEG/PNG atau ukuran file melebihi 10 MB, maka sistem harus menolak unggahan tersebut dan menampilkan pesan kesalahan kepada pengguna. Hal ini diperlukan untuk mencegah pengguna mengunggah file berbahaya.* | *Mencoba mengirimkan foto yang lebih besar dari 10 MB.* | *Gagal mengirimkan foto berukuran 20 MB (validasi frontend)* | *Pass* |
| *KNF06-TC01* | *KNF06* | *Security* | *Sistem harus menampilkan informasi pengguna pada leaderboard yang hanya terbatas pada nama pengguna (username) dan total perolehan poin pelaporan. Saat halaman leaderboard dimuat oleh pengguna, sistem harus menyembunyikan seluruh data pribadi pengguna.* | *Mengecek HalamanLeaderboard secara visual dan melalui Microsoft Edge DevTools* | *Secara visual, HalamanLeaderboard hanya memuat setiap pelapor dengan nama, poin, dan foto profil pelapor. Pengecekan elemen HTML mealui Edge DevTools juga membuktikan bahwa hanya foto profil, nama, dan total poin pelapor yang ditampilkan.* | *Pass* |
| *KNF07-TC01* | *KNF07* | *Performance efficiency* | *Sistem harus memperbarui data peringkat pada leaderboard setiap 5 detik. Saat waktu memasuki pukul 00.00 WIB pada hari pertama setiap bulan kalender, sistem harus mengatur ulang (reset) seluruh akumulasi skor pada leaderboard ke angka nol.* | *Mengecek melalui Network Tab pada Edge DevTools untuk pembaruan, mengecek apakah terdapat algoritma atau _cron_ untuk pembaruan data leaderboard.* | *Tidak dapat mengecek pembaruan data peringkat karena kegagalan pada pemberian poin. Namun, secara logika kode, harusnya leaderboard sudah otomatis menampilkan data terbaru dan terurut berdasarkan jumlah poin setiap kali HalamanLeaderboard di-fetch atau di-reload. Tidak terdapat algoritma ataupun _cron_ pada Supabase yang memperbarui data HalamanLeaderboard atau tabel leaderboard. Hal ini merupakan kesalahan pada ketidaklengkapan implementasi seluruh KNF, walau hanya terjadi pada KNF07. Rencana perbaikannya adalah menambahkan algoritma atau _cron_ pada HalamanLeaderboard atau Supabase untuk menghapus data leaderboard sesuai KNF07 dan memperbaiki _bug_ yakni poin pelapor yang tidak berubah.* | *Fail* |

<br>

## 4.6 Tangkapan Layar dan Bukti Hasil Pengujian

Bukti pengujian dilampirkan sesuai ID Pengujian pada Subbab 4.2 sampai 4.5, berupa tangkapan layar aplikasi, keluaran *test runner*, laporan *coverage* untuk setiap kelas Mendalam, atau hasil alat ukur.

Tabel 4.6. Bukti Hasil Pengujian

| ID Pengujian | Bukti Hasil Pengujian |
| :--- | :--- |
| *C09-UT01 – C09-UT12 & C09 (coverage)* | ![Bukti Unit Test dan Coverage C09](./assets/C09_unit_test_coverage.png) |
| *C10-UT01 – C10-UT10 & C10 (coverage)* | ![Bukti Unit Test dan Coverage C10](./assets/C10_unit_test_coverage.png) |
| *C05-UT01 – C05-UT12 & C05 (coverage)* | ![Bukti Unit Test dan Coverage C05](./assets/C05_unit_test_coverage.png) |
| *C14-UT01 – C14-UT07 & C14 (coverage)* | ![Bukti Unit Test dan Coverage C14](./assets/C14_unit_test_coverage.png) |
| *C17-UT01 – C17-UT06* | ![Bukti Unit Test C17](./assets/C17_unit_test_coverage.png) |
| *C19-UT01 – C19-UT07 & C19 (coverage)* | ![Bukti Unit Test dan Coverage C19](./assets/C19_unit_test_coverage.png) |
| *INT-TC01* | *[Sisipkan bukti pengujian integrasi]* |
| *UC01-TC01* | <img alt="UC01-TC01" src="./assets/UC01-TC01.png" width="70%"> |
| *UC01-TC02* | <img alt="UC01-TC02" src="./assets/UC01-TC02.png" width="70%"> |
| *UC01-TC03* | <img alt="UC01-TC03" src="./assets/UC01-TC03.png" width="70%"> |
| *UC01-TC04* | <img alt="UC01-TC04" src="./assets/UC01-TC04.png" width="70%"> |
| *UC01-TC05* | <img alt="UC01-TC05" src="./assets/UC01-TC05.png" width="70%"> |
| *UC02-TC01* | <img alt="UC02-TC01" src="./assets/UC02-TC01.jpeg" width="70%"> |
| *UC02-TC02* | <img alt="UC02-TC02" src="./assets/UC02-TC02.jpeg" width="70%"> |
| *UC02-TC03* | <img alt="UC02-TC03" src="./assets/UC02-TC03.jpeg" width="70%"> |
| *UC03-TC01* | <img alt="UC03-TC01" src="./assets/UC03-TC01.png" width="70%"> |
| *UC03-TC02* | <img alt="UC03-TC02" src="./assets/UC03-TC02.png" width="70%"> |
| *UC03-TC03* | <img alt="UC03-TC03" src="./assets/UC03-TC03.png" width="70%"> |
| *UC04-TC01* | <img alt="UC04-TC01" src="./assets/UC04-TC01.png" width="70%"> |
| *UC04-TC02* | <img alt="UC04-TC02" src="./assets/UC04-TC02.png" width="70%"> |
| *KNF01-TC01* | ![KNF01-TC01-1](assets/bukti-knf01-tc01-1.png) ![KNF01-TC01-2](assets/bukti-knf01-tc01-2.png) ![KNF01-TC01-3](assets/bukti-knf01-tc01-3.png) |
| *KNF02-TC01* | ![KNF02-TC01-1](assets/bukti-knf02-tc01-1.png) ![KNF01-TC01-2](assets/bukti-knf02-tc01-2.png) ![KNF01-TC01-3](assets/bukti-knf02-tc01-3.png) |
| *KNF03-TC01* | ![KNF03-TC01-1](assets/bukti-knf03-tc01-1.png) ![KNF03-TC01-2](assets/bukti-knf03-tc01-2.png) ![KNF03-TC01-3](assets/bukti-knf03-tc01-3.png) ![KNF03-TC01-4](assets/bukti-knf03-tc01-4.png) |
| *KNF04-TC01* | ![KNF04-TC01-1](assets/bukti-knf04-tc01-1.png) |
| *KNF05-TC01* | ![KNF05-TC01-1](assets/bukti-knf05-tc01-1.png) ![KNF05-TC01-2](assets/bukti-knf05-tc01-2.png) |
| *KNF05-TC01* | ![KNF05-TC01-1](assets/bukti-knf05-tc01-1.png) |
| *KNF05-TC02* | ![KNF05-TC02-1](assets/bukti-knf05-tc02-1.png) |
| *KNF06-TC01* | ![KNF06-TC01-1](assets/bukti-knf06-tc01-1.png) ![KNF06-TC01-2](assets/bukti-knf06-tc01-2.png) |
| *KNF07-TC01* | Bukti adanya algoritma sorting dan fungsi yang menampilkan urutan leaderboard setiap kali HalamanLeaderboard di-_render_ ![KNF07-TC01-1](assets/bukti-knf07-tc01-1.png) Bukti tidak adanya _cron_ pada Supabase ![KNF07-TC01-2](assets/bukti-knf07-tc01-2.png) |

<br>

---

# BAB 5: Traceability

Petakan setiap KF ke KNF, use case, kelas perancangan, file implementasi, dan test case. Tabel traceability berikut akan menjadi sarana verifikasi KF. Setiap KF memiliki minimal satu test case dan dinyatakan terpenuhi apabila **seluruh** test case terkaitnya berkesimpulan `Pass`. KF yang tidak diimplementasikan tetap dicantumkan beserta alasannya.

Tabel 5.1. Matriks Kerunutan KF terhadap Implementasi dan Pengujian

| KF ID | KNF Terkait | Use Case ID | Kelas Terkait | Implementasi File Terkait | Test Case (UC) | Test Case (Unit/Integrasi/KNF) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *KF01* | *KNF01, KNF02* | *UC01* | *C18 - HalamanLogin, C19 - LoginController* | *app/api/auth/login/route.ts, app/auth/callback/route.ts, lib/supabase/server.ts, lib/supabase/client.ts* | *-* | *INT-TC01, INT-TC02, INT-TC03, KNF01-TC01, KNF02-TC01* |
| *KF02* | *KNF02* | *UC01* | *C18 - HalamanLogin, C19 - LoginController* | *app/api/auth/login/route.ts, app/auth/callback/route.ts, lib/supabase/server.ts, lib/supabase/client.ts* | *-* | *INT-TC01, INT-TC02, KNF02-TC01* |
| *KF03* | *KNF01, KNF03, KNF05* | *UC01* | *C01 - PelaporEntity, C02 - LaporanEntity, C04 - HalamanFormulirLaporan, C05 - LaporanController, C12 - DatabaseLaporanEntity* | *src/types/pelapor.ts, src/types/laporan.ts, src/app/(app)/HalamanFormulirLaporan/page.tsx, src/components/laporan/KartuFormLapor.tsx, src/services/laporanService.ts, Tabel Supabase `laporan`* | *-* | *KNF01-TC01, KNF03-TC01, KNF05-TC01, KNF05-TC02* |
| *KF04* | *-* | *UC02* | *C02 - LaporanEntity, C06 - AdminEntity, C07 - PetugasEntity, C08 - HalamanFormulirTanggapan, C09 - TanggapanController, C12 - DatabaseLaporanEntity* | *src/types/laporan.ts, C06 dan C07 tidak diimplementasikan sebagai kelas, src/app/(app)/(petugas)/HalamanDetailTanggapanLaporan/page.tsx, src/components/tanggapanlaporan/KartuTanggapanLaporan.tsx, src/services/tanggapanService.ts, Tabel Supabase `laporan`* | *UC01-TC01, UC01-TC02, UC01-TC03, UC01-TC04* | *-* |
| *KF05* | *-* | *UC03* | *C02 - LaporanEntity, C03 - HalamanLaporan, C12 - DatabaseLaporanEntity* | *src/types/laporan.ts, src/app/(app)/HalamanLaporan/page.tsx, src/components/layout/laporancard.tsx, Tabel Supabase `laporan`* | *UC02-TC01, UC02-TC02, UC02-TC03, UC02-TC04* | *-* |
| *KF06* | *-* | *UC03* | *C01 - PelaporEntity, C02 - LaporanEntity, C03 - HalamanLaporan, C10 - LikeController, C12 - DatabaseLaporanEntity* | *src/types/pelapor.ts, src/types/laporan.ts, src/app/(app)/HalamanLaporan/page.tsx, src/components/layout/laporancard.tsx, src/services/likeService.ts, Tabel Supabase `laporan`* | *UC02-TC01, UC02-TC02, UC02-TC03, UC02-TC04* | *-* |
| *KF07* | *-* | *UC03* | *C01 - PelaporEntity, C02 - LaporanEntity, C10 - LikeController, C12 - DatabaseLaporanEntity* | *src/types/pelapor.ts, src/types/laporan.ts, src/services/likeService.ts, Tabel Supabase `laporan`* | *UC03-TC01, UC03-TC02, UC03-TC03* | *-* |
| *KF08* | *-* | *UC03* | *C02 - LaporanEntity, C03 - HalamanLaporan, C10 - LikeController, C12 - DatabaseLaporanEntity* | *src/types/laporan.ts, src/app/(app)/HalamanLaporan/page.tsx, src/components/layout/laporancard.tsx, src/services/likeService.ts, Tabel Supabase `laporan`* | *UC03-TC03* | *-* |
| *KF09* | *-* | *UC02* | *C02 - LaporanEntity, C07 - PetugasEntity, C08 - HalamanFormulirTanggapan, C09 - TanggapanController, C12 - DatabaseLaporanEntity, C16 - HalamanNotifikasi, C17 - NotifikasiController* | *src/types/laporan.ts, C07 tidak diimplementasikan sebagai kelas (B.5), src/app/(app)/(petugas)/HalamanDetailTanggapanLaporan/page.tsx, src/components/tanggapanlaporan/KartuTanggapanLaporan.tsx, src/services/tanggapanService.ts, Tabel Supabase `laporan`, src/app/(app)/HalamanNotifikasi/page.tsx, src/components/layout/NotifCard.tsx, src/services/notifikasiService.ts* | *UC03-TC01, UC03-TC02, UC03-TC03* | *-* |
| *KF10* | *-* | *UC04* | *C01 - PelaporEntity, C09 - TanggapanController, C13 - DatabasePelaporEntity, C16 - HalamanNotifikasi, C17 - NotifikasiController* | *src/types/pelapor.ts, src/services/tanggapanService.ts, Tabel Supabase `pelapor`, src/app/(app)/HalamanNotifikasi/page.tsx, src/components/layout/NotifCard.tsx, src/services/notifikasiService.ts* | *-* | *-* |
| *KF11* | *-* | *UC04* | *C01 - PelaporEntity, C09 - TanggapanController, C11 - HalamanLeaderboard, C13 - DatabasePelaporEntity, C14 - LeaderboardController, C15 - HalamanAkun, C16 - HalamanNotifikasi, C17 - NotifikasiController* | *src/types/pelapor.ts, src/services/tanggapanService.ts, src/app/(app)/HalamanLeaderboard/page.tsx, src/components/layout/LbComponent.tsx, Tabel Supabase `pelapor`, src/services/leaderboardService.ts, src/app/(app)/HalamanAkun/page.tsx, src/components/layout/AccountCard.tsx, src/app/(app)/HalamanNotifikasi/page.tsx, src/components/layout/NotifCard.tsx, src/services/notifikasiService.ts* | *UC04-TC01, UC04-TC02* | *-* |
| *KF12* | *KNF06, KNF07	* | *UC04* | *C11 - HalamanLeaderboard, C13 - DatabasePelaporEntity, C14 - LeaderboardController, C15 - HalamanAkun* | *src/app/(app)/HalamanLeaderboard/page.tsx, src/components/layout/LbComponent.tsx, Tabel Supabase `pelapor`, src/services/leaderboardService.ts, src/app/(app)/HalamanAkun/page.tsx, src/components/layout/AccountCard.tsx* | *-* | *KNF06-TC01, KNF07-TC01* |
| *KF13* | *KNF07* | *UC04* | *C11 - HalamanLeaderboard, C13 - DatabasePelaporEntity, C14 - LeaderboardController* | *src/app/(app)/HalamanLeaderboard/page.tsx, src/components/layout/LbComponent.tsx, Tabel Supabase `pelapor`, src/services/leaderboardService.ts* | *-* | *KNF07-TC01* |
| *KF14* | *KNF07* | *UC04* | *C11 - HalamanLeaderboard, C13 - DatabasePelaporEntity, C14 - LeaderboardController* | *src/app/(app)/HalamanLeaderboard/page.tsx, src/components/layout/LbComponent.tsx, Tabel Supabase `pelapor`, src/services/leaderboardService.ts* | *-* | *KNF07-TC01* |

Tabel 5.2. Matriks Kerunutan KNF terhadap Pengujian

| ID KNF | Parameter | KF/UC Terkait | Test Case |
| :--- | :--- | :--- | :--- |
| *KNF01* | *Portability* | *KF01, KF03 / UC01* | *KNF01-TC01* |
| *KNF02* | *Response time* | *KF01, KF02 / UC01* | *KNF02-TC01* |
| *KNF03* | *Response time* | *KF03 / UC01* | *KNF03-TC01* |
| *KNF04* | *Availability* | *-* | *KNF04-TC01* |
| *KNF05* | *Security* | *KF03 / UC01* | *KNF05-TC01, KNF05-TC02* |
| *KNF06* | *Security* | *KF12 / UC04* | *KNF06-TC01* |
| *KNF07* | *Performance efficiency* | *KF12, KF13, KF14 / UC04* | *KNF07-TC01* |


