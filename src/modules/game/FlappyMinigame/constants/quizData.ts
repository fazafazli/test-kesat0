"use client";

export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index (Mulai dari 0) dari jawaban yang benar dalam array options
};

export const sheQuizData: Question[] = [
  {
    id: 1,
    question: "SHE merupakan singkatan dari...",
    options: [
      "Safety, Health, Education",
      "Safety, Health, Environment",
      "Secure, Health, Environment",
      "Safety, Human, Environment"
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Tujuan utama penerapan SHE adalah...",
    options: [
      "Meningkatkan nilai mahasiswa",
      "Menjamin aktivitas berjalan aman dan tidak membahayakan",
      "Mengurangi biaya operasional",
      "Menambah jumlah kendaraan"
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "SHE diterapkan untuk meminimalkan...",
    options: [
      "Nilai akademik",
      "Jumlah mahasiswa",
      "Risiko kecelakaan dan dampak lingkungan",
      "Penggunaan kendaraan"
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Sistem SHE memiliki berapa fokus utama?",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Berikut yang termasuk fokus SHE adalah...",
    options: [
      "Safety",
      "Security",
      "Service",
      "Strategy"
    ],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: "Health dalam SHE berkaitan dengan...",
    options: [
      "Kecepatan kendaraan",
      "Kebersihan taman",
      "Kesehatan fisik dan mental",
      "Pengelolaan parkir"
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "Environment dalam SHE berkaitan dengan ...",
    options: [
      "Pemeliharaan kendaraan",
      "Kebersihan dan pengelolaan lingkungan",
      "Keamanan gedung",
      "Nilai akademik"
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Pelanggaran SHE adalah tindakan yang ....",
    options: [
      "Mematuhi aturan",
      "Mengabaikan prosedur yang telah ditetapkan",
      "Membantu petugas",
      "Menjaga kebersihan"
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Pelanggaran SHE dibagi menjadi...",
    options: [
      "2 kategori",
      "3 kategori",
      "4 kategori",
      "5 kategori"
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Meminjamkan kartu tapping kepada orang lain termasuk pelanggaran ....",
    options: [
      "Berat",
      "Sedang",
      "Ringan",
      "Sangat berat"
    ],
    correctAnswer: 2,
  },
  {
    id: 11,
    question: "Safety dalam SHE berfokus pada ....",
    options: [
      "Nilai akademik",
      "Pencegahan dan pengelolaan risiko bahaya",
      "Pengelolaan keuangan",
      "Pelayanan administrasi"
    ],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "Health mencakup hal berikut, kecuali...",
    options: [
      "Keamanan pangan",
      "Kesehatan mental",
      "Penanganan kondisi darurat",
      "Penggunaan knalpot"
    ],
    correctAnswer: 3,
  },
  {
    id: 13,
    question: "Salah satu bentuk Environment adalah...",
    options: [
      "Menggunakan helm",
      "Pemilahan sampah",
      "Mengurangi kecepatan",
      "Memakai jaket"
    ],
    correctAnswer: 1,
  },
  {
    id: 14,
    question: "Tidak menggunakan helm saat berkendara termasuk pelanggaran ....",
    options: [
      "Ringan",
      "Sedang",
      "Berat",
      "Sangat ringan"
    ],
    correctAnswer: 1,
  },
  {
    id: 15,
    question: "Batas kecepatan maksimal di lingkungan Fakultas Teknik adalah...",
    options: [
      "$20~km/jam$",
      "$25~km/jam$",
      "30 km/jam",
      "40 km/jam"
    ],
    correctAnswer: 2,
  },
  {
    id: 16,
    question: "Menggunakan telepon genggam saat berkendara termasuk pelanggaran ....",
    options: [
      "Ringan",
      "Sedang",
      "Berat",
      "Tidak termasuk pelanggaran"
    ],
    correctAnswer: 1,
  },
  {
    id: 17,
    question: "Memarkir kendaraan sembarangan termasuk pelanggaran ....",
    options: [
      "Ringan",
      "Sedang",
      "Berat",
      "Sangat berat"
    ],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "Menggunakan knalpot brong termasuk pelanggaran ....",
    options: [
      "Ringan",
      "Sedang",
      "Berat",
      "Tidak ada pelanggaran"
    ],
    correctAnswer: 1,
  },
  {
    id: 19,
    question: "Pelanggaran berat merupakan tindakan yang...",
    options: [
      "Tidak berbahaya",
      "Berpotensi langsung membahayakan diri sendiri dan orang lain",
      "Tidak memiliki dampak",
      "Bersifat administratif"
    ],
    correctAnswer: 1,
  },
  {
    id: 20,
    question: "Salah satu bentuk sanksi pelanggaran SHE adalah...",
    options: [
      "Skorsing otomatis",
      "Menjadi Brand Ambassador SHE",
      "Drop Out",
      "Penjara"
    ],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "Pernyataan yang paling tepat mengenai tujuan penerapan SHE adalah ....",
    options: [
      "Mengurangi jumlah kendaraan di kampus",
      "Memastikan seluruh aktivitas sesuai prosedur, aman, dan ramah lingkungan",
      "Meningkatkan prestasi akademik",
      "Mengurangi biaya operasional fakultas"
    ],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "Berikut yang bukan termasuk aspek Health adalah...",
    options: [
      "Layanan rujukan",
      "Penanganan kondisi darurat",
      "Kesehatan fisik dan mental",
      "Pengendalian kualitas lingkungan"
    ],
    correctAnswer: 3,
  },
  {
    id: 23,
    question: "Berboncengan sepeda motor lebih dari dua orang termasuk pelanggaran ....",
    options: [
      "Ringan",
      "Sedang",
      "Berat",
      "Tidak termasuk pelanggaran"
    ],
    correctAnswer: 2,
  },
  {
    id: 24,
    question: "Melewati portal tidak sesuai jenis kendaraan merupakan pelanggaran ....",
    options: [
      "Ringan",
      "Sedang",
      "Berat",
      "Administratif"
    ],
    correctAnswer: 2,
  },
  {
    id: 25,
    question: "Berkendara melawan arus dikategorikan sebagai pelanggaran ....",
    options: [
      "Ringan",
      "Sedang",
      "Berat",
      "Tidak ada kategori"
    ],
    correctAnswer: 2,
  },
  {
    id: 26,
    question: "Tindakan yang paling mencerminkan penerapan aspek Environment adalah...",
    options: [
      "Menggunakan helm",
      "Menjaga kesehatan mental",
      "Mengurangi residu dan memilah sampah",
      "Menggunakan kartu tapping"
    ],
    correctAnswer: 2,
  },
  {
    id: 27,
    question: "Mengapa seluruh sivitas akademika diharapkan mendukung budaya SHE?",
    options: [
      "Agar memperoleh nilai tinggi",
      "Agar dapat beraktivitas secara aman bagi diri sendiri, orang lain, dan lingkungan",
      "Agar kendaraan lebih banyak",
      "Agar proses administrasi lebih cepat"
    ],
    correctAnswer: 1,
  },
  {
    id: 28,
    question: "Perbedaan utama pelanggaran sedang dan berat adalah...",
    options: [
      "Pelanggaran sedang hanya terjadi di parkiran",
      "Pelanggaran berat berpotensi langsung membahayakan diri sendiri dan orang lain",
      "Pelanggaran sedang tidak memiliki sanksi",
      "Pelanggaran berat hanya berkaitan dengan administrasi"
    ],
    correctAnswer: 1,
  },
  {
    id: 29,
    question: "Manakah kombinasi yang seluruhnya merupakan pelanggaran sedang?",
    options: [
      "Tidak memakai helm, menggunakan telepon saat berkendara, parkir sembarangan",
      "Melawan arus, menabrak portal, parkir sembarangan",
      "Meminjamkan kartu tapping, melawan arus, knalpot brong",
      "Berboncengan lebih dari dua orang, parkir sembarangan, meminjamkan kartu tapping"
    ],
    correctAnswer: 0,
  },
  {
    id: 30,
    question: "Seorang mahasiswa menggunakan telepon saat berkendara kemudian melaju dengan kecepatan $40~km/jam$ di lingkungan Fakultas Teknik. Berdasarkan aturan SHE, mahasiswa tersebut telah melakukan...",
    options: [
      "Satu pelanggaran ringan",
      "Dua pelanggaran sedang",
      "Satu pelanggaran berat",
      "Tidak melakukan pelanggaran"
    ],
    correctAnswer: 1,
  },
  {
    id: 31,
    question: "Seorang mahasiswa selalu menggunakan helm dan mematuhi batas kecepatan, tetapi membuang sampah sembarangan di lingkungan kampus. Tindakan tersebut menunjukkan bahwa ia telah menerapkan seluruh aspek SHE.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "Mahasiswa A meminjamkan kartu tapping kepada temannya, sedangkan Mahasiswa B berkendara melawan arus. Berdasarkan tingkat risikonya, pelanggaran Mahasiswa B memiliki kategori yang lebih berat daripada pelanggaran Mahasiswa A.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 0,
  },
  {
    id: 33,
    question: "Apabila seseorang menggunakan telepon genggam saat berkendara namun tetap berada di bawah batas kecepatan $30~km/jam$, maka tindakannya tidak termasuk pelanggaran SHE.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "Seseorang yang menjaga keselamatan berkendara tetapi menggunakan knalpot yang tidak sesuai standar telah melanggar lebih dari satu tujuan penerapan SHE.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 0,
  },
  {
    id: 35,
    question: "Penerapan budaya SHE akan dianggap berhasil apabila angka kecelakaan menurun, meskipun kebersihan lingkungan kampus tidak lagi menjadi perhatian.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 1,
  }
];