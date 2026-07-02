"use strict";

// UTILITY
function addToast(msg, type = "info") {
  const wrap = document.getElementById("toastWrap");
  if (!wrap) return;
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => {
    t.style.cssText =
      "opacity:0;transform:translateY(14px);transition:all .4s ease;";
    setTimeout(() => t.remove(), 420);
  }, 3400);
}
window.addToast = addToast;

// NAVBAR
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 60);
  },
  { passive: true },
);

// HAMBURGER
const hbBtn = document.getElementById("hamburger");
const mobMenu = document.getElementById("mobMenu");
const mobOverlay = document.getElementById("mobOverlay");

function openMob() {
  hbBtn.classList.add("open");
  mobMenu.classList.add("open");
  mobOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
  hbBtn.setAttribute("aria-expanded", "true");
}
function closeMob() {
  hbBtn.classList.remove("open");
  mobMenu.classList.remove("open");
  mobOverlay.classList.remove("show");
  document.body.style.overflow = "";
  hbBtn.setAttribute("aria-expanded", "false");
}
hbBtn?.addEventListener("click", () =>
  mobMenu.classList.contains("open") ? closeMob() : openMob(),
);
mobOverlay?.addEventListener("click", closeMob);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMob();
  }
});

// PAGE LOADER
window.addEventListener("load", () => {
  const bar = document.getElementById("loaderBar");
  if (bar) bar.style.width = "100%";
  setTimeout(() => {
    const loader = document.getElementById("pageLoader");
    if (loader) loader.classList.add("done");
  }, 1650);
});

// SCROLL REVEAL
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
);

document
  .querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-s")
  .forEach((el) => revealObs.observe(el));
