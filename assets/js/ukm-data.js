/**
 * ukm-data.js
 * -----------------------------------------------------------------------
 * Satu sumber data untuk semua UKM. Halaman daftar (ukm.html) dan halaman
 * detail (ukm-detail.html) sama-sama membaca dari array UKM_DATA ini.
 *
 * Cara nambah/ubah UKM: tinggal edit / tambah object di bawah, tidak perlu
 * sentuh HTML sama sekali.
 *
 * Field:
 *  id           -> dipakai di URL, contoh: ukm-detail.html?id=ldk-syahid
 *  name         -> nama UKM
 *  desc         -> deskripsi singkat (tampil di card)
 *  tagline      -> teks kecil yang muncul saat card di-hover
 *  img          -> path logo
 *  glow         -> nama kelas warna glow: cyan | purple | pink | green |
 *                  yellow | white | orange | brown
 *  about        -> paragraf "Tentang Organisasi" di halaman detail
 *  programKerja -> array string, daftar program kerja di halaman detail
 * -----------------------------------------------------------------------
 */

const UKM_DATA = [
  {
    id: "ldk-syahid",
    name: "LDK Syahid",
    desc: "Unit Kegiatan Mahasiswa LDK Syahid",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/ldk sYAHID.JPEG",
    glow: "cyan",
    about: "LDK Syahid adalah Lembaga Dakwah Kampus UIN Syarif Hidayatullah Jakarta yang bergerak di bidang pembinaan keislaman, syiar, dan pengembangan karakter mahasiswa muslim melalui berbagai program keagamaan. ",
    content: [
      'Lembaga Dakwah Kampus Syahid (LDK Syahid) merupakan sebuah organisasi dalam lingkup Unit Kegiatan Mahasiswa (UKM) yang berada di bawah naungan Kemahasiswaan UIN Syarif Hidayatullah Jakarta yang didirikan pada hari Selasa 10 Muharram 1417 H bertepatan dengan tanggal 28 Mei 1996 M. Tepat tanggal 28 Mei 1996, dua puluh mahasiswa IAIN Jakarta dari lima fakultas dilantik sebagai pengurus LDK Syahid periode pertama 1996-1997. Pelantikan tersebut langsung dipimpin oleh Senat Mahasiswa Institut (SMI), Thobib El-Hasyr, sekaligus menandai kelahiran LDK Syahid di lingkungan IAIN Syarif Hidayatullah Jakarta yang sekarang telah menjadi UIN Syarif Hidayatullah Jakarta. Ketua SMI saat itu, Muhammad Ali, adalah salah seorang yang memberikan jalan bagi berdirinya LDK Syahid di kampus peradaban ini dalam forum Majelis Perwakilan Mahasiswa Institut (MPMI) saat itu.',
      'Usaha beliau dalam mengukuhkan LDK dimulai dengan mengajak mahasiswa IAIN seperti Misbah (Ushuludin) yang saat itu aktif di lembaga ekstra kampus Fikratussalam yang bergerak di bidang dakwah. Selanjutnya dibentuk tim kecil yang bertugas mempersiapkan berdirinya LDK Syahid, baik persiapan konstitusi maupun persiapan teknis. Tim yang terdiri dari Deka Kurniawan (Ushuludin-Aqidah Filsafat ’93), Muhammad Mustofa (Syariah-MU ’94), dan Rinaldi Syafiq (Tarbiyah-Bahasa Arab 94) itu dihasilkan dalam musyawarah yang dihadiri oleh sejumlah perwakilan fakultas. Deka Kurniawan (Ushuludin-Aqidah Filsafat ’93) merupakan Ketua LDK Syahid yang pertama.'
    ],
    programKerja: [
      "Kajian Rutin Mingguan",
      "Mentoring Keislaman",
      "Syiar Ramadhan",
      "Pelatihan Kepemimpinan Dakwah"
    ]
  },
  {
    id: "teater-syahid",
    name: "UKM Teater Syahid",
    desc: "Teater Syahid",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/tetaer syahid stroke.png",
    glow: "purple",
    about: "UKM Teater Syahid adalah wadah bagi mahasiswa yang tertarik pada seni peran, penyutradaraan, dan produksi pertunjukan panggung.",
    programKerja: [
      "Latihan Rutin Akting",
      "Pementasan Tahunan",
      "Workshop Naskah & Sutradara",
      "Festival Teater Antar Kampus"
    ]
  },
  {
    id: "wira-diarma",
    name: "WIRA DIARMA",
    desc: "Unit Kegiatan WIRA DIARMA",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Lihat desain Canva saya!.png",
    glow: "pink",
    about: "WIRA DIARMA merupakan unit kegiatan mahasiswa yang berfokus pada kedisiplinan, bela negara, dan pengembangan jiwa kepemimpinan.",
    programKerja: [
      "Latihan Dasar Kedisiplinan",
      "Diklat Kepemimpinan",
      "Bakti Sosial",
      "Upacara & Baris-Berbaris"
    ]
  },
  {
    id: "formabi-kip",
    name: "FORMABI KIP",
    desc: "Unit Penerima KIP",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo FORMABI-KIP-1.png",
    glow: "green",
    about: "FORMABI KIP adalah forum mahasiswa penerima Kartu Indonesia Pintar (KIP) Kuliah yang saling mendukung secara akademik maupun non-akademik.",
    programKerja: [
      "Pendampingan Akademik",
      "Diskusi Rutin Anggota",
      "Pelatihan Soft Skill",
      "Advokasi Kesejahteraan Mahasiswa KIP"
    ]
  },
  {
    id: "forsa",
    name: "UKM FORSA UIN",
    desc: "Unit Kegiatan Mahasiswa FORSA",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo Forsa.png",
    glow: "yellow",
    about: "UKM FORSA adalah unit kegiatan mahasiswa di bidang olahraga yang mewadahi minat dan bakat mahasiswa dalam berbagai cabang olahraga.",
    programKerja: [
      "Latihan Rutin Cabang Olahraga",
      "Turnamen Antar Fakultas",
      "Pemusatan Latihan (Training Camp)",
      "Porseni UIN Jakarta"
    ]
  },
  {
    id: "fresh",
    name: "UKM FRESH UIN",
    desc: "Unit FRESH UIN",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/LOGO FRESH 1.png",
    glow: "green",
    about: "UKM FRESH adalah komunitas mahasiswa yang fokus pada isu lingkungan, gaya hidup sehat, dan kegiatan sosial berbasis kepedulian lingkungan.",
    programKerja: [
      "Aksi Bersih Lingkungan Kampus",
      "Kampanye Gaya Hidup Sehat",
      "Penanaman Pohon",
      "Edukasi Pengelolaan Sampah"
    ]
  },
  {
    id: "hiqma",
    name: "UKM HIQMA",
    desc: "Unit Kegiatan HIQMA",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo HIQMA.png",
    glow: "green",
    about: "HIQMA (Himpunan Qari dan Qariah Mahasiswa) adalah UKM yang membina mahasiswa dalam bidang tilawah, tahfiz, dan seni baca Al-Qur'an.",
    programKerja: [
      "Latihan Tilawah Rutin",
      "Sanggar Tahfiz",
      "MTQ Internal Kampus",
      "Delegasi MTQ Regional/Nasional"
    ]
  },
  {
    id: "lpm-institut",
    name: "LPM Institut",
    desc: "Unit Kegiatan Mahasiswa LPM Institut",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo INSTITUT2 merah(1).png",
    glow: "pink",
    about: "LPM Institut adalah Lembaga Pers Mahasiswa yang bergerak di bidang jurnalistik, penulisan, dan penerbitan media kampus.",
    programKerja: [
      "Pelatihan Jurnalistik Dasar",
      "Penerbitan Majalah/Buletin",
      "Liputan Kegiatan Kampus",
      "Diskusi Media & Literasi"
    ]
  },
  {
    id: "kalacitra",
    name: "UKM KALACITRA",
    desc: "Unit Kegiatan Mahasiswa KALACITRA",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo KALACITRA.png",
    glow: "green",
    about: "UKM KALACITRA adalah unit kegiatan mahasiswa di bidang fotografi dan videografi yang mewadahi kreativitas visual mahasiswa.",
    programKerja: [
      "Hunting Foto Bersama",
      "Workshop Fotografi & Videografi",
      "Pameran Karya",
      "Dokumentasi Kegiatan Kampus"
    ]
  },
  {
    id: "kmm-riak",
    name: "UKM KMM RIAK",
    desc: "Unit Kegiatan Mahasiswa KMM RIAK",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo KMM RIAK.PNG",
    glow: "green",
    about: "KMM RIAK adalah unit kegiatan mahasiswa pecinta alam yang aktif dalam kegiatan alam bebas, konservasi, dan penyelamatan lingkungan.",
    programKerja: [
      "Pendidikan Dasar Pecinta Alam",
      "Pendakian & Ekspedisi",
      "Konservasi Lingkungan",
      "SAR & Tanggap Bencana"
    ]
  },
  {
    id: "kopma",
    name: "UKM Kopma",
    desc: "Unit Kegiatan Mahasiswa Kopma",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo Kopma.png",
    glow: "white",
    about: "Kopma (Koperasi Mahasiswa) adalah unit kegiatan yang membina jiwa kewirausahaan dan perkoperasian di kalangan mahasiswa.",
    programKerja: [
      "Pendidikan Dasar Koperasi",
      "Bazaar Kewirausahaan",
      "Rapat Anggota Tahunan (RAT)",
      "Pengembangan Unit Bisnis"
    ]
  },
  {
    id: "ksr",
    name: "UKM KSR",
    desc: "Unit Kegiatan Mahasiswa KSR",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo KSR.jpg",
    glow: "green",
    about: "KSR (Korps Sukarela) PMI adalah unit kegiatan mahasiswa di bidang kepalangmerahan, pertolongan pertama, dan kesiapsiagaan bencana.",
    programKerja: [
      "Pelatihan Pertolongan Pertama",
      "Donor Darah Rutin",
      "Siaga Bencana",
      "Diklat Anggota Baru"
    ]
  },
  {
    id: "mb-uin",
    name: "UKM MB UIN Jakarta",
    desc: "Unit Kegiatan Mahasiswa MB UIN Jakarta",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo MB UIN Jakarta.jpg",
    glow: "yellow",
    about: "UKM MB UIN Jakarta adalah unit kegiatan mahasiswa di bidang musik dan band yang menaungi bakat bermusik mahasiswa.",
    programKerja: [
      "Latihan Band Rutin",
      "Pentas Musik Kampus",
      "Kompetisi Band Antar Kampus",
      "Produksi Karya Musik"
    ]
  },
  {
    id: "menwa",
    name: "UKM MENWA",
    desc: "Unit Kegiatan Mahasiswa MENWA",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo MENWA.jpg",
    glow: "orange",
    about: "Resimen Mahasiswa (Menwa) adalah unit kegiatan mahasiswa di bidang bela negara, kedisiplinan, dan keamanan kampus.",
    programKerja: [
      "Pendidikan Dasar Militer Mahasiswa",
      "Pengamanan Kegiatan Kampus",
      "Latihan Fisik & Kedisiplinan",
      "Bakti Sosial & Tanggap Darurat"
    ]
  },
  {
    id: "pramuka",
    name: "UKM Pramuka",
    desc: "Unit Kegiatan Mahasiswa Pramuka",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/Logo Pramuka.png",
    glow: "brown",
    about: "Racana Pramuka UIN Jakarta adalah unit kegiatan mahasiswa yang membina nilai-nilai kepramukaan, kepemimpinan, dan kemandirian.",
    programKerja: [
      "Latihan Rutin Kepramukaan",
      "Perkemahan Wirakarya",
      "Diklat Pembina Muda",
      "Bakti Masyarakat"
    ]
  },
  {
    id: "psm",
    name: "UKM PSM",
    desc: "Unit Kegiatan Mahasiswa PSM",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/logo psm-1.png",
    glow: "green",
    about: "PSM (Paduan Suara Mahasiswa) adalah unit kegiatan mahasiswa di bidang seni vokal dan paduan suara.",
    programKerja: [
      "Latihan Vokal Rutin",
      "Konser Tahunan",
      "Kompetisi Paduan Suara",
      "Pengisi Acara Resmi Kampus"
    ]
  },
  {
    id: "flat-bahasa",
    name: "UKM FLAT Bahasa",
    desc: "Unit Kegiatan Mahasiswa FLAT Bahasa",
    tagline: "Kamu dan kita adalah saudara, Allahuakbar!",
    img: "/assets/img/icons/LOGO UKM BAHASA-FLAT UIN JAKARTA.png",
    glow: "green",
    about: "UKM FLAT Bahasa adalah unit kegiatan mahasiswa yang berfokus pada pengembangan kemampuan bahasa asing dan kajian kebahasaan.",
    programKerja: [
      "Kelas Bahasa Asing Rutin",
      "English/Arabic Club",
      "Lomba Debat & Pidato Bahasa",
      "Pertukaran Bahasa (Language Exchange)"
    ]
  }
];
