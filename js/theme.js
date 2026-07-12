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
