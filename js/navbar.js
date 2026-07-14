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
})();
