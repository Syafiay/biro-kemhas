/**
 * site-interactions.js
 * -----------------------------------------------------------------------
 * Diekstrak dari inline <script> yang tadinya nempel di ukm.html. Isinya:
 *   1. Jadwal sholat (fetch API myquran.com + modal)
 *   2. Dark mode toggle
 *   3. Navbar scroll effect (mengecil/menempel pas discroll)
 *
 * PERUBAHAN dari versi asli:
 *   - Semua inisialisasi yang butuh elemen navbar (checkbox dark mode,
 *     tombol sholat, dll) sekarang nunggu event "components:loaded" dulu
 *     -- bukan langsung jalan pas DOMContentLoaded. Soalnya kalau navbar
 *     di-include lewat data-include, elemen-elemen itu belum ada di DOM
 *     pas DOMContentLoaded nembak (fetch-nya masih jalan).
 *   - Bagian "mobile menu overlay" (mobileMenu / mobileOverlay /
 *     mobileClose) SAYA HAPUS -- itu punya elemen yang nggak ada lagi di
 *     navbar.html versi sekarang (hamburger-nya sudah diurus sendiri
 *     sama navbar.js pakai class .is-menu-open). Kalau masih ada 2 sistem
 *     yang sama-sama coba ngatur hamburger yang sama, malah bentrok.
 *   - #navbarPlaceholder juga nggak ada lagi -- referensinya di-guard
 *     (pakai `?.`) supaya nggak nge-throw error kalau memang belum ada.
 *
 * Kalau kamu masih PERLU fitur modal jadwal sholat (#prayerModalOverlay
 * dkk) atau mobile menu model overlay, kasih tau -- saya tambahin markup
 * & CSS-nya biar nyambung lagi ke script ini.
 * -----------------------------------------------------------------------
 */

