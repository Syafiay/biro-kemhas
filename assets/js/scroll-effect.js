/**
 * scroll-effects.js
 * -----------------------------------------------------------------------
 * 1. Sidebar "artikel terkait" ikut turun bareng scroll, tapi berhenti
 *    begitu sampai di batas bawah container-nya (nggak nabrak footer).
 *    Dihitung manual pakai `transform: translateY()`, bukan cuma
 *    `position: sticky` CSS polos -- ini dipakai supaya perilakunya persis
 *    sama di semua browser & gampang dikembangin lagi kalau nanti mau
 *    ditambah animasi/kondisi lain.
 *
 * 2. Tombol back-to-top: muncul setelah discroll melewati satu halaman
 *    penuh, klik -> smooth scroll balik ke atas.
 * -----------------------------------------------------------------------
 */

(function () {
  "use strict";

  /* ---------------- 1. Sidebar ikut scroll ---------------- */
  function initStickySidebar() {
    const sidebar = document.querySelector(".sidebar");
    const container = document.querySelector(".article-layout");
    if (!sidebar || !container) return;

    const TOP_OFFSET = 24; // jarak sidebar dari atas viewport saat "nempel"
    let ticking = false;

    function updatePosition() {
      const containerRect = container.getBoundingClientRect();
      const sidebarHeight = sidebar.offsetHeight;
      const containerHeight = container.offsetHeight;

      // batas maksimal sidebar boleh turun sebelum keluar dari container
      const maxTranslate = Math.max(containerHeight - sidebarHeight, 0);

      // seberapa jauh container udah kescroll ke atas viewport
      let translateY = TOP_OFFSET - containerRect.top;
      translateY = Math.max(0, Math.min(translateY, maxTranslate));

      sidebar.style.transform = `translateY(${translateY}px)`;
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updatePosition);
    }

    // Cuma aktif kalau layar cukup lebar (di mobile, sidebar.css sudah
    // bikin sidebar pindah ke bawah artikel -- nggak butuh efek ini)
    function isDesktopLayout() {
      return window.matchMedia("(min-width: 801px)").matches;
    }

    function refresh() {
      if (isDesktopLayout()) {
        window.addEventListener("scroll", onScroll, { passive: true });
        updatePosition();
      } else {
        window.removeEventListener("scroll", onScroll);
        sidebar.style.transform = "";
      }
    }

    refresh();
    window.addEventListener("resize", refresh);
  }

  /* ---------------- 2. Tombol back-to-top ---------------- */
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    const SHOW_AFTER_PX = window.innerHeight; // muncul setelah scroll 1 layar penuh

    function toggleVisibility() {
      btn.classList.toggle("is-visible", window.scrollY > SHOW_AFTER_PX);
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initStickySidebar();
    initBackToTop();
  });
})();