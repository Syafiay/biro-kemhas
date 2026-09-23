// /**
//  * navbar.js
//  * -----------------------------------------------------------------------
//  * Semua interaksi navbar tanpa Bootstrap JS:
//  *  - buka/tutup dropdown desktop & mobile (klik, klik-di-luar, tombol Esc)
//  *  - buka/tutup menu mobile (hamburger)
//  *  - toggle dark mode (checkbox desktop & mobile disinkronkan, disimpan
//  *    di localStorage supaya kepilih terus tiap buka halaman lain)
//  *  - sembunyikan spinner loading setelah halaman siap
//  *
//  * NOTE: logika pengambilan jadwal sholat (isi #prayerNavTime /
//  * #prayerMobileTime) sengaja TIDAK ada di sini — itu urusan script lain
//  * yang sudah/akan kamu buat terpisah. File ini cuma urus UI navbar.
//  * -----------------------------------------------------------------------
//  */

// (function () {
//   "use strict";

//   function initNavbar(root) {
//     const navbar = root.querySelector("#mainNavbar");
//     if (!navbar) return; // navbar belum ada di DOM (misal belum di-include)

//     initDropdowns(navbar);
//     initMobileToggle(navbar);
//     // Dark mode SUDAH diurus oleh script terpisah (prayer-times & dark
//     // mode script kamu, yang pakai data-theme="dark" + localStorage
//     // "darkMode"). Makanya initDarkMode() di sini sengaja dimatikan biar
//     // nggak dobel/bentrok sama itu.
//   }

//   /* ---------------- Dropdown (desktop + accordion mobile) ---------------- */
//   function initDropdowns(navbar) {
//     const dropdownItems = navbar.querySelectorAll(".nav-item.has-dropdown");

//     dropdownItems.forEach((item) => {
//       const toggle = item.querySelector(":scope > .dropdown-toggle");
//       if (!toggle) return;

//       toggle.setAttribute("aria-expanded", "false");

//       toggle.addEventListener("click", (e) => {
//         e.stopPropagation();
//         const isOpen = item.classList.contains("is-open");

//         // tutup dropdown lain yang lagi kebuka
//         dropdownItems.forEach((other) => {
//           if (other !== item) closeDropdown(other);
//         });

//         isOpen ? closeDropdown(item) : openDropdown(item);
//       });

//       // keyboard: Escape nutup dropdown & balikin fokus ke toggle-nya
//       toggle.addEventListener("keydown", (e) => {
//         if (e.key === "Escape") {
//           closeDropdown(item);
//           toggle.focus();
//         }
//       });
//     });

//     // klik di luar navbar -> tutup semua dropdown
//     document.addEventListener("click", (e) => {
//       if (!navbar.contains(e.target)) {
//         dropdownItems.forEach(closeDropdown);
//       }
//     });

//     // Escape global -> tutup semua dropdown
//     document.addEventListener("keydown", (e) => {
//       if (e.key === "Escape") {
//         dropdownItems.forEach(closeDropdown);
//       }
//     });
//   }

//   function openDropdown(item) {
//     item.classList.add("is-open");
//     const toggle = item.querySelector(":scope > .dropdown-toggle");
//     if (toggle) toggle.setAttribute("aria-expanded", "true");
//   }

//   function closeDropdown(item) {
//     item.classList.remove("is-open");
//     const toggle = item.querySelector(":scope > .dropdown-toggle");
//     if (toggle) toggle.setAttribute("aria-expanded", "false");
//   }

//   /* ---------------- Mobile hamburger menu ---------------- */
//   function initMobileToggle(navbar) {
//     const toggleBtn = navbar.querySelector("#mobileToggle");
//     if (!toggleBtn) return;

//     toggleBtn.addEventListener("click", () => {
//       const isOpen = navbar.classList.toggle("is-menu-open");
//       toggleBtn.classList.toggle("is-open", isOpen);
//       toggleBtn.setAttribute("aria-expanded", String(isOpen));
//       toggleBtn.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
//     });

//     // klik link biasa (bukan tombol dropdown) di mobile -> otomatis tutup menu
//     navbar.querySelectorAll(".nav-menu .nav-link:not(.dropdown-toggle)").forEach((link) => {
//       link.addEventListener("click", () => {
//         navbar.classList.remove("is-menu-open");
//         toggleBtn.classList.remove("is-open");
//         toggleBtn.setAttribute("aria-expanded", "false");
//       });
//     });
//   }

//   /* ---------------- Spinner loading ---------------- */
//   function hideSpinner() {
//     const spinner = document.getElementById("spinner");
//     if (!spinner) return;
//     spinner.classList.add("is-hiding");
//     setTimeout(() => spinner.classList.remove("show"), 300);
//   }

