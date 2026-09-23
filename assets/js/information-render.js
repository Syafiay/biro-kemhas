/**
 * information-render.js
 * -----------------------------------------------------------------------
 * Generate tab buttons & panel konten dari INFORMATION_DATA, lalu urus
 * switch antar tab (klik -> pindah panel + geser pill indicator).
 * -----------------------------------------------------------------------
 */

(function () {
  "use strict";

  let isInitialized = false;

  /* ---------------- builder tiap tipe layout ---------------- */

  function buildIntroPanel(item) {
    const wrap = document.createElement("div");
    wrap.className = "panel panel-intro";

    const left = document.createElement("div");
    left.className = "panel-intro-media";
    left.innerHTML = `<img src="${item.image}" alt="${item.title}">`;

    const right = document.createElement("div");
    right.className = "panel-intro-body";
    right.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.text}</p>
    `;

    wrap.append(left, right);
    return wrap;
  }

  function buildSpotlightPanel(item) {
    const wrap = document.createElement("div");
    wrap.className = "panel panel-spotlight";

    const icon = document.createElement("div");
    icon.className = "spotlight-icon";
    icon.textContent = item.icon;

    const title = document.createElement("h2");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.className = "spotlight-text" + (item.quote ? " is-quote" : "");
    text.textContent = item.text;

    wrap.append(icon, title, text);

    if (item.tags && item.tags.length) {
      const tagWrap = document.createElement("div");
      tagWrap.className = "spotlight-tags";
      item.tags.forEach((tag) => {
        const pill = document.createElement("span");
        pill.className = "spotlight-tag";
        pill.innerHTML = `<span>${tag.icon}</span> ${tag.label}`;
        tagWrap.appendChild(pill);
      });
      wrap.appendChild(tagWrap);
    }

    return wrap;
  }

  function buildGridPanel(item) {
    const wrap = document.createElement("div");
    wrap.className = "panel panel-grid";

    const header = document.createElement("div");
    header.className = "panel-grid-header";
    header.innerHTML = `<span class="panel-grid-icon">${item.icon}</span><h2>${item.title}</h2>`;
    wrap.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "grid-cards";

    item.items.forEach((card, index) => {
      const el = document.createElement("div");
      el.className = "grid-card";
      el.innerHTML = `
        <span class="grid-card-number">${index + 1}</span>
        <span class="grid-card-icon">${card.icon}</span>
        <div class="grid-card-title">${card.title}</div>
        <div class="grid-card-desc">${card.desc}</div>
      `;
      grid.appendChild(el);
    });

    wrap.appendChild(grid);
    return wrap;
  }

  function buildHighlightsPanel(item) {
    const wrap = document.createElement("div");
    wrap.className = "panel panel-highlights";

    const left = document.createElement("div");
    left.className = "highlights-body";
    left.innerHTML = `
      <span class="highlights-icon">${item.icon}</span>
      <h2>${item.title}</h2>
      <p>${item.text}</p>
    `;

    const right = document.createElement("div");
    right.className = "highlights-list";

    item.highlights.forEach((h) => {
      const row = document.createElement("div");
      row.className = "highlights-item";
      row.innerHTML = `
        <span class="highlights-item-icon">${h.icon}</span>
        <div>
          <div class="highlights-item-label">${h.label}</div>
          <div class="highlights-item-desc">${h.desc}</div>
        </div>
      `;
      right.appendChild(row);
    });

    wrap.append(left, right);
    return wrap;
  }

  const PANEL_BUILDERS = {
    intro: buildIntroPanel,
    spotlight: buildSpotlightPanel,
    grid: buildGridPanel,
    highlights: buildHighlightsPanel
  };

  /* ---------------- render tab bar + panels ---------------- */

  function renderInformation() {
    const tabBar = document.querySelector(".tab_box");
    const contentBox = document.querySelector(".content-box");
    if (!tabBar || !contentBox) return false;
    if (isInitialized) return true;
    isInitialized = true;

    tabBar.innerHTML = "";
    contentBox.innerHTML = "";

    const highlight = document.createElement("div");
    highlight.className = "tab-highlight";
    tabBar.appendChild(highlight);

    INFORMATION_DATA.forEach((item, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab_btn" + (index === 0 ? " active" : "");
      btn.dataset.index = String(index);
      btn.innerHTML = `<span class="tab_btn-icon">${item.tabIcon}</span><span>${item.tabLabel}</span>`;
      tabBar.appendChild(btn);

      const builder = PANEL_BUILDERS[item.type];
      if (!builder) {
        console.warn(`information-render: tipe "${item.type}" belum ada builder-nya.`);
        return;
      }
      const panel = builder(item);
      panel.classList.toggle("active", index === 0);
      contentBox.appendChild(panel);
    });

    initTabSwitching(tabBar, contentBox, highlight);
    // posisi awal highlight (setelah layout ke-render, biar offsetWidth akurat)
    requestAnimationFrame(() => moveHighlight(highlight, tabBar.querySelector(".tab_btn")));

    return true;
  }

  function initTabSwitching(tabBar, contentBox, highlight) {
    const tabs = () => Array.from(tabBar.querySelectorAll(".tab_btn"));
    const panels = () => Array.from(contentBox.querySelectorAll(".panel"));

    tabBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab_btn");
      if (!btn) return;

      tabs().forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      moveHighlight(highlight, btn);

      const index = Number(btn.dataset.index);
      panels().forEach((p, i) => p.classList.toggle("active", i === index));
    });

    // reposisi highlight kalau ukuran layar berubah (tab bisa wrap/beda lebar)
    window.addEventListener("resize", () => {
      const activeTab = tabBar.querySelector(".tab_btn.active");
      moveHighlight(highlight, activeTab);
    });
  }

  function moveHighlight(highlight, targetTab) {
    if (!targetTab) return;
    highlight.style.width = `${targetTab.offsetWidth}px`;
    highlight.style.height = `${targetTab.offsetHeight}px`;
    highlight.style.transform = `translate(${targetTab.offsetLeft}px, ${targetTab.offsetTop}px)`;
  }

  document.addEventListener("DOMContentLoaded", renderInformation);
  document.addEventListener("components:loaded", renderInformation);
})();