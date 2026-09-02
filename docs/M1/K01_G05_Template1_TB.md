<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 1
<br>
TOPIC BRAINSTORMING
</h1>
<br>

## *Stop Loss Water*

### Untuk: *Jordhy*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *\[Kelas K01\]* |
| Kelompok | *\[5\]*  |

| NIM | Nama |
|---|---|
| *13525016* | *Kenzo Yo* |
| *13525112* | *Justin Sepvian* |
| *13525142* | *Jessica Audrey Tjahjadi* |
| *13525073* | *Nadia Layla Safira* |
| *13525097* | *Arini Karimatunnikmah* |
---

<br>
<br>

# BAB 1: Analisis Permasalahan

## 1.1 Latar Belakang Masalah
Air bersih dan fasilitas sanitasi merupakan kebutuhan penting dalam mendukung keberjalanan aktivitas sivitas akademika di universitas. Seiring dengan tingginya mobilitas sivitas akademika, kerusakan infrastruktur seperti keran bocor, saluran air mampet, atau toilet yang tidak berfungsi sering terjadi. Permasalahan ini berhubungan langsung dengan Sustainable Development Goals (SDGs) yang ke-6, yaitu Air Bersih dan Sanitasi Layak. Jika tidak segera ditangani, kerusakan ini tidak hanya mengganggu kenyamanan belajar mengajar, tetapi juga menyebabkan pemborosan air dalam skala masif dan memicu masalah kesehatan lingkungan. Oleh karena itu, dibutuhkan proses pelaporan yang mudah dan dapat menyampaikan informasi kerusakan kepada pihak pengelola fasilitas secara jelas.

## 1.2 Analisis Kondisi Saat Ini
Setiap universitas pasti memiliki unit yang bertanggung jawab terhadap pengelolaan dan perbaikan sarana prasarana, termasuk fasilitas air bersih dan layanan perbaikan. Setiap unit juga telah memiliki prosedur untuk melakukan pemeriksaan kondisi fasilitas dan meneruskan kerusakan yang ditemukan kepada pihak terkait.

Namun, dari sisi sivitas akademika, proses untuk melaporkan kerusakan masih dapat menjadi kendala. Ketika menemukan masalah seperti keran bocor, wastafel rusak, atau saluran air tersumbat, pengguna belum tentu mengetahui pihak yang harus dihubungi. Laporan dapat disampaikan secara langsung kepada petugas gedung atau melalui media komunikasi yang tersedia. Akibatnya, laporan berpotensi tersebar dan sulit dipantau dalam satu tempat secara terstruktur. Metode pelaporan seperti ini juga membuat informasi yang diterima belum tentu lengkap. Pelapor mungkin hanya menyebutkan nama gedung tanpa mencantumkan lantai, ruangan, atau foto kerusakan. Pihak pengelola kemudian perlu meminta informasi tambahan atau memeriksa lokasi secara langsung sebelum meneruskan laporan kepada teknisi.

Masalah lain yang dapat muncul adalah adanya beberapa laporan untuk kerusakan yang sama. Sebagai contoh, beberapa mahasiswa dapat menemukan toilet yang rusak lalu melaporkannya secara terpisah. Tanpa tempat yang menampilkan laporan sebelumnya, pengguna tidak dapat mengetahui bahwa kerusakan tersebut sudah pernah dilaporkan. Di sisi lain, pelapor juga belum tentu mengetahui apakah laporannya sudah diterima, sedang ditangani, atau telah selesai diperbaiki.

Dari kondisi tersebut, masih terdapat kebutuhan akan sistem yang sederhana bagi sivitas akademika, tetapi tetap dapat membantu pengelola fasilitas dan teknisi dalam menangani laporan. Sistem yang kami usulkan akan menyediakan satu tempat untuk membuat dan melihat laporan kerusakan fasilitas air dan sanitasi di ITB.

Pengguna dapat mencantumkan foto, deskripsi, serta lokasi kerusakan secara bertingkat, mulai dari fakultas atau area, gedung, lantai, hingga ruangan. Jika kerusakan yang sama sudah dilaporkan, pengguna dapat memberikan upvote tanpa membuat laporan baru. Jumlah upvote juga dapat digunakan sebagai salah satu pertimbangan oleh manajer fasilitas dalam menentukan prioritas penanganan.

Setiap laporan akan melalui status Submitted, Assigned, In Progress, dan Resolved. Dengan adanya status tersebut, pelapor dapat mengetahui perkembangan laporannya, manajer fasilitas dapat memberikan tugas kepada teknisi, dan teknisi dapat mengunggah bukti setelah perbaikan selesai.

