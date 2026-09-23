
(function () {
  "use strict";

  let isInitialized = false;

  /* ---------------- 1. baca id dari URL ---------------- */
  function getBeritaIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");

    console.log("URL:", window.location.href);
    console.log("ID dari URL:", id);

    return id;
  }

  /* ---------------- 2. cari data-nya ---------------- */
function findBeritaById(id) {
    console.log("ID yang dicari:", id);
    console.log("BERITA_DATA:", BERITA_DATA);

    const result = BERITA_DATA.find(berita => berita.id === id);

    console.log("Hasil pencarian:", result);

    return result;
}

  /* ---------------- 3a. render daftar penulis ---------------- */
  function renderAuthors(authors) {
    const wrap = document.createElement("div");
    wrap.className = "berita-detail-authors";

    authors.forEach((name) => {
      const item = document.createElement("span");
      item.className = "berita-detail-author";
      item.innerHTML = `<i class="fas fa-user"></i> ${name}`;
      wrap.appendChild(item);
    });

    return wrap;
  }

  /* ---------------- 3b. render kalau id nggak ketemu ---------------- */
  function renderNotFound(container) {
    container.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "berita-detail-card";

    const msg = document.createElement("p");
    msg.className = "not-found-msg";
    msg.textContent = "Berita yang kamu cari tidak ditemukan.";

    const backBtn = document.createElement("a");
    backBtn.className = "berita-btn";
    backBtn.href = "/pages/berita/berita.html";
    backBtn.textContent = "Kembali ke Daftar Berita →";

    wrap.append(msg, backBtn);
    container.appendChild(wrap);
  }

  /* ---------------- 3c. render detail utama ---------------- */
  function renderBeritaDetail() {
    const container = document.getElementById("berita-detail-content");
    if (!container) return false;
    if (isInitialized) return true;
    isInitialized = true;

    const id = getBeritaIdFromUrl();
    const berita = id ? findBeritaById(id) : null;

    if (!berita) {
      renderNotFound(container);
      return true;
    }

    container.innerHTML = "";
    const card = document.createElement("article");
    card.className = "berita-detail-card";

    // ---- media: gambar + badge tanggal + tag ----
    const media = document.createElement("div");
    media.className = "berita-detail-media";
    media.innerHTML = `<img src="${berita.image}" alt="${berita.title}">`;

    const dateBadge = document.createElement("div");
    dateBadge.className = "berita-date-badge";
    dateBadge.innerHTML = `<span class="day">${berita.day}</span><span class="month">${berita.month}</span>`;
    media.appendChild(dateBadge);

    if (berita.tag) {
      const tag = document.createElement("span");
      tag.className = "berita-tag";
      tag.innerHTML = `<i class="fas fa-star"></i> ${berita.tag}`;
      media.appendChild(tag);
    }

    // ---- body: judul, penulis, isi ----
    const body = document.createElement("div");
    body.className = "berita-detail-body";

    const title = document.createElement("h1");
    title.className = "berita-detail-title";
    title.textContent = berita.title;

    const authors = renderAuthors(berita.authors);

    // const desc = document.createElement("p");
    // desc.className = "berita-detail-desc";
    // desc.textContent = berita.excerpt || "";

    const contentWrap = document.createElement("p");
    contentWrap.className = "berita-detail-desc";

    (berita.content || []).forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      contentWrap.appendChild(p);
    })

    const backLink = document.createElement("a");
    backLink.className = "berita-detail-back";
    backLink.href = "/pages/berita/berita.html";
    backLink.innerHTML = `&larr; Kembali ke Daftar Berita`;

    body.append(title, authors, contentWrap);
    card.append(media, body);
    container.append(card);

    return true;
  }

  document.addEventListener("DOMContentLoaded", renderBeritaDetail);
  document.addEventListener("components:loaded", renderBeritaDetail);
})();