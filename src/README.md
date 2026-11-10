This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


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
7. **Daftar modul/fitur yang diimplementasi** beserta pembagian anggota.
8. **Daftar tabel/koleksi basis data** beserta atributnya (atau tautan ke skema/ERD).