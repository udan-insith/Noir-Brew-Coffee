(function NB_Theme() {
  "use strict";

  const STORAGE_KEY = "nbTheme";
  const root = document.documentElement;

  //   STATE
  let isDark = true;

  /* ──────────────────────────────────────────────────────────────
     INIT 
  ────────────────────────────────────────────────────────────── */
  (function applyStoredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      isDark = saved === "dark";
      root.setAttribute("data-theme", saved);
    } else {
      const prefersLight =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;
      isDark = !prefersLight;
      root.setAttribute("data-theme", isDark ? "dark" : "light");
    }
  })();
});

/* ──────────────────────────────────────────────────────────────
     ENSURE CURTAIN ELEMENT EXISTS
  ────────────────────────────────────────────────────────────── */
function ensureCurtain() {
  let curtain = document.getElementById("themeCurtain");
  if (!curtain) {
    curtain = document.createElement("div");
    curtain.id = "themeCurtain";
    document.body.prepend(curtain);
  }
  return curtain;
}
const curtain = ensureCurtain();

// THEME BUTTON ICON SYNC
function syncThemeButtons() {
  document
    .querySelectorAll(".theme-btn, [data-theme-toggle]")
    .forEach((btn) => {
      const iconSpan = btn.querySelector("span") || btn;
      const icon = isDark ? "🌙" : "☀️";
      if (iconSpan.tagName === "SPAN" || iconSpan === btn) {
        iconSpan.textContent = icon;
      }
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
      btn.setAttribute(
        "title",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    });
  document.querySelectorAll(".nb-theme-toggle").forEach((el) => {
    el.setAttribute("data-icon", isDark ? "🌙" : "☀️");
  });
}
syncThemeButtons();

// CORE TOGGLE FUNCTION
let animating = false;

function toggleTheme() {
  if (animating) return;
  animating = true;

  curtain.classList.remove("dropping");
  void curtain.offsetHeight; // force reflow
  curtain.classList.add("dropping");

  setTimeout(() => {
    isDark = !isDark;
    const next = isDark ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    syncThemeButtons();
    window.dispatchEvent(
      new CustomEvent("nb:themechange", { detail: { theme: next } }),
    );
  }, 330);

  setTimeout(() => {
    animating = false;
  }, 800);
}
window.NB_toggleTheme = toggleTheme;

/* ──────────────────────────────────────────────────────────────
     BIND CLICK HANDLERS
  ────────────────────────────────────────────────────────────── */
function bindThemeButtons() {
  document
    .querySelectorAll(".theme-btn, [data-theme-toggle], .nb-theme-toggle")
    .forEach((btn) => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = "true";
      btn.addEventListener("click", toggleTheme);
    });
}
bindThemeButtons();
document.addEventListener("DOMContentLoaded", bindThemeButtons);
window.addEventListener("load", bindThemeButtons);

/* ──────────────────────────────────────────────────────────────
     KEYBOARD SHORTCUT — Shift+D toggles theme
  ────────────────────────────────────────────────────────────── */
document.addEventListener("keydown", (e) => {
  if (
    e.shiftKey &&
    (e.key === "D" || e.key === "d") &&
    !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)
  ) {
    toggleTheme();
  }
});

/* ================================================================
     SCROLL PROGRESS BAR
  ================================================================ */
function ensureScrollProgress() {
  let bar = document.getElementById("scrollProgress");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "scrollProgress";
    document.body.prepend(bar);
  }
  return bar;
}
const progressBar = ensureScrollProgress();

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

/* ================================================================
     PAGE LOADER
  ================================================================ */
function initPageLoader() {
  const loader = document.getElementById("pageLoader");
  const bar = document.getElementById("loaderBar");
  if (!loader) return;

  requestAnimationFrame(() => {
    if (bar) bar.style.width = "78%";
  });

  window.addEventListener("load", () => {
    if (bar) bar.style.width = "100%";
    setTimeout(() => loader.classList.add("done"), 480);
    setTimeout(() => {
      if (loader.parentNode) loader.remove();
    }, 1400);
  });

  setTimeout(() => {
    if (!loader.classList.contains("done")) {
      if (bar) bar.style.width = "100%";
      loader.classList.add("done");
    }
  }, 4000);
}
initPageLoader();

/* ================================================================
     TOAST NOTIFICATION SYSTEM
     Usage: addToast('Message here', 'ok' | 'err' | 'info' | 'warn')
  ================================================================ */
const TOAST_ICONS = { ok: "✅", err: "❌", info: "ℹ️", warn: "⚠️" };
const TOAST_DURATION = 3400;

function ensureToastWrap() {
  let wrap = document.getElementById("toastWrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "toastWrap";
    document.body.appendChild(wrap);
  }
  return wrap;
}
const toastWrap = ensureToastWrap();

function addToast(message, type = "info", duration = TOAST_DURATION) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.style.setProperty("--toast-dur", duration / 1000 + "s");

  const icon = document.createElement("span");
  icon.className = "toast__icon";
  icon.textContent = TOAST_ICONS[type] || TOAST_ICONS.info;

  const text = document.createElement("span");
  text.textContent = message;

  const bar = document.createElement("div");
  bar.className = "toast__bar";

  toast.appendChild(icon);
  toast.appendChild(text);
  toast.appendChild(bar);
  toastWrap.appendChild(toast);

  toast.addEventListener("click", () => dismissToast(toast));

  const timer = setTimeout(() => dismissToast(toast), duration);
  toast._timer = timer;

  const allToasts = toastWrap.querySelectorAll(".toast");
  if (allToasts.length > 4) {
    dismissToast(allToasts[0]);
  }

  return toast;
}

function dismissToast(toast) {
  if (!toast || toast.classList.contains("leaving")) return;
  clearTimeout(toast._timer);
  toast.classList.add("leaving");
  setTimeout(() => toast.remove(), 400);
}

window.addToast = addToast;
window.NB = window.NB || {};
window.NB.toast = addToast;
window.NB.dismissToast = dismissToast;
