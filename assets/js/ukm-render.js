/**
 * ukm-render.js
 * -----------------------------------------------------------------------
 * Merender kartu UKM ke dalam .cards-wrapper berdasarkan UKM_DATA
 * (lihat ukm-data.js). Ini yang menggantikan pendekatan HTML statis
 * sebelumnya, menyerupai pola di biroaakk.uinjkt.ac.id: satu template
 * kartu + data → di-loop pakai JS, bukan ditulis manual satu-satu.
 * -----------------------------------------------------------------------
 */

function createUkmCard(ukm) {
  // Buat elemen card
  const card = document.createElement("div");
  card.className = `card card-${ukm.glow}`;
  card.dataset.id = ukm.id;

  // Logo
  const img = document.createElement("img");
  img.src = ukm.img;
  img.alt = `Logo ${ukm.name}`;
  img.className = "card-img";

  // Judul
  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = ukm.name;

  // Deskripsi singkat
  const desc = document.createElement("div");
  desc.className = "card-desc";
  desc.textContent = ukm.desc;

  // Tombol/tag "Detail" -> menuju halaman detail dengan query id
  const tag = document.createElement("a");
  tag.className = "card-tag";
  tag.href = `/pages/ukm/ukm-detail.html?id=${encodeURIComponent(ukm.id)}`;
  tag.textContent = "Detail →";

  // Susun semua elemen ke dalam card
  card.append(img, title, desc, tag);

  // Klik di mana saja pada card juga mengarahkan ke halaman detail
  card.addEventListener("click", (e) => {
    // hindari trigger dobel kalau yang diklik memang link "Detail"-nya
    if (e.target.closest("a")) return;
    window.location.href = tag.href;
  });

  return card;
}

function renderUkmCards() {
  const wrapper = document.querySelector(".cards-wrapper");
  if (!wrapper) return;

  wrapper.innerHTML = ""; // kosongkan dulu

  const fragment = document.createDocumentFragment();
  UKM_DATA.forEach((ukm) => fragment.appendChild(createUkmCard(ukm)));
  wrapper.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", renderUkmCards);