//   /* ---------------- Bootstrap init ---------------- */
//   // Kalau navbar di-include lewat data-include (fetch async), tunggu event
//   // custom "navbar:loaded" (dipicu sama script include kamu) atau langsung
//   // jalan kalau navbar sudah ada waktu DOMContentLoaded.
//   document.addEventListener("DOMContentLoaded", () => {
//     initNavbar(document);
//     window.addEventListener("load", hideSpinner);
//   });

// document.addEventListener("components:loaded", () => {
//   initNavbar(document);
// });
// })();
// // document.addEventListener("components:loaded", () => {
// //   initNavbar(document);
// // });
/**
 * navbar.js
 * -----------------------------------------------------------------------
 * Semua interaksi navbar tanpa Bootstrap JS:
 *  - buka/tutup dropdown desktop & mobile (klik, klik-di-luar, tombol Esc)
 *  - buka/tutup menu mobile (hamburger)
 *  - toggle dark mode (checkbox desktop & mobile disinkronkan, disimpan
 *    di localStorage supaya kepilih terus tiap buka halaman lain)
 *  - sembunyikan spinner loading setelah halaman siap
 *
 * NOTE: logika pengambilan jadwal sholat (isi #prayerNavTime /
 * #prayerMobileTime) sengaja TIDAK ada di sini — itu urusan script lain
 * yang sudah/akan kamu buat terpisah. File ini cuma urus UI navbar.
 * -----------------------------------------------------------------------
 */

(function () {
  "use strict";

  function initNavbar(root) {
    const navbar = root.querySelector("#mainNavbar");
    if (!navbar) return; // navbar belum ada di DOM (misal belum di-include)
    if (navbar.dataset.navbarInitialized === "true") return; // already initialized

    navbar.dataset.navbarInitialized = "true";
    initDropdowns(navbar);
    initMobileToggle(navbar);
    // Dark mode SUDAH diurus oleh script terpisah (prayer-times & dark
    // mode script kamu, yang pakai data-theme="dark" + localStorage
    // "darkMode"). Makanya initDarkMode() di sini sengaja dimatikan biar
    // nggak dobel/bentrok sama itu.
  }

  /* ---------------- Dropdown (desktop + accordion mobile) ---------------- */
  function initDropdowns(navbar) {
    const dropdownItems = navbar.querySelectorAll(".nav-item.has-dropdown");

    dropdownItems.forEach((item) => {
      const toggle = item.querySelector(":scope > .dropdown-toggle");
      if (!toggle) return;

      toggle.setAttribute("aria-expanded", "false");

      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains("is-open");

        // tutup dropdown lain yang lagi kebuka
        dropdownItems.forEach((other) => {
          if (other !== item) closeDropdown(other);
        });

        isOpen ? closeDropdown(item) : openDropdown(item);
      });

      // keyboard: Escape nutup dropdown & balikin fokus ke toggle-nya
      toggle.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeDropdown(item);
          toggle.focus();
        }
      });
    });

    // klik di luar navbar -> tutup semua dropdown
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) {
        dropdownItems.forEach(closeDropdown);
      }
    });

    // Escape global -> tutup semua dropdown
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdownItems.forEach(closeDropdown);
      }
    });
  }

  function openDropdown(item) {
    item.classList.add("is-open");
    const toggle = item.querySelector(":scope > .dropdown-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }

  function closeDropdown(item) {
    item.classList.remove("is-open");
    const toggle = item.querySelector(":scope > .dropdown-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  /* ---------------- Mobile hamburger menu ---------------- */
  function initMobileToggle(navbar) {
    const toggleBtn = navbar.querySelector("#mobileToggle");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-menu-open");
      toggleBtn.classList.toggle("is-open", isOpen);
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    });

    // klik link biasa (bukan tombol dropdown) di mobile -> otomatis tutup menu
    navbar.querySelectorAll(".nav-menu .nav-link:not(.dropdown-toggle)").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("is-menu-open");
        toggleBtn.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Spinner loading ---------------- */
  function hideSpinner() {
    const spinner = document.getElementById("spinner");
    if (!spinner) return;
    spinner.classList.add("is-hiding");
    setTimeout(() => spinner.classList.remove("show"), 300);
  }

  /* ---------------- Bootstrap init ---------------- */
  // Kalau navbar-nya sudah langsung ada di HTML (bukan lewat include),
  // ini bakal langsung jalan.
  document.addEventListener("DOMContentLoaded", () => {
    initNavbar(document);
    window.addEventListener("load", hideSpinner);
  });

  // Kalau navbar di-include lewat data-include (fetch async), navbar belum
  // ada di DOM pas DOMContentLoaded nembak -> initNavbar() di atas nggak
  // nemu apa-apa. include-component.js nembak event "components:loaded"
  // SETELAH semua [data-include] (termasuk navbar) selesai ditempel ke
  // DOM -- makanya kita dengerin event itu (nama harus PERSIS sama).
  document.addEventListener("components:loaded", () => {
    initNavbar(document);
  });
})();