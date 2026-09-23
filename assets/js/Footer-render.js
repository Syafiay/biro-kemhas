(function () {
  "use strict";

  let isInitialized = false;

  /* ---------------- bagian 1: brand ---------------- */
  function renderBrand(brand, wrapper) {
    const logoRow = document.createElement("div");
    logoRow.className = "footer-brand-row";
    logoRow.innerHTML = `
      <img src="${brand.logo}" alt="${brand.name}" class="footer-logo">
      <div class="footer-brand-text">
        <span class="footer-brand-name">${brand.name}</span>
        <span class="footer-brand-tagline">${brand.tagline}</span>
      </div>
    `;

    const desc = document.createElement("p");
    desc.className = "footer-desc";
    desc.textContent = brand.description;

    const socials = document.createElement("div");
    socials.className = "footer-socials";
    brand.socials.forEach((s) => {
      const a = document.createElement("a");
      a.className = "footer-social-btn";
      a.href = s.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", s.label);
      a.innerHTML = `<i class="${s.icon}"></i>`;
      socials.appendChild(a);
    });

    wrapper.append(logoRow, desc, socials);
  }

  /* ---------------- bagian 2: kolom link ---------------- */
  function renderColumns(columns, wrapper) {
    columns.forEach((col) => {
      const colEl = document.createElement("div");
      colEl.className = "footer-col";

      const heading = document.createElement("p");
      heading.className = "footer-col-title";
      heading.textContent = col.title;
      colEl.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "footer-link-list";
      col.links.forEach((link) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${link.url}"><i class="fas fa-chevron-right"></i> ${link.label}</a>`;
        list.appendChild(li);
      });
      colEl.appendChild(list);

      wrapper.appendChild(colEl);
    });
  }

  /* ---------------- bagian 3: kontak ---------------- */
  function renderContact(contact, wrapper) {
    const heading = document.createElement("p");
    heading.className = "footer-col-title";
    heading.textContent = "Hubungi Kami";
    wrapper.appendChild(heading);

    const rows = [
      { icon: "fas fa-location-dot", text: contact.address },
      { icon: "fas fa-envelope", text: contact.email, href: `mailto:${contact.email}` },
      { icon: "fas fa-phone", text: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, "")}` }
    ];

    rows.forEach((row) => {
      const item = document.createElement("div");
      item.className = "footer-contact-item";

      const icon = document.createElement("span");
      icon.className = "footer-contact-icon";
      icon.innerHTML = `<i class="${row.icon}"></i>`;

      const textEl = row.href ? document.createElement("a") : document.createElement("span");
      textEl.className = "footer-contact-text";
      if (row.href) textEl.href = row.href;
      textEl.textContent = row.text;

      item.append(icon, textEl);
      wrapper.appendChild(item);
    });
  }

  /* ---------------- render utama ---------------- */
  function renderFooter() {
    const brandSlot = document.querySelector(".footer-brand");
    const columnsSlot = document.querySelector(".footer-columns");
    const contactSlot = document.querySelector(".footer-contact");
    if (!brandSlot || !columnsSlot || !contactSlot) return false;
    if (isInitialized) return true;
    isInitialized = true;

    brandSlot.innerHTML = "";
    columnsSlot.innerHTML = "";
    contactSlot.innerHTML = "";

    renderBrand(FOOTER_DATA.brand, brandSlot);
    renderColumns(FOOTER_DATA.linkColumns, columnsSlot);
    renderContact(FOOTER_DATA.contact, contactSlot);

    return true;
  }

  document.addEventListener("DOMContentLoaded", renderFooter);
  document.addEventListener("components:loaded", renderFooter);
})();