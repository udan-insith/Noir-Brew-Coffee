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
  function closeAllDropdowns() {
    dropdowns.forEach((dd) => {
      dd.classList.remove("open");
      dd.querySelector(".dropdown-toggle")?.setAttribute(
        "aria-expanded",
        "false",
      );
    });
  }

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) closeAllDropdowns();
  });

  // Close on Escape anywhere
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  /* ================================================================
     HAMBURGER + MOBILE MENU
  ================================================================ */
  const hamburger = document.getElementById("hamburger");
  const mobMenu = document.getElementById("mobMenu");
  const mobOverlay = document.getElementById("mobOverlay");

  let mobOpen = false;
  let scrollLockY = 0;

  function openMobileMenu() {
    if (!hamburger || !mobMenu) return;
    mobOpen = true;
    scrollLockY = window.scrollY;

    hamburger.classList.add("open");
    mobMenu.classList.add("open");
    mobOverlay?.classList.add("show");

    // Lock body scroll without jump
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockY}px`;
    document.body.style.width = "100%";

    hamburger.setAttribute("aria-expanded", "true");
    mobMenu.setAttribute("aria-hidden", "false");

    // Focus first link for accessibility
    setTimeout(() => {
      mobMenu.querySelector(".mob-link")?.focus();
    }, 300);
  }

  function closeMobileMenu() {
    if (!hamburger || !mobMenu) return;
    mobOpen = false;

    hamburger.classList.remove("open");
    mobMenu.classList.remove("open");
    mobOverlay?.classList.remove("show");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollLockY);

    hamburger.setAttribute("aria-expanded", "false");
    mobMenu.setAttribute("aria-hidden", "true");
  }

  function toggleMobileMenu() {
    mobOpen ? closeMobileMenu() : openMobileMenu();
  }

  hamburger?.addEventListener("click", toggleMobileMenu);
  mobOverlay?.addEventListener("click", closeMobileMenu);

  // Close mobile menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobOpen) closeMobileMenu();
  });

  // Close mobile menu when a nav link is clicked (but let navigation happen)
  mobMenu?.querySelectorAll("a.mob-link, .mob-link").forEach((link) => {
    link.addEventListener("click", () => {
      // Small delay so page-transition (if any) can start first
      setTimeout(closeMobileMenu, 80);
    });
  });

  // Close mobile menu explicit close button (if present)
  document
    .getElementById("mobMenuClose")
    ?.addEventListener("click", closeMobileMenu);

  // Auto-close if window resized to desktop width
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 1024 && mobOpen) closeMobileMenu();
    }, 150);
  });
})();

/* ================================================================
     ACTIVE LINK DETECTION (auto-highlight current page)
  ================================================================ */
function setActiveLinks() {
  const currentPath = (
    window.location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  document.querySelectorAll(".nav-link, .mob-link").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (!href || href.startsWith("#")) return;
    const hrefFile = href.split("/").pop().split("#")[0];

    if (
      hrefFile === currentPath ||
      (currentPath === "" && hrefFile === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
setActiveLinks();

// SCROLL DETECTION
if (document.body.hasAttribute("data-navbar-autohide")) {
  let lastY = window.scrollY;
  let hideTicking = false;

  function handleAutoHide() {
    const sy = window.scrollY;
    const goingDown = sy > lastY && sy > 200;

    navbar.style.transform = goingDown ? "translateY(-100%)" : "translateY(0)";
    navbar.style.transition =
      "transform .35s cubic-bezier(.16,1,.3,1), " +
      "height .4s cubic-bezier(.16,1,.3,1), background .45s, box-shadow .45s";

    lastY = sy;
    hideTicking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!hideTicking) {
        requestAnimationFrame(handleAutoHide);
        hideTicking = true;
      }
    },
    { passive: true },
  );
}
