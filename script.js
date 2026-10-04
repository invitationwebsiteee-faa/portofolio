// =========================================================
// script.js - interaksi portofolio Silfa
// =========================================================

// 1. Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Navbar: bayangan tipis saat di-scroll
const nav = document.getElementById("nav");
function onScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// 3. Menu hamburger (HP)
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// 4. Animasi muncul saat di-scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// 5. Menu aktif sesuai section yang sedang dilihat
const sections = document.querySelectorAll("main section[id]");
const menuLinks = document.querySelectorAll(".nav__links a");
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          menuLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

// 6. Filter galeri (All, Social Media, dst.)
// Tombol punya data-filter, tiap karya punya data-cat. Kalau cocok -> tampil.
const filterBtns = document.querySelectorAll(".filters button");
const items = document.querySelectorAll("#galleryGrid .item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    items.forEach((item) => {
      const show = f === "all" || item.dataset.cat === f;
      item.classList.toggle("hide", !show);
    });
  });
});

// 7. Latar blur untuk tiap karya (supaya ukuran tile seragam, gambar tidak terpotong)
document.querySelectorAll("#galleryGrid .item img").forEach((img) => {
  img.closest(".item").style.setProperty("--bgimg", 'url("' + img.getAttribute("src") + '")');
});

// 8. Tinggi area bawah hero (tagline + ikon) dipakai untuk menempatkan foto & judul
const heroEl = document.querySelector(".hero");
function setHeroVars() {
  const b = heroEl.querySelector(".hero__bottom");
  heroEl.style.setProperty("--bh", b.offsetHeight + "px");
}
setHeroVars();
window.addEventListener("resize", setHeroVars);
window.addEventListener("load", setHeroVars);