function initSiteInteractions() {
  /* ===== PRAYER TIMES ===== */
  (function () {
    const CITY_ID = 1301; // Central Jakarta — change if needed
    const PRAYERS = [
      { key: "subuh", name: "Subuh" },
      { key: "dzuhur", name: "Dzuhur" },
      { key: "ashar", name: "Ashar" },
      { key: "maghrib", name: "Maghrib" },
      { key: "isya", name: "Isya" },
    ];
    let prayerData = null;
    let prayerClockInterval = null;
    let _prayerTouchLock = null;
    let _prayerWheelLock = null;
    let _prayerKeyLock = null;

    function tickPrayerClock() {
      const el = document.getElementById("prayerCurrentTime");
      if (!el) return;
      const now = new Date();
      const wib = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
      el.textContent = [
        String(wib.getHours()).padStart(2, "0"),
        String(wib.getMinutes()).padStart(2, "0"),
        String(wib.getSeconds()).padStart(2, "0"),
      ].join(":");
    }

    function toMinutes(timeStr) {
      if (!timeStr) return Infinity;
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    }

    function getNextPrayer(jadwal) {
      const now = new Date();
      const cur = now.getHours() * 60 + now.getMinutes();
      for (const p of PRAYERS) {
        if (toMinutes(jadwal[p.key]) > cur) return { ...p, time: jadwal[p.key] };
      }
      return { ...PRAYERS[0], time: jadwal[PRAYERS[0].key] };
    }

    function formatDate(d) {
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
      return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    async function fetchPrayerTimes() {
      try {
        const d = new Date();
        const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        const res = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${CITY_ID}/${date}`);
        const json = await res.json();
        if (json.status && json.data) {
          prayerData = json.data;
          updatePrayerButton();
        }
      } catch (e) {
        console.warn("Prayer times fetch failed:", e);
      }
    }

    function updatePrayerButton() {
      if (!prayerData || !prayerData.jadwal) return;
      const next = getNextPrayer(prayerData.jadwal);

      const navName = document.getElementById("prayerNavName");
      const navTime = document.getElementById("prayerNavTime");
      if (navName) navName.textContent = next.name;
      if (navTime) navTime.textContent = next.time;

      const mobileName = document.getElementById("prayerMobileName");
      const mobileTime = document.getElementById("prayerMobileTime");
      if (mobileName) mobileName.textContent = next.name;
      if (mobileTime) mobileTime.textContent = next.time;
    }

    function renderModal() {
      const body = document.getElementById("prayerModalBody");
      const dateEl = document.getElementById("prayerModalDate");
      const locEl = document.getElementById("prayerModalLocation");
      if (!body) return;

      if (!prayerData) {
        body.innerHTML = '<div class="prayer-modal-loading"><i class="fas fa-spinner"></i><p>Memuat jadwal sholat...</p></div>';
        return;
      }

      const jadwal = prayerData.jadwal;
      const next = getNextPrayer(jadwal);

      if (dateEl) dateEl.textContent = formatDate(new Date());
      if (locEl && prayerData.lokasi) {
        locEl.textContent = "Untuk Wilayah " + prayerData.lokasi + " & Sekitarnya";
      }

      body.innerHTML = PRAYERS.map((p) => {
        const time = jadwal[p.key] || "--:--";
        const isNext = p.key === next.key;
        return `<div class="prayer-item ${isNext ? "next-prayer" : ""}">
                    <div class="prayer-item-dot"></div>
                    <span class="prayer-item-name">${p.name}</span>
                    ${isNext ? '<span class="prayer-next-badge">Berikutnya</span>' : ""}
                    <span class="prayer-item-time">${time}</span>
                </div>`;
      }).join("");
    }

    // Modal jadwal sholat: cuma jalan kalau markup-nya (#prayerModalOverlay)
    // memang ada di halaman. Kalau belum ada, tombol sholat tetap nampilin
    // waktu sholat berikutnya di navbar, cuma nggak buka modal detail.
    window.openPrayerModal = function () {
      const overlay = document.getElementById("prayerModalOverlay");
      if (!overlay) return;
      renderModal();
      overlay.classList.add("active");
      document.body.classList.add("prayer-modal-open");
      document.body.style.overflow = "hidden";

      _prayerWheelLock = function (e) { e.preventDefault(); };
      _prayerKeyLock = function (e) {
        if ([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(e.key)) {
          e.preventDefault();
        }
      };
      window.addEventListener("wheel", _prayerWheelLock, { passive: false });
      window.addEventListener("keydown", _prayerKeyLock);
      _prayerTouchLock = function (e) {
        if (!document.getElementById("prayerModal")?.contains(e.target)) {
          e.preventDefault();
        }
      };
      document.addEventListener("touchmove", _prayerTouchLock, { passive: false });
      tickPrayerClock();
      prayerClockInterval = setInterval(tickPrayerClock, 1000);
    };

    window.closePrayerModal = function () {
      const overlay = document.getElementById("prayerModalOverlay");
      if (!overlay) return;
      overlay.classList.remove("active");
      document.body.classList.remove("prayer-modal-open");
      document.body.style.overflow = "";
      if (_prayerWheelLock) { window.removeEventListener("wheel", _prayerWheelLock); _prayerWheelLock = null; }
      if (_prayerKeyLock) { window.removeEventListener("keydown", _prayerKeyLock); _prayerKeyLock = null; }
      if (_prayerTouchLock) { document.removeEventListener("touchmove", _prayerTouchLock); _prayerTouchLock = null; }
      clearInterval(prayerClockInterval);
      prayerClockInterval = null;
    };

    fetchPrayerTimes();
    setInterval(updatePrayerButton, 60000);

    document.getElementById("prayerNavBtn")?.addEventListener("click", openPrayerModal);
    document.getElementById("prayerMobileBtn")?.addEventListener("click", openPrayerModal);
    document.getElementById("prayerModalClose")?.addEventListener("click", closePrayerModal);
    document.getElementById("prayerModalOverlay")?.addEventListener("click", function (e) {
      if (e.target === this) closePrayerModal();
    });
    document.addEventListener("keydown", (e) => e.key === "Escape" && closePrayerModal());
  })();

  /* ===== NAVBAR SCROLL EFFECT ===== */
  (function () {
    const navbar = document.getElementById("mainNavbar");
    const placeholder = document.getElementById("navbarPlaceholder"); // opsional, boleh nggak ada
    if (!navbar) return;

    const navbarHeight = navbar.offsetHeight || 60;
    const scrollThreshold = navbarHeight + 50;
    let isScrolled = false;

    function handleScroll() {
      const shouldBeScrolled = window.scrollY > scrollThreshold;
      if (shouldBeScrolled === isScrolled) return;
      isScrolled = shouldBeScrolled;

      if (isScrolled) {
        navbar.classList.remove("returning-top");
        navbar.classList.add("scrolled");
        placeholder?.classList.add("active");
      } else {
        navbar.classList.remove("scrolled");
        navbar.classList.add("returning-top");

        navbar.addEventListener("animationend", function onEnd() {
          navbar.removeEventListener("animationend", onEnd);
          navbar.classList.remove("returning-top");
          placeholder?.classList.remove("active");

          navbar.classList.add("appear-top");
          navbar.addEventListener("animationend", function onAppear() {
            navbar.removeEventListener("animationend", onAppear);
            navbar.classList.remove("appear-top");
          }, { once: true });
        }, { once: true });
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
  })();

  /* ===== DARK MODE ===== */
  (function () {
    const toggleD = document.getElementById("darkModeSwitch");
    const toggleM = document.getElementById("darkModeSwitchMobile");
    if (!toggleD && !toggleM) return;

    function applyTheme(dark) {
      if (dark) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("darkMode", "enabled");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("darkMode", "disabled");
      }
      if (toggleD) toggleD.checked = dark;
      if (toggleM) toggleM.checked = dark;
    }

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (toggleD) toggleD.checked = isDark;
    if (toggleM) toggleM.checked = isDark;

    toggleD?.addEventListener("change", function () { applyTheme(this.checked); });
    toggleM?.addEventListener("change", function () { applyTheme(this.checked); });
  })();
}

// include-component.js menembak "components:loaded" setelah navbar (dan
// komponen data-include lain) selesai ditempel ke DOM. Di titik itu semua
// elemen (#darkModeSwitch, #prayerNavBtn, #mainNavbar, dst) sudah pasti ada.
document.addEventListener("components:loaded", initSiteInteractions);

// Anti-flash dark mode: dijalankan lebih dulu supaya kalau localStorage
// bilang dark mode aktif, attribute-nya langsung keset SEBELUM navbar
// sempat kelihatan terang sekilas.
(function () {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();