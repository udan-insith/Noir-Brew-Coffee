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

  //   SCROLL PROGRESS BAR
  (function ScrollProgress() {
    const bar = document.createElement("div");
    bar.id = "scrollProgress";
    document.body.prepend(bar);

    function update() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? (scrolled / total) * 100 + "%" : "0%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  })();

  //   SCROLL REVEAL - an enhanced version
  (function ScrollReveal() {
    const classes = [".reveal", ".reveal-l", ".reveal-r", ".reveal-s"];
    const els = document.querySelectorAll(classes.join(","));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(() => el.classList.add("in"), +delay);
          obs.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => obs.observe(el));
  })();

  //   TEXT SPLITTER
  (function TextSplitter() {
    document.querySelectorAll("[data-split]").forEach((el) => {
      const mode = el.dataset.split || "words";
      const baseDelay = +(el.dataset.splitDelay || 0);
      const gap = +(el.dataset.splitGap || 55);
      const text = el.textContent;
      const units = mode === "chars" ? text.split("") : text.split(" ");

      el.innerHTML = units
        .map((unit, i) => {
          const sp = mode === "words" ? " " : "";
          const u = unit === " " ? "&nbsp;" : unit;
          return (
            `<span class="split-word" style="animation-delay:${baseDelay + i * gap}ms">` +
            `<span class="split-word__inner">${u}</span></span>${sp}`
          );
        })
        .join("");

      // Trigger when in view
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            el.querySelectorAll(".split-word").forEach((s) =>
              s.classList.add("in"),
            );
            obs.unobserve(el);
          });
        },
        { threshold: 0.2 },
      );
      obs.observe(el);
    });
  })();
})();
