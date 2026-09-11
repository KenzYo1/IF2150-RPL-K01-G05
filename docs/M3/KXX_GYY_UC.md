<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 3
<br>
USE CASE & SCENARIO USE CASE
</h1>
<br>

## *APATIS: Aplikasi Pelaporan Air dan Sanitasi*

### Untuk: *Made Branenda Jordhy*

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

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

<br>
<br>

# BAB 1: Deskripsi Perangkat Lunak
Sistem perangkat lunak ini merupakan gabungan dari perangkat lunak dan pengguna. Pada sistem solusi ini, pengguna akan menggunakan perangkat lunak untuk melaporkan berbagai permalasahan fasilitas air dan sanitasi di ITB, seperti kebocoran air, kualitas air, perlengkapan kamar mandi yang kurang, dan sebagainya. Melalui sistem ini, pengguna berekspektasi memiliki pengalaman yang lebih mudah dan transparan dalam melaporkan suatu permasalahan air dan sanitasi di ITB. 

Sistem solusi ini memiliki alur kerja yang sederhana, yakni pengguna, yang merupakan civitas academica, sebagai pelapor terhadap suatu masalah mengenai fasilitas air dan sanitasi di ITB, petugas sebagai pengguna yang menanggapi laporan tersebut, dan admin sebagai pengguna yang melakukan tugas administratif, seperti validasi teknis laporan dan pemberian poin terhadap laporan yang valid dan sah.

Penerapan dari sistem solusi ini diharapkan dapat mempermudah pelaporan terkait masalah fasilitas sanitasi dan air di ITB, serta memusatkan sistem pelaporan dan mempercepat penanggapan laporan tersebut. Dengan adanya sistem ini, Sustainable Development Goals (SDG) yang ke-6, yakni mengenai air bersih dan sanitasi, diharapkan dapat lebih tercapai dan terpenuhi di ITB.

# BAB 2: Kebutuhan Fungsional (KF)

| ID KF | ID Kebutuhan | Penjelasan |
| :--- | :--- | :--- |
| *KF01* | *R02* | *Sistem harus memasukan pengguna ke dalam akun yang benar dan mengakses fitur yang sesuai peran yang telah terdaftar.* |
| *KF02* | *R03* | *Sistem harus dapat mengidentifikasi setiap akun sesuai perannya, yaitu Pelapor, Petugas, atau Admin.* |
| *KF03* | *R05* | *Ketika pengguna ingin melapor, sistem harus memperbolehkan pengguna untuk membuat laporan dan mencantum kategori, deskripsi, foto, waktu, dan lokasi masalah mengenai fasilitas air dan/atau sanitasi.* |
| *KF04* | *R10* | *Sistem harus mengizinkan Admin dan Petugas untuk melihat, memvalidasi, lalu menerima atau menolak laporan.* |
| *KF05* | *R11* | *Ketika sebuah laporan dinyatakan valid oleh Petugas, sistem harus memperbolehkan pengguna untuk melihat laporan tersebut di halaman utama atau feed dengan isinya, seperti detail foto, deskripsi, lokasi, waktu, status, dan jumlah _like_.* |
| *KF06* | *R12* | *Selama sebuah laporan dinyatakan valid, sistem harus memperbolehkan pengguna untuk memberikan dan membatalkan _like_ pada laporan tersebut.* |
| *KF07* | *R13* | *Bila seorang pengguna memberikan lebih dari satu _like_ di sebuah laporan, maka sistem harus membatasi agar hanya dapat memberi satu like pada laporan yang sama.* |
| *KF08* | *R14* | *Sistem harus memperbarui jumlah like setelah tindakan pengguna berhasiil diproses, yaitu memberi atau membatalkan _like_.* |
| *KF09* | *R15* | *Sistem harus memperbolehkan Petugas untuk mengubah status laporan sesuai dengan perkembangan penanganannya.* |
| *KF10* | *R16* | *Ketika laporan dinyatakan valid oleh Petugas atau Admin, sistem harus dapat memberi pemilik laporan sebuah poin.* |
| *KF11* | *R17* | *Ketika laporan dinyatakan valid oleh Petugas atau Admin, sistem harus menunjukkan poin pengguna menambah.* |
| *KF12* | *R18* | *Sistem harus membatasi informasi yang ditampilkan di leaderboard, seperti peringkat dan total poin pengguna sendiri serta nama, peringkat, dan total poin semua pengguna dalam top 20.* |
| *KF13* | *R20* | *Sistem harus dapat menunjukkan calon penerima merchandise pada akhir bulan, yaitu pelapor yang top 20.* |
| *KF14* | *R21* | *Ketika sudah akhir bulan, sistem harus menghitung dan menampilkan hasil top 20 di leaderboard.* |

<sub> ***Catatan***: *Jika ada KF dari ML2 yang berubah/bertambah/dihapus setelah asistensi, pastikan tabel ini konsisten dengan versi KF terbaru sebelum dikumpulkan.*
<sub>

---

# BAB 3: Model Use Case

## 3.1 Identifikasi Aktor
Daftarkan seluruh aktor yang terlibat dalam use case yang akan dimodelkan. Aktor berupa pengguna manusia yang berinteraksi dengan solusi. Perlu diperhatikan bahwa Admin/Developer/ Pihak Eksternal lain yang bisa diotomisasi, tidak perlu dijadikan aktor.

