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

  //   MAGNETIC BUTTONS
  (function MagneticButtons() {
    if (window.innerWidth < 1024) return;

    document.querySelectorAll(".btn-magnetic, .magnetic").forEach((btn) => {
      const strength = +(btn.dataset.magnetic || 0.35);

      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transition = "transform .5s var(--ease-spring)";
        btn.style.transform = "translate(0,0)";
        setTimeout(() => {
          btn.style.transition = "";
        }, 500);
      });
    });
  })();

  //   TILT CARDS
  (function TiltCards() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll(".tilt-card").forEach((card) => {
      const depth = +(card.dataset.tiltDepth || 12);
      const shine = card.querySelector(".tilt-card__shine");

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (y - 0.5) * -depth;
        const ry = (x - 0.5) * depth;

        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        if (shine) {
          shine.style.setProperty("--mx", x * 100 + "%");
          shine.style.setProperty("--my", y * 100 + "%");
        }
      });

      card.addEventListener("mouseleave", () => {
        card.style.transition = "transform .5s var(--ease-out)";
        card.style.transform =
          "perspective(800px) rotateX(0) rotateY(0) scale(1)";
        setTimeout(() => {
          card.style.transition = "";
        }, 500);
      });
    });
  })();

  //   RIPPLE EFFECT
  (function RippleEffect() {
    function addRipple(e) {
      const host = e.currentTarget;
      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const wave = document.createElement("div");
      wave.className = "ripple-wave";
      wave.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;
      `;
      host.appendChild(wave);
      wave.addEventListener("animationend", () => wave.remove());
    }

    document.querySelectorAll(".ripple-host").forEach((el) => {
      el.addEventListener("pointerdown", addRipple);
    });

    // Auto-add to primary buttons
    document.querySelectorAll(".btn-primary, .btn-outline").forEach((btn) => {
      if (!btn.classList.contains("ripple-host")) {
        btn.classList.add("ripple-host");
        btn.style.position = btn.style.position || "relative";
        btn.style.overflow = "hidden";
        btn.addEventListener("pointerdown", addRipple);
      }
    });
  })();

  //   STEAM PARTICAL CANVAS
  (function SteamCanvas() {
    document.querySelectorAll("[data-particles]").forEach((host) => {
      const canvas = document.createElement("canvas");
      canvas.className = "particle-canvas";
      host.style.position = host.style.position || "relative";
      host.prepend(canvas);
      initParticles(canvas, host.dataset.particles || "gold");
    });

    function initParticles(canvas, theme) {
      const ctx = canvas.getContext("2d");
      const gold = [212, 168, 83];
      const white = [255, 255, 255];
      const color = theme === "white" ? white : gold;

      function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas.parentElement);

      const count = Math.floor(canvas.width / 18);
      const particles = Array.from({ length: count }, () => createP());

      function createP() {
        return {
          x: Math.random() * 2000,
          y: Math.random() * 2000,
          r: Math.random() * 2.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(Math.random() * 0.6 + 0.2),
          a: Math.random() * 0.35 + 0.05,
          life: Math.random(),
          maxLife: Math.random() * 0.6 + 0.4,
        };
      }

      function draw() {
        canvas.width = canvas.offsetWidth; // clear
        canvas.height = canvas.offsetHeight;
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life += 0.004;
          const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * p.a;
          if (alpha <= 0 || p.y < -10) {
            Object.assign(p, createP());
            p.y = canvas.height + 10;
          }
          ctx.beginPath();
          ctx.arc(p.x % canvas.width, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color.join(",")},${alpha.toFixed(2)})`;
          ctx.fill();
        });
      }

      addTicker(draw);
    }
  })();

  //   COUNTER ROLL
  (function CounterRoll() {
    const els = document.querySelectorAll("[data-count]:not(.counted)");
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = +el.dataset.count;
          const suffix = el.dataset.suffix || "";
          const prefix = el.dataset.prefix || "";
          const dur = +(el.dataset.dur || 2200);
          const start = performance.now();

          el.classList.add("counted");
          obs.unobserve(el);

          function update(now) {
            const progress = Math.min((now - start) / dur, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(ease * target);
            el.textContent = prefix + value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = prefix + target.toLocaleString() + suffix;
          }
          requestAnimationFrame(update);
        });
      },
      { threshold: 0.4 },
    );

    els.forEach((el) => obs.observe(el));
  })();
  //   PAGE TRANSITION
  (function PageTransition() {
    const STRIP_COUNT = 5;
    const overlay = document.createElement("div");
    overlay.id = "pageTransition";
    for (let i = 0; i < STRIP_COUNT; i++) {
      const s = document.createElement("div");
      s.className = "pt-strip";
      overlay.appendChild(s);
    }
    document.body.appendChild(overlay);

    // Entering animation on page load
    overlay.classList.add("page-entering");
    setTimeout(() => overlay.classList.remove("page-entering"), 700);

    // Intercept internal links
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank" ||
        link.dataset.noTransition !== undefined
      )
        return;
      // Only same-origin
      if (link.hostname && link.hostname !== location.hostname) return;

      e.preventDefault();
      overlay.classList.add("page-leaving");
      setTimeout(() => {
        window.location.href = href;
      }, 650);
    });
  })();
})();