Dengan demikian, sistem yang diusulkan tidak menggantikan proses perbaikan fasilitas yang sudah ada di ITB. Sistem ini berfungsi untuk melengkapi proses tersebut dengan menyediakan jalur pelaporan yang terpusat, informasi lokasi yang lebih jelas, pencegahan laporan berulang, dan pemantauan status perbaikan.

---

# BAB 2: Analisis Solusi

## 2.1 Deskripsi Perangkat Lunak
Abstraksikan solusi perangkat lunak yang diusulkan dari sudut pandang pengguna. Jelaskan target platform yang akan digunakan (misalnya: desktop application) beserta alasan pemilihannya. Deskripsikan juga nilai unik (inovasi inti) dari perangkat lunak kalian dan apa yang membedakannya dari solusi yang sudah ada.

## 2.2 Asumsi dan Batasan
Definisikan secara tegas asumsi (baik teknis maupun dari sisi pengguna) yang menjadi dasar pengembangan. Tuliskan batasan seperti regulasi/hukum, keterbatasan sumber daya, dan ruang lingkup solusi.

---

# BAB 3: Spesifikasi Kebutuhan dan Proses Bisnis

## 3.1 Identifikasi Aktor
Buatlah daftar seluruh aktor (pengguna) yang akan berinteraksi langsung dengan sistem solusi yang kalian kembangkan. Berikan penjelasan singkat mengenai peran dan karakteristik dari masing-masing aktor tersebut.

| Aktor | Deskripsi |
| :--- | :--- |
| *Kasir* | *Pengguna ini bertindak sebagai pihak yang bertanggung jawab untuk memproses transaksi harian dan melayani pembayaran pelanggan. Karakteristik dari pengguna ini adalah mengutamakan kecepatan dan keakuratan saat bertransaksi.* |
| ... | ... |


## 3.2 Kebutuhan Pengguna Awal

| ID | Aktor | Kebutuhan / Aktivitas | Tujuan / Nilai |
| :--- | :--- | :--- | :--- |
| US-01 | *Pelapor* |  *Melapor masalah fasilitas air dan/atau sanitasi* | *Masalah fasilitas dapat diketahui oleh petugas fasilitas dengan cepat* |
| US-02 | *Pelapor* | *Melampirkan foto dan deskripsi permasalahan yang dilapor* | *Petugas fasilitas dapat menanganinya dengan tepat* |
| US-03 | *Admin* | *Mengelola data laporan yang masuk* | *Memastikan bahwa laporan yang masuk merupakan masalah yang valid* |
| US-04 | *Umum* | *Mengetahui lokasi fasilitas yang tersedia* | *Pengguna dapat mengetahui dan menuju lokasi fasilitas terdekat* |
| US-05 | *Pelapor* | *Melihat laporan yang dibuat oleh orang lain* | *Menegetahui masalah yang sudah dilapor* |
| US-06 | *Pelapor* | *Melakukan upvote pada laporan yang ada* | *Petugas dapat mengetahui masalah yang perlu diprioritas* |
| US-07 | *Pelapor* | *Melihat status laporan yang disampaikan* | *Mendapatkan transparansi terkait progres laporan yang dibuat* |
| US-08 | *Petugas fasilitas* | *Menerima laporan masalah* | *Petugas dapat mengetahui masalah yang ada dengan detail dari pelapor* |
| US-09 | *Pelapor* | *Mendapatkan poin berdasarkan laporan yang dibuat* | *Menambah poin pada leaderboard untuk hadiah* |
| US-10 | *Admin* | *Memberikan poin pada akun pelapor yang sesuai* | *Mendorong kepedulian pengguna melalui sistem reward* |
| US-11 | *Pelapor* | *Membuat akun pada perangkat lunak* | *Sebagai identitas pengguna di web* |

## 3.3 Model Proses Bisnis
Buatlah *Activity Diagram* atau *Swimlane Diagram* yang menunjukkan alur kerja proses bisnis dari sistem solusi. Diagram ini harus memvisualisasikan bagaimana alur operasional di dunia nyata berjalan lebih efisien dengan adanya interaksi antara aktor (yang didefinisikan pada poin 3.1) dan sistem perangkat lunak. Perhatikan notasi yang digunakan dalam pembuatannya.
<br>

<p align="center">
<img alt="Contoh Activity Diagram" src="./assets/diagram/diagram-act-1.avif" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Activity Diagram</i>
</p>

<br>

# Referensi
- Diagram UML: https://www.drawio.com/, https://staruml.io/
