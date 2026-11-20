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
<i>Gambar 1. Swimlane Diagram APATIS</i>
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
| *Hardware* | *Laptop anggota tim* |
| *Operating System* | *Windows 11* |
| *Bahasa Pemrograman* | *TypeScript 5, Node.js v22.21.0 (npm 10.9.4)* |
| *Framework/Library* | *Next.js 16 (App Router, Turbopack), React 19.3.0, Tailwind CSS 4, shadcn/ui berbasis Base UI (@base-ui/react 1.9), Lucide React, class-variance-authority, tw-animate-css, Supabase JS 2 dan @supabase/ssr, OpenNext untuk Cloudflare* |
| *DBMS* | *Supabase (PostgreSQL 15)* |
| *Development Tools* | *Visual Studio Code, Git dan GitHub, Figma, ESLint, Prettier, Wrangler (Cloudflare Workers)* |
| *Testing Tools* | *Test runner bawaan Node.js dijalankan lewat tsx (`npm test`); tidak ada alat coverage???? PLISS NOTICE* |

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
| 10 | *lib/roles.ts, lib/utils.ts* | *Utilitas role dan fungsi bantu (cn)* |
| 11 | *types/role.ts, route-roles.ts, start-pages.ts, allowed-domains.ts* | *Tipe dan aturan akses halaman per role, halaman awal per role, dan domain email yang diizinkan* |
| 12 | *public/icon/*.svg, logoPutih.svg, Logo.png, dummy.svg, 3dotlb.svg, logout.svg* | *Aset ikon, logo, dan gambar dummy* |
| 13 | *public/zhcn.ttf, public/Mermaid1001.ttf* | *Berkas font HyWenHei dan Mermaid* |
| 14 | *public/_headers* | *Konfigurasi header HTTP untuk deployment Cloudflare* |
| 15 | *next.config.ts, components.json, package.json, tsconfig.json, eslint.config.mjs* | *File konfigurasi proyek P/L* |
| 16 | *.env.example* | *Contoh variabel lingkungan* |
| 17 | *tests/*.test.ts* | *Unit test* |
| 18 | *proxy.ts* | *Proteksi akses halaman dan sesi Supabase pada setiap request* |

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
| *C03* | *HalamanLaporan* | *Sedang* | *Kelas boundary yang menampilkan daftar laporan dan meneruskan aksi like ke LikeController. Logika terbatas pada kondisi daftar kosong dan tidak ada perhitungan atau aturan bisnis.* | *-* |
| *C04* | *HalamanFormulirLaporan* | *Mendalam* | *Memuat validasi sisi klien: batas karakter judul dan deskripsi, batas ukuran dan tipe file, serta kelengkapan sebelum laporan dikirim.* | *-* |
| *C05* | *LaporanController* | *Mendalam* | *Kelas ini memuat isLaporanValid(), yaitu validasi.* | *-* |
| *C06* | *AdminEntity* | *Tidak perlu* | *Kelas entity berisi data admin (id, nama, NIP, email) beserta getter/setter tanpa logika.* | *-* |
| *C07* | *PetugasEntity* | *Tidak perlu* | *Kelas entity berisi data petugas (id, nama, NIP, email) beserta getter/setter tanpa logika.* | *-* |
| *C08* | *HalamanFormulirTanggapann* | *Mendalam* | *Memuat aturan status laporan (diterima, ditolak, ditangguhkan), validasi status wajib dipilih, dan batas karakter komentar.* | *-* |
| *C09* | *TanggapanController* | *Mendalam* | *sendTanggapan() mengubah status dan menambah poin sesuai aturan status dan perhitungannya.* | *-* |
| *C10* | *LikeController* | *Mendalam* | *Kelas ini harus dapat memenuhi aturan satu like per Pelapor dan toggle like/unlike* | *-* |
| *C11* | *HalamanLeaderboard* | *Sedang* | *Kelas boundary yang menampilkan 20 peringkat teratas, pengurutan dan pengambilan data didelegasikan ke LeaderboardController.* | *-* |
| *C12* | *DatabaseLaporanEntity* | *Tidak perlu* | *Kelas akses data yang hanya menjalankan query sederhana (SELECT, INSERT, UPDATE). Teruji tidak langsung melalui test case UC01 sampai UC03.* | *-* |
| *C13* | *DatabasePelaporEntity* | *Tidak perlu* | *Kelas akses data yang hanya menjalankan query sederhana pada data Pelapor. Teruji tidak langsung melalui test case UC04* | *-* |
| *C14* | *LeaderboardController* | *Mendalam* | *Memuat algoritma pengurutan Pelapor berdasarkan poin dan perhitungan peringkat, sehingga perlu diuji untuk data kosong, poin sama, dan urutan benar* | *-* |
| *C15* | *HalamanAkun* | *Tidak perlu* | *Kelas boundary yang hanya menampilkan nama, NIM/NIP, dan poin Pelapor tanpa perhitungan, validasi, atau aturan bisnis. Teruji tidak langsung melalui test case UC04.* | *-* |
| *C16* | *HalamanNotifikasi* | *Tidak perlu* | *Kelas boundary yang hanya menampilkan daftar notifikasi tanpa perhitungan, validasi, atau aturan bisnis. Teruji tidak langsung melalui test case UC02 dan UC04.* | *-* |
| *C17* | *NotifikasiController* | *Sedang* | *Mengoordinasikan pembuatan dan pengiriman notifikasi dengan validasi sederhana (id Pelapor dan pesan tidak kosong).* | *-* |
| *C18* | *HalamanLogin* | *Sedang* | *Kelas boundary yang menerima input email dan password lalu mendelegasikan validasi ke LoginController, serta menampilkan hasil berhasil atau gagal.* | *-* |
| *C19* | *LoginController* | *Mendalam* | *Integrasi eksternal OTP Supabases, penanganan TIMEOUT/ERROR, dan keamanan.* | *-* |

## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai *coverage* minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan unit test: *[tuliskan perintah, mis. `pytest src/tests/`]*.

Lokasi file test: *[path, mis. `src/tests/`]*.

### 4.2.1 Kelas [Nama Kelas 1]

**ID Kelas:** *[C02]*  
**Nama Kelas:** *[Pesanan]*  
**Tingkat:** *[Mendalam]*

Tabel 4.2.1. Hasil Pengujian Unit Kelas [C02]

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C02-UT01* | *`hitungTotal(): Decimal`* | *Normal* | *Pesanan berisi 2 item: 10.000 x 2 dan 5.000 x 1* | *Total = 25.000* | *[Hasil aktual]* | *Pass/Fail* |
| *C02-UT02* | *`hitungTotal(): Decimal`* | *Batas* | *Pesanan berisi tepat 1 item dengan jumlah 1* | *Total = harga item tersebut* | *[...]* | *Pass/Fail* |
| *C02-UT03* | *`hitungTotal(): Decimal`* | *Negatif* | *Pesanan tanpa item* | *Total = 0 atau melempar kesalahan sesuai rancangan* | *[...]* | *Pass/Fail* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

Khusus kelas **Mendalam**:

Tabel 4.2.1b. Ringkasan Cakupan Kelas [C02]

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *[op1(), op2(), ...]* |
| Operasi yang diuji | *[op1(), op2(), ...]* |
| ID Algoritma yang tercakup | *[Algo-001, ...]* |
| Coverage (wajib ≥ 70%) | *[% baris / % cabang, alat dan bukti pada 4.6]* |

### 4.2.2 Kelas [Nama Kelas 2]

*[Ulangi pola 4.2.1 untuk setiap kelas bertingkat Mendalam atau Sedang.]*

<br>

## 4.3 Pengujian Integrasi

Pengujian integrasi memeriksa interaksi antarkomponen yang melewati batas, yaitu *Controller* ke *Model*, aplikasi ke basis data, dan aplikasi ke sistem eksternal. Daftar antarmuka mengacu pada dokumen DPPL, dengan minimal satu test case untuk setiap antarmuka. Pengujian memakai komponen nyata, bukan *mock*. Apabila ada antarmuka tambahan yang belum didaftarkan pada dokumen DPPL, cantumkan juga.

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| *I-01* | *KeranjangController* | *Keranjang (Model)* | *Controller - Model* | *INT-TC01, INT-TC02* |
| *I-02* | *Pesanan (Model)* | *Database* | *Aplikasi - Basis data* | *INT-TC03* |
| *I-03* | *PaymentGatewayAdapter* | *Payment Gateway (dummy)* | *Aplikasi - Sistem eksternal* | *INT-TC04, INT-TC05* |
| *[I-XX]* | *[Komponen asal]* | *[Komponen tujuan]* | *[Jenis batas]* | *[ID test case]* |
| *...* | *...* | *...* | *...* | *...* |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *INT-TC01* | *I-01* | *Normal: Masuk ke dalam aplikasi dengan email ITB* | *Panggil `loginBYITBemail()` melalui HalamanLogin dengan email yang valid* | *Pengguna tervalidasi dan masuk ke aplikasi sesuai dengan peran* | *Pengguna masuk ke dalam aplikasi melalui "sign in with google", namun pada akun tetap menggunakan email ITB. Pengguna masuk sesuai peran.* | *Pass* |
| *INT-TC02* | *I-01* | *Normal: Masuk ke dalam aplikasi dengan email biasa* | *Panggil `loginBYNormalemail()` melalui HalamanLogin dengan email yang valid* | *Pengguna tervalidasi dan masuk ke aplikasi sesuai dengan peran* | *Pengguna masuk ke dalam aplikasi melalui "sign in with google", namun pada akun tetap menggunakan email yang diinput. Pengguna masuk sesuai peran.* | *Pass* |
| *INT-TC03* | *I-01* | *Gagal: Masuk ke halaman error ketika gagal login* | *Menginput email dengan password yang salah.* | *Pengguna gagal validasi dan masuk ke halaman error* | *Pengguna gagal validasi dan masuk ke halaman error* | *Pass* |
| *INT-TC04* | *I-02* | *Normal: simpan pesanan* | *Buat pesanan, lalu baca ulang langsung dari basis data* | *Baris pesanan ada dengan nilai total dan status yang sama* | *[...]* | *Pass/Fail* |
| *INT-TC05* | *I-03* | *Gagal: gateway mengembalikan status gagal* | *Kirim otorisasi dengan saldo dummy tidak cukup* | *Status pesanan tidak berubah menjadi "Lunas", pesan gagal diteruskan ke pengguna* | *[...]* | *Pass/Fail* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

<br>

## 4.4 Pengujian Use Case

Pengujian use case dilakukan pada seluruh skenario normal dan alternatif sesuai Subbab 4.4 SKPL, dengan minimal satu test case untuk setiap skenario. Kolom ID KF menunjukkan KF yang diverifikasi oleh test case tersebut.

### 4.4.1 Use Case Melakukan Pelaporan

**ID Use Case:** *UC01*  
**Nama Use Case:** *Melakukan pelaporan*

Tabel 4.4.1. Hasil Pengujian Use Case [UC01]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC01-TC01* | *KF03* | *Normal* | *1. Buka halaman formulir laporan.<br>2. Masukkan judul, deskripsi, lokasi masalah, dan foto.<br>3. Klik tombol "Submit Report".* | *Judul: Help me the toilet is clogged<br>Deskripsi: idk what happened<br>Lokasi masalah: Labtek V Lantai 2<br>Foto dengan size dibawah 10mb dan merupakan file .jpg* | *Laporan berhasil dikirim ke database sebagai daftar laporan untuk ditanggapi Petuags atau Admin.* | *Laporan berhasil dikirim ke database sebagai daftar laporan untuk ditanggapi Petuags atau Admin sesuai hasil yang diharapkan.* | *Pass* |
| *UC01-TC02* | *KF03* | *Alternatif 1: Laporan Tidak Valid Secara Teknis* | *1. Buka halaman formulir laporan.<br>2. Kosongkan judul, tetapi mengisi deskripsi, lokasi masalah, dan foto.<br>3. Klik tombol "Submit Report".* | *Judul: NULL<br>Deskripsi: idk what happened<br>Lokasi masalah: Labtek V Lantai 2<br>Foto dengan size dibawah 10mb dan merupakan file .jpg* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi sesuai hasil yang diharapakan* | *[Pass/Fail. Jika Fail: penjelasan dan solusi]* |
| *UC01-TC03* | *KF03* | *Alternatif 1: Laporan Tidak Valid Secara Teknis* | *1. Buka halaman formulir laporan.<br>2. Mengisi deskripsi melebihi batas karakter, mengisi judul, lokasi masalah, dan foto.<br>3. Klik tombol "Submit Report".* | *Judul: Help  me the toilet is clogged<br>Deskripsi: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa4aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa5aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa6aaaaaaaaaa<br>Lokasi masalah: Labtek V Lantai 2<br>Foto dengan size dibawah 10mb dan merupakan file .jpg* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi sesuai hasil yang diharapakan* | *[Pass/Fail. Jika Fail: penjelasan dan solusi]* |
| *UC01-TC04* | *KF03* | *Alternatif 1: Laporan Tidak Valid Secara Teknis* | *1. Buka halaman formulir laporan.<br>2. Memberi foto yang lebih dari 10 mb dan mengisi judul, deskripsi, dan lokasi masalah.<br>3. Klik tombol "Submit Report".* | *Judul: Help me the toilet is clogged<br>Deskripsi: idk what happened<br>Lokasi masalah: Labtek V Lantai 2<br>Foto dengan size melebihi 10mb dan merupakan file .jpg* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi* | *Laporan tidak berhasil dikirim ke database dan menampilkan pesan _error_ sesuai dengan aspek teknis yang tidak terpenuhi sesuai hasil yang diharapakan* | *[Pass/Fail. Jika Fail: penjelasan dan solusi]* |

### 4.4.2 Use Case Memberikan Status Laporan

**ID Use Case:** *UC02*  
**Nama Use Case:** *Memberikan status laporan*

Tabel 4.4.2. Hasil Pengujian Use Case [UC02]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC02-TC01* | *KF04, KF05* | *Normal* | *1. Log in dengan akun petugas.<br>2. Buka halaman daftar laporan.<br>3. Ubah status di satu laporan.<br>4. Klik tombol "Submit changes".* | *Mengganti salah satu laporan status unverified ke status ongoing* | *Laporan tersebut dimasukkan ke daftar laporan ongoing, mengirimkan notifikasi dan menambahkan poin ke pelapor yang berkaitan, dan laporan tersebut dapat dilihat di halaman laporan.* | *Laporan tersebut dimasukkan ke daftar laporan ongoing, mengirimkan notifikasi, menambahkan poin ke pelapor yang berkaitan dan laporan tersebut dapat dilihat di halaman laporan sesuai hasil yang diharapkan.* | *???* |
| *UC02-TC02* | *KF04, KF05* | *Normal* | *1. Log in dengan akun petugas.<br>2. Buka halaman daftar laporan.<br>2. Ubah status di satu laporan.<br>3. Klik tombol "Submit changes".* | *Mengganti salah satu laporan status ongoing ke status denied* | *Laporan tersebut dimasukkan ke daftar laporan denied dan mengirimkan notifikasi ke pelapor yang berkaitan.* | *Laporan tersebut dimasukkan ke daftar laporan denied dan mengirimkan notifikasi ke pelapor yang berkaitan sesuai hasil yang diharapkan.* | *???* |
| *UC02-TC03* | *KF04, KF05* | *Alternatif 1: Admin Melakukan Validasi Administratif / Moderasi* | *1. Log in dengan akun admin.<br>2. Buka halaman daftar laporan.<br>2. Ubah status di satu laporan dan menambahkan tanggapan.<br>3. Klik tombol "Submit changes".* | *Mengganti salah satu laporan status denied ke status ongoing<br>Tanggapan: Laporan terbukti benar.* | *Laporan tersebut dimasukkan ke daftar laporan ongoing, mengirimkan notifikasi dan poin ke pelapor yang berkaitan, dan laporan tersebut dapat dilihat di halaman laporan.* | *Laporan tersebut dimasukkan ke daftar laporan ongoing, mengirimkan notifikasi dan poin ke pelapor yang berkaitan, dan laporan tersebut dapat dilihat di halaman laporan sesuai hasil yang diharapkan.* | *???* |
| *UC02-TC04* | *KF04, KF05* | *Alternatif 1: Admin Melakukan Validasi Administratif / Moderasi* | *1. Log in dengan akun admin.<br>2. Buka halaman daftar laporan.<br>2. Ubah status di satu laporan dan menambahkan tanggapan.<br>3. Klik tombol "Submit changes".* | *Mengganti salah satu laporan status ongoing ke status denied<br>Tanggapan: Fotonya tidak berhubungan dengan laporan.* | *Laporan tersebut dimasukkan ke daftar laporan denied dan mengirimkan notifikasi ke pelapor yang berkaitan.* | *Laporan tersebut dimasukkan ke daftar laporan denied dan mengirimkan notifikasi ke pelapor yang berkaitan sesuai hasil yang diharapkan.* | *???* |

### 4.4.3 Use Case Memberi dan Membatalkan Like

**ID Use Case:** *UC03*  
**Nama Use Case:** *Memberi dan membatalkan like*

Tabel 4.4.3. Hasil Pengujian Use Case [UC03]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC03-TC01* | *KF06, KF08* | *Normal* | *1. Log in dengan akun pelapor.<br>2. Buka halaman laporan.<br>3. Klik tombol like pada salah satu laporan yang belum pernah di-like sebelumnya.* | *Klik tombol like sekali.* | *Jumlah like pada laporan tersebut bertambah satu.* | *Jumlah like pada laporan tersebut bertambah satu sesuai hasil yang diharapkan.* | *???* |
| *UC03-TC02* | *KF06, KF08* | *Alternatif 1: Membatalkan Like* | *1. Log in dengan akun pelapor.<br>2. Buka halaman laporan.<br>3. Klik tombol like pada salah satu laporan yang sudah di-like sebelumnya.* | *Klik tombol like sekali.* | *Jumlah like pada laporan tersebut berkurang satu.* | *Jumlah like pada laporan tersebut berkurang satu sesuai hasil yang diharapkan.* | *???* |
| *UC03-TC03* | *KF06, KF07, KF08* | *Alternatif 1: Membatalkan Like* | *1. Log in dengan akun pelapor.<br>2. Buka halaman laporan.<br>3. Klik tombol like pada salah satu laporan yang sudah di-like sebelumnya.* | *Klik tombol like tiga kali.* | *Jumlah like pada laporan tersebut berkurang satu.* | *Jumlah like pada laporan tersebut bertambah satu sesuai hasil yang diharapkan.* | *???* |

### 4.4.4 Use Case Memperoleh Poin

**ID Use Case:** *UC04*  
**Nama Use Case:** *Memperoleh poin*

Tabel 4.4.4. Hasil Pengujian Use Case [UC04]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC04-TC01* | *KF10, KF11* | *Normal* | *1. Log in dengan akun pelapor.<br>2. Menunggu laporan divalidasi.<br>3. Laporan divalidasi dengan status ongoing.* | *Mengirimkan laporan yang valid secara teknis dan secara etika.* | *Jumlah poin akun bertambah.* | *Jumlah poin akun bertambah sesuai hasil yang diharapkan.* | *???* |
| *UC04-TC02* | *KF10, KF11* | *Alternatif 1: Laporan Tidak Lolos Validasi oleh Admin atau Petugas* | *1. Log in dengan akun pelapor.<br>2. Menunggu laporan divalidasi.<br>3. Laporan divalidasi dengan status denied.* | *Mengirimkan laporan yang tidak valid secara teknis ataupun secara etika.* | *Jumlah poin tetap sama.* | *Jumlah poin tetap sama sesuai hasil yang diharapkan.* | *???* |

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
| *C02-UT01 – C02-UT08* | *[Sisipkan hasil keluaran unit test]* |
| *C02 (coverage)* | *[Sisipkan laporan coverage kelas C02]* |
| *INT-TC01* | *[Sisipkan bukti pengujian integrasi]* |
| *UC01-TC01* | *[Sisipkan tangkapan layar UC01-TC01 sesuai prosedur pengujian]* |
| *UC01-TC02* | *[Sisipkan tangkapan layar UC01-TC02 sesuai prosedur pengujian]* |
| *KNF01-TC01* | ![KNF01-TC01-1](.\assets\bukti-knf01-tc01-1.png) ![KNF01-TC01-2](.\assets\bukti-knf01-tc01-2.png) ![KNF01-TC01-3](.\assets\bukti-knf01-tc01-3.png) |
| *KNF02-TC01* | ![KNF02-TC01-1](.\assets\bukti-knf02-tc01-1.png) ![KNF01-TC01-2](.\assets\bukti-knf02-tc01-2.png) ![KNF01-TC01-3](.\assets\bukti-knf02-tc01-3.png) |
| *KNF03-TC01* | ![KNF03-TC01-1](.\assets\bukti-knf03-tc01-1.png) ![KNF03-TC01-2](.\assets\bukti-knf03-tc01-2.png) ![KNF03-TC01-3](.\assets\bukti-knf03-tc01-3.png) ![KNF03-TC01-4](.\assets\bukti-knf03-tc01-4.png) |
| *KNF04-TC01* | ![KNF04-TC01-1](.\assets\bukti-knf04-tc01-1.png) |
| *KNF05-TC01* | ![KNF05-TC01-1](.\assets\bukti-knf05-tc01-1.png) ![KNF05-TC01-2](.\assets\bukti-knf05-tc01-2.png) |
| *KNF05-TC01* | ![KNF05-TC01-1](.\assets\bukti-knf05-tc01-1.png) |
| *KNF05-TC02* | ![KNF05-TC02-1](.\assets\bukti-knf05-tc02-1.png) |
| *KNF06-TC01* | ![KNF06-TC01-1](.\assets\bukti-knf06-tc01-1.png) ![KNF06-TC01-2](.\assets\bukti-knf06-tc01-2.png) |
| *KNF07-TC01* | Bukti adanya algoritma sorting dan fungsi yang menampilkan urutan leaderboard setiap kali HalamanLeaderboard di-_render_ ![KNF07-TC01-1](.\assets\bukti-knf07-tc01-1.png) Bukti tidak adanya _cron_ pada Supabase ![KNF07-TC01-2](.\assets\bukti-knf07-tc01-2.png) |

<br>

---

# BAB 5: Traceability

Petakan setiap KF ke KNF, use case, kelas perancangan, file implementasi, dan test case. Tabel traceability berikut akan menjadi sarana verifikasi KF. Setiap KF memiliki minimal satu test case dan dinyatakan terpenuhi apabila **seluruh** test case terkaitnya berkesimpulan `Pass`. KF yang tidak diimplementasikan tetap dicantumkan beserta alasannya.

Tabel 5.1. Matriks Kerunutan KF terhadap Implementasi dan Pengujian

| KF ID | KNF Terkait | Use Case ID | Kelas Terkait | Implementasi File Terkait | Test Case (UC) | Test Case (Unit/Integrasi/KNF) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *KF05* | *KNF01* | *UC03* | *C02 - Pesanan* | *`src/...`* | *UC03-TC01* | *C02-UT05, INT-TC04, KNF01-TC01* |
| *KF01* | *-* | *UC01<br>UC02* | *[C01 - Nama kelas]<br>[C02 - Nama kelas]* | *[path/ke/file1]<br>[path/ke/file2]* | *UC01-TC01, UC01-TC02<br>UC02-TC01* | *-* |
| *KF02* | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| *KFXX* | *-* | *[UCXX atau -]* | *[CXX - Nama kelas atau -]* | *Tidak diimplementasikan: [alasan]* | *-* | *-* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

Tabel 5.2. Matriks Kerunutan KNF terhadap Pengujian

| ID KNF | Parameter | KF/UC Terkait | Test Case |
| :--- | :--- | :--- | :--- |
| *KNF01* | *Reliability* | *KF05 / UC03* | *KNF01-TC01* |
| *KNFXX* | *[Parameter]* | *[KFXX / UCXX atau -]* | *[KNFXX-TCYY]* |
| *...* | *...* | *...* | *...* |