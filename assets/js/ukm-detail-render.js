/**
 * ukm-detail-render.js
 * -----------------------------------------------------------------------
 * Membaca parameter ?id=... dari URL, mencari data UKM yang cocok di
 * UKM_DATA (ukm-data.js), lalu merender kontennya ke dalam
 * #ukm-detail-content pakai DOM manipulation.
 *
 * Contoh URL: /pages/ukm/ukm-detail.html?id=kopma
 * -----------------------------------------------------------------------
 */

function getUkmIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function findUkmById(id) {
  return UKM_DATA.find((ukm) => ukm.id === id);
}

function renderProgramKerja(programKerja) {
  const grid = document.createElement("div");
  grid.className = "program-kerja-grid";

  programKerja.forEach((item) => {
    const pill = document.createElement("div");
    pill.className = "program-kerja-item";

    const check = document.createElement("span");
    check.className = "program-kerja-check";
    check.textContent = "✓";

    const label = document.createElement("span");
    label.textContent = item;

    pill.append(check, label);
    grid.appendChild(pill);
  });

  return grid;
}

function renderNotFound(container) {
  container.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "detail-card";

  const msg = document.createElement("p");
  msg.className = "not-found-msg";
  msg.textContent = "UKM yang kamu cari tidak ditemukan.";

  const backBtn = document.createElement("a");
  backBtn.className = "card-tag";
  backBtn.href = "/pages/ukm/ukm.html";
  backBtn.textContent = "Kembali ke Daftar UKM →";

  wrap.append(msg, backBtn);
  container.appendChild(wrap);
}

function renderUkmDetail() {
  const container = document.getElementById("ukm-detail-content");
  if (!container) return;

  const id = getUkmIdFromUrl();
  const ukm = id ? findUkmById(id) : null;

  if (!ukm) {
    renderNotFound(container);
    return;
  }

  container.innerHTML = "";
  container.style.setProperty("--glow-color", `var(--neon-${ukm.glow})`);

  const card = document.createElement("div");
  card.className = `detail-card card-${ukm.glow}`;

  // Header: logo + nama + deskripsi singkat
  const header = document.createElement("div");
  header.className = "detail-header";

  const img = document.createElement("img");
  img.src = ukm.img;
  img.alt = `Logo ${ukm.name}`;
  img.className = "detail-logo";

  const headerText = document.createElement("div");

  const title = document.createElement("h1");
  title.className = "detail-title";
  title.textContent = ukm.name;

  const desc = document.createElement("p");
  desc.className = "detail-desc";
  desc.textContent = ukm.desc;

  headerText.append(title, desc);
  header.append(img, headerText);

  // Divider
  const divider = document.createElement("hr");
  divider.className = "detail-divider";

  // Tentang Organisasi
  const aboutHeading = document.createElement("h2");
  aboutHeading.className = "detail-section-heading";
  aboutHeading.textContent = "Tentang Organisasi";

  const aboutText = document.createElement("p");
  aboutText.className = "detail-about";
  aboutText.textContent = ukm.about;

  const contentWrap = document.createElement("p");
  contentWrap.className = "detail-about";

  (ukm.content || []).forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    contentWrap.appendChild(p);
  });

  // Program Kerja
  const programHeading = document.createElement("h2");
  programHeading.className = "detail-section-heading";
  programHeading.textContent = "Program Kerja";

  const programGrid = renderProgramKerja(ukm.programKerja);

  card.append(
    header,
    divider,
    aboutHeading,
    aboutText,
    contentWrap,
    programHeading,
    programGrid
  );

  container.appendChild(card);
}

document.addEventListener("DOMContentLoaded", renderUkmDetail);
