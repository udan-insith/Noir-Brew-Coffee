(function NB_Animations() {
  "use strict";

  /* Shared RAF ticker */
  const tickers = [];
  let rafId = null;
  function tick(ts) {
    tickers.forEach((fn) => fn(ts));
    rafId = requestAnimationFrame(tick);
  }
  requestAnimationFrame((ts) => {
    tick(ts);
  });
  function addTicker(fn) {
    tickers.push(fn);
  }

  //   CUSTOM CURSOR
  (function CustomCursor() {
    // Only desktop — skip on touch devices
    if ("ontouchstart" in window || window.innerWidth < 1024) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.documentElement.classList.add("has-custom-cursor");

    let mx = -100,
      my = -100;
    let rx = -100,
      ry = -100;
    const lag = 0.14; // ring lag factor

    window.addEventListener(
      "mousemove",
      (e) => {
        mx = e.clientX;
        my = e.clientY;
      },
      { passive: true },
    );

    // Interactive targets enlarge the ring
    const hoverTargets =
      'a, button, [role="button"], .m-card, .feature-card, input, select, textarea, label';
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.add("hovered");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.remove("hovered");
    });
    document.addEventListener("mousedown", () =>
      ring.classList.add("clicking"),
    );
    document.addEventListener("mouseup", () =>
      ring.classList.remove("clicking"),
    );

    // Hide when cursor leaves window
    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    });

    addTicker(() => {
      // Dot follows immediately
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      // Ring lags
      rx += (mx - rx) * lag;
      ry += (my - ry) * lag;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
    });
  })();
})();
