(function NB_Navbar() {
  "use strict";

  const navbar = document.getElementById("navbar");
  if (!navbar) return; // Page has no navbar — skip silently

  /* ================================================================
     SCROLL SHRINK + SCROLL-LINE INDICATOR
  ================================================================ */
  const SCROLL_THRESHOLD = 60;
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbarOnScroll() {
    const sy = window.scrollY;
    navbar.classList.toggle("scrolled", sy > SCROLL_THRESHOLD);

    // Optional scroll-progress line inside navbar (if element exists)
    const scrollLine = navbar.querySelector(".nav-scroll-line");
    if (scrollLine) {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (sy / docHeight) * 100 : 0;
      scrollLine.style.width = pct + "%";
    }

    lastScrollY = sy;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbarOnScroll);
        ticking = true;
      }
    },
    { passive: true },
  );

  updateNavbarOnScroll(); // run once on load

  /* ================================================================
     DROPDOWN MENUS (desktop hover + keyboard)
  ================================================================ */
  const dropdowns = document.querySelectorAll(".has-dropdown");

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector(".dropdown-toggle");

    // Click toggles (works for touch devices too)
    dd.addEventListener("click", (e) => {
      // Don't toggle if clicking an actual dropdown-item link
      if (e.target.closest(".dropdown-item")) return;
      const wasOpen = dd.classList.contains("open");
      closeAllDropdowns();
      if (!wasOpen) {
        dd.classList.add("open");
        toggle?.setAttribute("aria-expanded", "true");
      }
    });

    // Keyboard support
    toggle?.setAttribute("tabindex", "0");
    toggle?.setAttribute("role", "button");
    toggle?.setAttribute("aria-haspopup", "true");
    toggle?.setAttribute("aria-expanded", "false");

    toggle?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dd.click();
      }
      if (e.key === "Escape") {
        dd.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.blur();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        dd.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        dd.querySelector(".dropdown-item")?.focus();
      }
    });

    // Arrow-key navigation within open dropdown
    const items = dd.querySelectorAll(".dropdown-item");
    items.forEach((item, idx) => {
      item.setAttribute("tabindex", "-1");
      item.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          items[idx + 1]?.focus();
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          idx === 0 ? toggle?.focus() : items[idx - 1]?.focus();
        }
        if (e.key === "Escape") {
          dd.classList.remove("open");
          toggle?.focus();
        }
      });
    });
  });
})();
