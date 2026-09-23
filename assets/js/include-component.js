/* ============================================================
   assets/js/include-component.js
   Tugasnya cuma satu: cari semua elemen yang punya atribut
   data-include, fetch file HTML yang ditunjuk, lalu tempelkan
   isinya ke dalam elemen itu.

   Cara pakai di halaman manapun (baik di root atau di subfolder):
     <div data-include="/components/navbar.html"></div>
     <script src="/assets/js/include-component.js"></script>

   PENTING: path di data-include HARUS diawali garis miring "/"
   (root-relative), BUKAN "components/navbar.html" saja.
   Kalau tidak pakai "/", path itu akan dihitung relatif terhadap
   halaman yang memanggilnya -- jadi kalau dipanggil dari
   about/kepengurusan.html, browser akan mencari file di
   about/components/navbar.html yang tidak ada, dan gagal diam-diam.
   ============================================================ */
async function loadComponent(el){
  const path = el.getAttribute('data-include');
  try{
    const res = await fetch(path);
    if(!res.ok) throw new Error(`Gagal memuat ${path}: HTTP ${res.status}`);
    el.innerHTML = await res.text();
  }catch(err){
    // Kalau gagal, jangan biarkan halaman kosong tanpa penjelasan --
    // tampilkan pesan singkat di tempat komponen seharusnya muncul.
    el.innerHTML = `<p style="color:#c0392b;font-size:12px;padding:8px;">
      Komponen tidak termuat (${path}). Pastikan file dijalankan lewat
      local server, bukan dibuka langsung dari file explorer.
    </p>`;
    console.error(err);
  }
}

async function loadAllComponents(){
  const targets = document.querySelectorAll('[data-include]');
  // Pakai Promise.all supaya semua komponen (navbar, footer, dll)
  // dimuat bersamaan, bukan satu-satu berurutan -- lebih cepat.
  await Promise.all(Array.from(targets).map(loadComponent));

  // Beritahu halaman bahwa semua komponen sudah siap di DOM,
  // supaya script lain (misal dropdown navbar) bisa jalan setelahnya.
  document.dispatchEvent(new Event('components:loaded'));
}

document.addEventListener('DOMContentLoaded', loadAllComponents);