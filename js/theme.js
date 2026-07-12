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
