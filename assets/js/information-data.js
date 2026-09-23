/**
 * information-data.js
 * -----------------------------------------------------------------------
 * Data buat komponen tab "Tentang Kami". Tiap item punya field `type`
 * yang nentuin layout mana yang dipakai (lihat information-render.js):
 *
 *  - "intro"      -> gambar/badge di kiri, judul+paragraf di kanan
 *                    (dipakai: Perkenalan)
 *  - "spotlight"  -> kartu di tengah, icon besar, judul, paragraf
 *                    (opsional: quote=true buat gaya kutipan, tags[])
 *                    (dipakai: Visi, Internship Kemahasiswaan)
 *  - "grid"       -> grid kartu bernomor
 *                    (dipakai: Misi)
 *  - "highlights" -> 2 kolom: paragraf kiri, daftar poin + garis di kanan
 *                    (dipakai: Kemahasiswaan)
 *
 * Buat nambah tab baru: tinggal tambah object baru di array ini dengan
 * `type` yang sesuai -- nggak perlu sentuh HTML atau render.js.
 * -----------------------------------------------------------------------
 */

const INFORMATION_DATA = [
  {
    id: "perkenalan",
    tabIcon: "👋",
    tabLabel: "Perkenalan",
    type: "intro",
    title: "Perkenalan",
    image: "/assets/img/icons/logo formabi tanpa text.png",
    text: "Biro Kemahasiswaan dan Kerja Sama (Biro Kemahasiswaan) adalah unit kerja di lingkungan UIN Syarif Hidayatullah Jakarta yang bertanggung jawab dalam mengelola berbagai aspek terkait mahasiswa, termasuk pengembangan potensi mahasiswa, kegiatan kemahasiswaan, dan kerja sama dengan pihak eksternal. Biro ini berperan penting dalam mendukung pengalaman akademik dan non-akademik mahasiswa, serta memfasilitasi berbagai program yang bertujuan untuk meningkatkan kualitas pendidikan dan kehidupan kampus."
  },
  {
    id: "visi",
    tabIcon: "👁️",
    tabLabel: "Visi",
    type: "spotlight",
    icon: "👁️",
    title: "Visi Biro Kemahasiswaan",
    text: "Menjadi biro yang unggul dalam pengelolaan kemahasiswaan dan kerja sama, serta berperan sebagai pusat inovasi dan pengembangan potensi mahasiswa di UIN Syarif Hidayatullah Jakarta.",
    quote: true,
    tags: [
      { icon: "💡", label: "Inovasi" },
      { icon: "🤝", label: "Kerja Sama" },
      { icon: "🌱", label: "Pengembangan Potensi" }
    ]
  },
  {
    id: "misi",
    tabIcon: "🎯",
    tabLabel: "Misi",
    type: "grid",
    icon: "🎯",
    title: "Empat Pilar Misi",
    items: [
      {
        icon: "💻",
        title: "Inovasi Layanan",
        desc: "Meningkatkan kualitas layanan kemahasiswaan melalui inovasi dan teknologi."
      },
      {
        icon: "🌱",
        title: "Pengembangan Potensi",
        desc: "Mengembangkan program-program yang mendukung pengembangan potensi mahasiswa."
      },
      {
        icon: "🤝",
        title: "Kerja Sama Strategis",
        desc: "Membangun kerja sama yang strategis dengan berbagai pihak untuk mendukung kegiatan kemahasiswaan."
      },
      {
        icon: "📋",
        title: "Pusat Informasi",
        desc: "Menjadi pusat informasi dan sumber daya bagi mahasiswa dalam mengakses layanan dan program kemahasiswaan."
      }
    ]
  },
  {
    id: "kemahasiswaan",
    tabIcon: "🎓",
    tabLabel: "Kemahasiswaan",
    type: "highlights",
    icon: "🎓",
    title: "Program Kemahasiswaan",
    text: "Biro Kemahasiswaan memiliki berbagai program dan layanan yang dirancang untuk mendukung mahasiswa dalam mengembangkan potensi akademik dan non-akademik mereka. Biro ini juga berperan dalam memfasilitasi organisasi mahasiswa dan kegiatan kampus yang memperkaya pengalaman belajar di UIN Syarif Hidayatullah Jakarta.",
    highlights: [
      { icon: "🎨", label: "Kegiatan Ekstrakurikuler", desc: "Wadah minat & bakat mahasiswa di luar akademik." },
      { icon: "🧭", label: "Pelatihan Kepemimpinan", desc: "Membentuk mahasiswa yang siap memimpin." },
      { icon: "🛠️", label: "Pengembangan Keterampilan", desc: "Membekali soft skill & hard skill mahasiswa." },
      { icon: "🎓", label: "Beasiswa & Bantuan Keuangan", desc: "Dukungan finansial bagi mahasiswa yang membutuhkan." }
    ]
  },
  {
    id: "internship",
    tabIcon: "💼",
    tabLabel: "Internship Kemahasiswaan",
    type: "spotlight",
    icon: "💼",
    title: "Internship Kemahasiswaan",
    text: "Program yang diselenggarakan oleh Biro Kemahasiswaan untuk memberikan kesempatan kepada mahasiswa mendapatkan pengalaman praktis dalam bidang kemahasiswaan dan kerja sama, sekaligus membangun jaringan dan kesiapan menghadapi dunia kerja.",
    quote: false,
    tags: [
      { icon: "💼", label: "Pengalaman Praktis" },
      { icon: "🚀", label: "Keterampilan Profesional" },
      { icon: "🌐", label: "Jaringan Relasi" }
    ]
  }
];