| Aktor | Deskripsi |
| :--- | :--- |
| *Pelapor* | *Pengguna eksternal yang melaporkan kerusakan fasilitas air dan sanitasi sehingga memperoleh poin serta melihat dan memberikan like atau unlike pada laporan kerusakan fasilitas air dan sanitasi dalam sistem APATIS yang telah dilaporkan pengguna lain.* |
| *Petugas* | *Pengguna yang menanggapi laporan yang masuk, menentukan dan memberikan status apakah laporan tersebut merupakan kersusakan pada fasilitas air dan sanitasi atau bukan, serta memberikan status pada laporan telah dituntaskan.* |
| *Admin* | *Pengguna yang mengelola validitas laporan secara administratif serta memberikan catatan pada kekurangan laporan.* |



## 3.2 Identifikasi Use Case
Identifikasi seluruh use case yang mencakup Kebutuhan Fungsional pada BAB 2. Satu use case boleh mencakup lebih dari satu KF, dan sebaliknya satu KF boleh muncul di lebih dari satu use case bila memang relevan.

| ID UC | Nama Use Case | Deskripsi Singkat | Aktor Terlibat | ID KF Terkait |
| :--- | :--- | :--- | :--- | :--- |
| *UC01* | *Melakukan Pembayaran Digital* | *Pelanggan memilih metode pembayaran dan menyelesaikan transaksi.* | *Pelanggan* | *KF01, KF02* |
| *UC02* | *Memverifikasi Status Pembayaran* | *Kasir mengecek status transaksi pelanggan sebelum menyerahkan barang.* | *Kasir* | *KF03* |
| *...* | *...* | *...* | *...* | *...* |

## 3.3 Use Case Diagram
Buatlah **satu** use case diagram yang mencakup seluruh aktor dan use case. Sertakan relasi *include*/*extend* apabila ada use case yang saling bergantung.
<br>
<p align="center">
<img alt="Contoh Activity Diagram" src="./assets/diagram/contoh-uc-diagram.webp" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Use Case Diagram</i>
</p>
<br>

Hal-hal yang perlu diperhatikan dalam pembuatan use case diagram:
- Pastikan notasi UML use case (aktor, oval use case, garis asosiasi, *include/extend*) digambar dengan benar.
- Seluruh aktor dan use case yang telah didefinisikan harus muncul di diagram, tidak ada yang terlewat maupun berlebih.
- Hindari garis yang saling bersilangan tanpa alasan jelas, susun diagram agar mudah dibaca.
- Hindari istilah solusi teknis (misalnya nama tabel database, nama endpoint API) muncul di dalam diagram use case karena use case menjelaskan *interaksi fungsional*, bukan detail implementasi.

## 3.4 Skenario Use Case
Buat skenario untuk **setiap** use case yang telah diidentifikasi pada 3.2. Setiap skenario dapat terdiri dari dua jenis alur:
- **Skenario Normal**: alur utama (*happy path*) di mana interaksi aktor-sistem berjalan lancar tanpa kendala hingga tujuan use case tercapai.
- **Skenario Alternatif**: alur percabangan dari skenario normal, misalnya kondisi gagal, input tidak valid, atau pilihan lain yang tersedia bagi aktor. Boleh ada lebih dari satu skenario alternatif per use case jika ada beberapa titik percabangan berbeda.

Format tabel skenario: kolom **Aksi Aktor** berisi apa yang dilakukan/diinput aktor, kolom **Reaksi Perangkat Lunak** berisi respons sistem terhadap aksi tersebut secara **berurutan** (nomor langkah harus berpasangan/selaras antar dua kolom).


### 3.4.1 Skenario UC01

**Nama Use Case:** *Melakukan Pembayaran Digital*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pelanggan memilih menu checkout* | *Sistem menampilkan ringkasan pesanan dan pilihan metode pembayaran* |
| 2 | *Pelanggan memilih metode pembayaran (misal: e-wallet)* | *Sistem mengarahkan pelanggan ke halaman konfirmasi e-wallet* |
| 3 | *Pelanggan mengonfirmasi pembayaran* | *Sistem menerima respons pembayaran berhasil, memperbarui status pesanan menjadi "Lunas", dan menampilkan notifikasi pembayaran berhasil* |


<br>

**Skenario Alternatif 1: Otorisasi Pembayaran Gagal**


| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pelanggan memilih menu checkout* | *Sistem menampilkan ringkasan pesanan dan pilihan metode pembayaran* |
| 2 | *Pelanggan memilih metode pembayaran (misal: e-wallet)* | *Sistem mengarahkan pelanggan ke halaman konfirmasi e-wallet* |
| 3 | *Pelanggan mengonfirmasi pembayaran* | *Sistem menerima respons pembayaran gagal (misal: saldo tidak cukup). Sistem menampilkan pesan error dan meminta pelanggan memilih metode pembayaran lain* |
| 4 | *Pelanggan memilih metode pembayaran lain* | *Sistem kembali ke langkah 2 skenario normal* |

### 3.4.2 Skenario UC02

**Nama Use Case:** *Memverifikasi Status Pembayaran*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Kasir memasukkan ID Pesanan pelanggan* | *Sistem menampilkan status pembayaran ("Lunas") beserta detail transaksi* |

<br>

**Skenario Alternatif 1: ID Pesanan Tidak Ditemukan**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Kasir memasukkan ID Pesanan yang salah/tidak ada* | *Sistem menampilkan pesan "ID Pesanan tidak ditemukan" dan meminta kasir memasukkan ulang* |


<sub>*Lanjutkanlah pola 3.4.x ini untuk setiap ID UC yang telah diidentifikasi pada 3.2, sampai seluruh use case memiliki skenario normal dan skenario alternatif (tidak usah dibuat jika use case tersebut memang tidak memiliki skenario alternatif).*<sub>