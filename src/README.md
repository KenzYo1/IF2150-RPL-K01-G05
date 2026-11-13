## APATIS: Aplikasi Pelaporan Air dan Sanitasi

APATIS atau Aplikasi Pelaporan Air dan Sanitasi merupakan *web app* yang menangani kurangnya cara pelaporan masalah air dan sanitasi di lingkungan ITB dan berkaitan langsung dengan permasalahan *Sustainable Development Goal* 6, yakni air bersih dan sanitasi.

Melalui APATIS, pengguna dapat melaporkan permasalahan air dan sanitasi, melihat laporan yang dibuat oleh pengguna lain, melakukan interaksi dengan laporan tersebut, serta mendapatkan notifkasi ketika laporan diterima.

## Framework dan Teknologi

APATIS merupakan aplikasi *web* berbasis NextJs 16.4.5 dan menggunakan React, Typescript, dan Tailwind CSS, dan PostgreSQL sebagai bahasa pada basis data. Adapun aplikasi ini juga menggunakan basis data eksternal Supabase beserta Auth Supabase dan Storage Supabase.

Aplikasi ini menggunakan Cloudflare Workers agar dapat dijalankan di mana saja, tanpa harus melakukan *hosting* secara lokal. 

## Prasyarat dan Instalasi

Untuk menjalankan aplikasi ini secara lokal, diperlukan adanya Node Package Manager (npm) untuk melakukan install berbagai *package* node, yang kemudian akan digunakan ketika menjalankan berbagai perintah nantinya.

Untuk melakukan instalasi secara lokal, jalankan perintah-perintah berikut:
```bash
npm install

npm run build

npm run dev
```
Maka, aplikasi akan di-*hosting* secara lokal di: *http://localhost:3000*.

Untuk menjalankan cloudflare worker secara lokal, jalankan perintah-perintah berikut:
```bash
npx opennextjs-cloudflare build

npx opennextjs-cloudflare preview
```

4. **Konfigurasi** (environment variable, setup basis data, migrasi/seed) dan langkah demi langkah menjalankannya.

## Konfigurasi

Jika ingin menjalankan secara lokal, cukup ubah *.env.example* menjadi *.env* atau *.env.local*, tanpa mengubah isinya (membiarkannya setiap *key* kosong)


5. **Cara menjalankan aplikasi** (dan cara menjalankan test, jika ada).

## Cara Menjalankan Aplikasi

Aplikasi sudah tersedia secara daring melalui *https://apatis-web.snappicel.site*.
Namun, jika ingin menjalankan secara lokal, cukup ikuti setiap perintah di atas.

6. **Akun/data uji** untuk mencoba tiap peran pengguna (jika ada login).

| Akun | Data Uji |
| :--- | :--- |
| **...** | ... |
| **...** | ... |
| **...** | ... |


7. **Daftar modul/fitur yang diimplementasi** beserta pembagian anggota.

| Nama | Fitur |
| --- | --- |
| Kenzo Yo |  |
| Justin Sepvian |  |
| Jessica Audrey Tjahjadi | Halaman Info Akun, Halaman Notifikasi, Halaman Leaderboard |
| Nadia Layla Safira | Halaman Laporan, Halaman Formulir Tanggapan, Halaman List Laporan Petugas |
| Arini Karimatunnikmah | Header, Side bar, Halaman Tanggapan, Halaman List Laporan Petugas |


8. **Daftar tabel/koleksi basis data** beserta atributnya (atau tautan ke skema/ERD).

| Basis Data | Atribut / Tautan |
| :--- | :--- |
| **...** | ... |
| **...** | ... |
| **...** | ... |
| **...** | ... |
| **...** | ... |
| **...** | ... |

