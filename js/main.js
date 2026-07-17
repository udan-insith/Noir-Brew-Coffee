// MAIN js - This is some extra features
(function NB_Main() {
  "use strict";

  window.NB = window.NB || {};
  const toast = (...args) =>
    window.addToast ? window.addToast(...args) : console.log(...args);

  //   ADDING STYLES MANUALLY
  (function InjectStyles() {
    if (document.getElementById("nbMainStyles")) return;

    const css = `
    /* ---- Back to top ---- */
      .nb-fab-stack{position:fixed;left:22px;bottom:22px;display:flex;flex-direction:column-reverse;gap:12px;z-index:890;}
      .nb-back-top{
        width:46px;height:46px;border-radius:50%;background:var(--c-bg-card,#1a1511);
        border:1.5px solid var(--c-border-strong,rgba(212,168,83,.22));cursor:pointer;
        display:flex;align-items:center;justify-content:center;position:relative;
        opacity:0;visibility:hidden;transform:translateY(14px) scale(.85);
        transition:opacity .35s,visibility .35s,transform .35s cubic-bezier(.34,1.56,.64,1),border-color .25s;
        box-shadow:0 8px 26px rgba(0,0,0,.3);
      }
      .nb-back-top.show{opacity:1;visibility:visible;transform:translateY(0) scale(1);}
      .nb-back-top:hover{border-color:var(--c-gold,#d4a853);}
      .nb-back-top svg{position:absolute;inset:0;transform:rotate(-90deg);}
      .nb-back-top svg circle{fill:none;stroke:var(--c-border,rgba(212,168,83,.1));stroke-width:2;}
      .nb-back-top svg circle.nb-ring-fill{stroke:var(--c-gold,#d4a853);stroke-linecap:round;
        stroke-dasharray:126;stroke-dashoffset:126;transition:stroke-dashoffset .1s linear;}
      .nb-back-top span{position:relative;z-index:1;font-size:16px;color:var(--c-gold,#d4a853);
        transition:transform .3s;}
      .nb-back-top:hover span{transform:translateY(-2px);}

      /* ---- Cookie banner ---- */
      .nb-cookie{
        position:fixed;left:20px;right:20px;bottom:20px;max-width:480px;
        background:var(--c-bg-card,#1a1511);border:1px solid var(--c-border-strong,rgba(212,168,83,.22));
        border-radius:18px;padding:20px 22px;z-index:9500;box-shadow:0 24px 70px rgba(0,0,0,.5);
        transform:translateY(140%);transition:transform .5s cubic-bezier(.16,1,.3,1);
      }
      .nb-cookie.show{transform:translateY(0);}
      .nb-cookie__icon{font-size:22px;margin-bottom:8px;display:block;}
      .nb-cookie__text{font-size:.83rem;color:var(--c-muted,#8a7560);line-height:1.6;margin-bottom:14px;}
      .nb-cookie__text a{color:var(--c-gold,#d4a853);}
      .nb-cookie__actions{display:flex;gap:10px;}
      .nb-cookie__btn{flex:1;padding:9px 14px;border-radius:999px;font-size:.8rem;font-weight:700;
        cursor:pointer;border:1.5px solid var(--c-border-strong,rgba(212,168,83,.22));
        background:transparent;color:var(--c-cream,#f6f0e4);transition:all .25s;font-family:inherit;}
      .nb-cookie__btn.primary{background:var(--c-gold,#d4a853);color:#0a0806;border-color:var(--c-gold,#d4a853);}
      .nb-cookie__btn:hover{transform:translateY(-1px);filter:brightness(1.08);}

      /* ---- Cart drawer ---- */
      .nb-cart-fab{
        width:46px;height:46px;border-radius:50%;background:var(--c-bg-card,#1a1511);
        border:1.5px solid var(--c-border-strong,rgba(212,168,83,.22));cursor:pointer;
        display:flex;align-items:center;justify-content:center;position:relative;
        transition:transform .3s cubic-bezier(.34,1.56,.64,1),border-color .25s;
        box-shadow:0 8px 26px rgba(0,0,0,.3);font-size:18px;
      }
      .nb-cart-fab:hover{transform:scale(1.08);border-color:var(--c-gold,#d4a853);}
      .nb-cart-fab__badge{
        position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;padding:0 4px;
        background:#e05252;border-radius:999px;border:2px solid var(--c-bg,#0a0806);
        font-size:.62rem;font-weight:800;color:#fff;display:flex;align-items:center;justify-content:center;
        animation:nbBadgePop .4s cubic-bezier(.34,1.56,.64,1);
      }
      @keyframes nbBadgePop{0%{transform:scale(0);}100%{transform:scale(1);}}
      .nb-cart-fab__badge.hidden{display:none;}

      .nb-overlay{position:fixed;inset:0;background:rgba(10,8,6,.7);backdrop-filter:blur(6px);
        z-index:9600;opacity:0;visibility:hidden;transition:all .35s;}
      .nb-overlay.show{opacity:1;visibility:visible;}

      .nb-drawer{
        position:fixed;top:0;right:0;height:100dvh;width:min(400px,92vw);
        background:var(--c-bg-card,#1a1511);border-left:1px solid var(--c-border-strong,rgba(212,168,83,.22));
        z-index:9601;display:flex;flex-direction:column;transform:translateX(105%);
        transition:transform .42s cubic-bezier(.16,1,.3,1);box-shadow:-16px 0 60px rgba(0,0,0,.5);
      }
      .nb-drawer.open{transform:translateX(0);}
      .nb-drawer__head{display:flex;align-items:center;justify-content:space-between;
        padding:20px 22px;border-bottom:1px solid var(--c-border,rgba(212,168,83,.1));flex-shrink:0;}
      .nb-drawer__title{font-family:var(--font-display,serif);font-size:1.2rem;font-weight:600;
        color:var(--c-cream,#f6f0e4);}
      .nb-drawer__close{width:32px;height:32px;border-radius:50%;border:1px solid var(--c-border,rgba(212,168,83,.1));
        background:var(--c-bg-raised,#231a10);color:var(--c-muted,#8a7560);cursor:pointer;
        display:flex;align-items:center;justify-content:center;font-size:15px;transition:all .22s;}
      .nb-drawer__close:hover{background:#e05252;color:#fff;border-color:#e05252;transform:rotate(90deg);}

      .nb-drawer__body{flex:1;overflow-y:auto;padding:16px 18px;}
      .nb-cart-empty{text-align:center;padding:60px 20px;color:var(--c-muted,#8a7560);}
      .nb-cart-empty__icon{font-size:2.8rem;margin-bottom:14px;display:block;opacity:.6;}

      .nb-cart-item{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--c-border,rgba(212,168,83,.1));
        animation:nbItemIn .3s ease both;}
      @keyframes nbItemIn{from{opacity:0;transform:translateX(10px);}to{opacity:1;transform:translateX(0);}}
      .nb-cart-item__icon{width:48px;height:48px;border-radius:10px;background:var(--c-gold-glow,rgba(212,168,83,.15));
        display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
      .nb-cart-item__body{flex:1;min-width:0;}
      .nb-cart-item__name{font-size:.87rem;font-weight:600;color:var(--c-cream,#f6f0e4);margin-bottom:2px;}
      .nb-cart-item__price{font-size:.78rem;color:var(--c-gold,#d4a853);font-weight:600;}
      .nb-cart-item__ctrls{display:flex;align-items:center;gap:8px;margin-top:8px;}
      .nb-qty-btn{width:22px;height:22px;border-radius:50%;border:1px solid var(--c-border-strong,rgba(212,168,83,.22));
        background:transparent;color:var(--c-gold,#d4a853);cursor:pointer;font-size:13px;
        display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:inherit;}
      .nb-qty-btn:hover{background:var(--c-gold,#d4a853);color:#0a0806;}
      .nb-qty-val{font-size:.82rem;font-weight:700;color:var(--c-cream,#f6f0e4);min-width:16px;text-align:center;}
      .nb-cart-remove{margin-left:auto;font-size:.72rem;color:var(--c-muted,#8a7560);cursor:pointer;
        text-decoration:underline;text-underline-offset:2px;transition:color .2s;background:none;border:none;font-family:inherit;}
      .nb-cart-remove:hover{color:#e05252;}

      .nb-drawer__foot{padding:18px 22px;border-top:1px solid var(--c-border,rgba(212,168,83,.1));flex-shrink:0;}
      .nb-cart-subtotal{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
      .nb-cart-subtotal__label{font-size:.85rem;color:var(--c-muted,#8a7560);}
      .nb-cart-subtotal__value{font-family:var(--font-display,serif);font-size:1.4rem;font-weight:700;
        color:var(--c-gold,#d4a853);}
      .nb-checkout-btn{width:100%;padding:13px;background:var(--c-gold,#d4a853);color:#0a0806;
        border:none;border-radius:999px;font-weight:700;font-size:.9rem;cursor:pointer;
        transition:all .3s;font-family:inherit;}
      .nb-checkout-btn:hover{filter:brightness(1.08);transform:translateY(-1px);
        box-shadow:0 10px 28px rgba(212,168,83,.35);}

        /* ---- Store status badge ---- */
      .nb-store-status{display:inline-flex;align-items:center;gap:7px;padding:5px 13px;
        border-radius:999px;font-size:.72rem;font-weight:700;letter-spacing:.04em;
        border:1px solid rgba(82,183,122,.3);background:rgba(82,183,122,.1);color:#52b77a;}
      .nb-store-status.closed{border-color:rgba(224,82,82,.3);background:rgba(224,82,82,.1);color:#e05252;}
      .nb-store-status__dot{width:7px;height:7px;border-radius:50%;background:currentColor;
        animation:nbDotPulse 2s ease-in-out infinite;}
      @keyframes nbDotPulse{0%,100%{opacity:1;}50%{opacity:.4;}}

      /* ---- Find Your Brew quiz ---- */
      .nb-quiz-fab{
        display:flex;align-items:center;gap:8px;padding:10px 16px 10px 12px;border-radius:999px;
        background:var(--c-bg-card,#1a1511);border:1.5px solid var(--c-border-strong,rgba(212,168,83,.22));
        cursor:pointer;box-shadow:0 8px 26px rgba(0,0,0,.3);transition:transform .3s cubic-bezier(.34,1.56,.64,1),border-color .25s;
        font-size:.8rem;font-weight:700;color:var(--c-gold,#d4a853);font-family:inherit;
      }
      .nb-quiz-fab:hover{transform:scale(1.05);border-color:var(--c-gold,#d4a853);}
      .nb-quiz-fab__icon{font-size:18px;}

      .nb-quiz-modal{background:var(--c-bg-card,#1a1511);border:1px solid var(--c-border-strong,rgba(212,168,83,.22));
        border-radius:26px;width:100%;max-width:480px;max-height:88vh;overflow-y:auto;
        padding:36px 32px;transform:scale(.9) translateY(20px);transition:transform .4s cubic-bezier(.16,1,.3,1);
        position:relative;}
      .nb-overlay.show .nb-quiz-modal{transform:scale(1) translateY(0);}
      .nb-quiz-close{position:absolute;top:16px;right:16px;width:30px;height:30px;border-radius:50%;
        border:1px solid var(--c-border,rgba(212,168,83,.1));background:var(--c-bg-raised,#231a10);
        color:var(--c-muted,#8a7560);cursor:pointer;display:flex;align-items:center;justify-content:center;
        font-size:14px;transition:all .22s;}
      .nb-quiz-close:hover{background:#e05252;color:#fff;border-color:#e05252;}

      .nb-quiz-progress{display:flex;gap:5px;margin-bottom:26px;}
      .nb-quiz-progress__seg{flex:1;height:3px;border-radius:999px;background:var(--c-border,rgba(212,168,83,.1));
        overflow:hidden;}
      .nb-quiz-progress__seg-fill{height:100%;width:0%;background:var(--c-gold,#d4a853);
        transition:width .4s cubic-bezier(.16,1,.3,1);}

        .nb-quiz-q{font-family:var(--font-display,serif);font-size:1.35rem;font-weight:600;
        color:var(--c-cream,#f6f0e4);margin-bottom:22px;line-height:1.3;}
      .nb-quiz-opts{display:flex;flex-direction:column;gap:10px;}
      .nb-quiz-opt{display:flex;align-items:center;gap:13px;padding:14px 16px;border-radius:14px;
        border:1.5px solid var(--c-border,rgba(212,168,83,.1));background:var(--c-bg-raised,#231a10);
        cursor:pointer;transition:all .25s;text-align:left;font-family:inherit;color:var(--c-cream,#f6f0e4);
        font-size:.88rem;font-weight:500;}
      .nb-quiz-opt:hover{border-color:var(--c-gold,#d4a853);background:var(--c-gold-glow,rgba(212,168,83,.15));
        transform:translateX(4px);}
      .nb-quiz-opt__emoji{font-size:19px;flex-shrink:0;}

      .nb-quiz-result{text-align:center;}
      .nb-quiz-result__icon{font-size:3.4rem;display:block;margin-bottom:16px;animation:nbResultPop .6s cubic-bezier(.34,1.56,.64,1);}
      @keyframes nbResultPop{0%{transform:scale(0);}60%{transform:scale(1.15);}100%{transform:scale(1);}}
      .nb-quiz-result__label{font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
        color:var(--c-gold,#d4a853);margin-bottom:8px;}
      .nb-quiz-result__title{font-family:var(--font-display,serif);font-size:1.6rem;font-weight:600;
        color:var(--c-cream,#f6f0e4);margin-bottom:12px;}
      .nb-quiz-result__desc{font-size:.87rem;color:var(--c-muted,#8a7560);line-height:1.7;margin-bottom:26px;}
      .nb-quiz-actions{display:flex;gap:10px;}
      .nb-quiz-actions a,.nb-quiz-actions button{flex:1;padding:12px;border-radius:999px;font-size:.85rem;
        font-weight:700;cursor:pointer;text-align:center;text-decoration:none;transition:all .25s;font-family:inherit;}
      .nb-quiz-actions .nb-btn-primary{background:var(--c-gold,#d4a853);color:#0a0806;border:none;}
      .nb-quiz-actions .nb-btn-ghost{background:transparent;color:var(--c-muted,#8a7560);
        border:1.5px solid var(--c-border,rgba(212,168,83,.1));}
      .nb-quiz-actions a:hover,.nb-quiz-actions button:hover{transform:translateY(-2px);}

      /* ---- Command palette ---- */
      .nb-cmdk{background:var(--c-bg-card,#1a1511);border:1px solid var(--c-border-strong,rgba(212,168,83,.22));
        border-radius:18px;width:100%;max-width:560px;overflow:hidden;
        transform:scale(.94) translateY(-14px);transition:transform .3s cubic-bezier(.16,1,.3,1);
        box-shadow:0 40px 100px rgba(0,0,0,.6);}
      .nb-overlay.show .nb-cmdk{transform:scale(1) translateY(0);}
      .nb-cmdk__input-row{display:flex;align-items:center;gap:12px;padding:16px 20px;
        border-bottom:1px solid var(--c-border,rgba(212,168,83,.1));}
      .nb-cmdk__icon{font-size:16px;color:var(--c-muted,#8a7560);flex-shrink:0;}
      .nb-cmdk__input{flex:1;background:none;border:none;outline:none;color:var(--c-cream,#f6f0e4);
        font-size:.95rem;font-family:inherit;}
      .nb-cmdk__input::placeholder{color:var(--c-muted,#8a7560);}
      .nb-cmdk__esc{font-size:.68rem;color:var(--c-muted,#8a7560);border:1px solid var(--c-border,rgba(212,168,83,.1));
        border-radius:5px;padding:2px 7px;flex-shrink:0;}
      .nb-cmdk__list{max-height:340px;overflow-y:auto;padding:8px;}
      .nb-cmdk__group{font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
        color:var(--c-muted,#8a7560);padding:10px 12px 4px;}
      .nb-cmdk__item{display:flex;align-items:center;gap:12px;padding:11px 12px;border-radius:10px;
        cursor:pointer;transition:background .18s;}
      .nb-cmdk__item:hover,.nb-cmdk__item.active{background:var(--c-gold-glow,rgba(212,168,83,.15));}
      .nb-cmdk__item-icon{width:30px;height:30px;border-radius:8px;background:var(--c-bg-raised,#231a10);
        display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
      .nb-cmdk__item-text{flex:1;min-width:0;}
      .nb-cmdk__item-title{font-size:.85rem;font-weight:600;color:var(--c-cream,#f6f0e4);}
      .nb-cmdk__item-sub{font-size:.72rem;color:var(--c-muted,#8a7560);}
      .nb-cmdk__empty{text-align:center;padding:30px;color:var(--c-muted,#8a7560);font-size:.85rem;}

      /* ---- Gallery lightbox ---- */
      .nb-lightbox{position:fixed;inset:0;background:rgba(10,8,6,.94);z-index:9700;
        display:flex;align-items:center;justify-content:center;padding:40px;
        opacity:0;visibility:hidden;transition:all .35s;}
      .nb-lightbox.show{opacity:1;visibility:visible;}
      .nb-lightbox img{max-width:90vw;max-height:85vh;border-radius:12px;
        transform:scale(.92);transition:transform .35s cubic-bezier(.16,1,.3,1);
        box-shadow:0 40px 100px rgba(0,0,0,.6);}
      .nb-lightbox.show img{transform:scale(1);}
      .nb-lightbox__close{position:fixed;top:26px;right:26px;width:44px;height:44px;border-radius:50%;
        background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;
        display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;
        transition:all .25s;}
      .nb-lightbox__close:hover{background:#e05252;transform:rotate(90deg);}

      /* ---- Testimonial carousel dots ---- */
      .nb-carousel-dots{display:flex;justify-content:center;gap:8px;margin-top:24px;}
      .nb-carousel-dot{width:8px;height:8px;border-radius:50%;background:var(--c-border-strong,rgba(212,168,83,.22));
        cursor:pointer;transition:all .3s;border:none;padding:0;}
      .nb-carousel-dot.active{background:var(--c-gold,#d4a853);width:24px;border-radius:999px;}

      @media(max-width:640px){
        .nb-fab-stack{left:14px;bottom:14px;}
        .nb-quiz-fab span:not(.nb-quiz-fab__icon){display:none;}
        .nb-drawer{width:100vw;}
      }
      @media(prefers-reduced-motion:reduce){
        .nb-back-top,.nb-cookie,.nb-drawer,.nb-quiz-modal,.nb-cmdk,.nb-lightbox img{transition:none!important;}
      }
    `;
    const style = document.createElement("style");
    style.id = "nbMainStyles";
    style.textContent = css;
    document.head.appendChild(style);
  })();

  //   floating stack container
  function ensureFabStack() {
    let stack = document.querySelector(".nb-fab-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "nb-fab-stack";
      document.body.appendChild(stack);
    }
    return stack;
  }
  const fabStack = ensureFabStack();

  /* ================================================================
     02. BACK TO TOP
  ================================================================ */
  (function BackToTop() {
    const btn = document.createElement("button");
    btn.className = "nb-back-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = `
      <svg viewBox="0 0 46 46" width="46" height="46">
        <circle cx="23" cy="23" r="20"></circle>
        <circle class="nb-ring-fill" cx="23" cy="23" r="20"></circle>
      </svg>
      <span>↑</span>`;
    fabStack.appendChild(btn);

    const ring = btn.querySelector(".nb-ring-fill");
    const CIRC = 2 * Math.PI * 20;

    function update() {
      const sy = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? sy / max : 0;
      ring.style.strokeDashoffset = CIRC - pct * CIRC;
      btn.classList.toggle("show", sy > 420);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();

    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  })();

  /* ================================================================
     03. COOKIE CONSENT — honest, no dark patterns
  ================================================================ */
  (function CookieConsent() {
    const KEY = "nbCookieConsent";
    if (localStorage.getItem(KEY)) return; // already decided

    const banner = document.createElement("div");
    banner.className = "nb-cookie";
    banner.innerHTML = `
      <span class="nb-cookie__icon">🍪</span>
      <p class="nb-cookie__text">
        We use cookies to remember your cart, theme preference, and login session.
        No third-party tracking. <a href="#">Learn more</a>
      </p>
      <div class="nb-cookie__actions">
        <button class="nb-cookie__btn" data-choice="decline">Decline</button>
        <button class="nb-cookie__btn primary" data-choice="accept">Accept</button>
      </div>`;
    document.body.appendChild(banner);

    setTimeout(() => banner.classList.add("show"), 1200);

    banner.querySelectorAll("[data-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localStorage.setItem(KEY, btn.dataset.choice);
        banner.classList.remove("show");
        setTimeout(() => banner.remove(), 500);
        toast(
          btn.dataset.choice === "accept"
            ? "🍪 Preferences saved — thank you!"
            : "Got it — only essential cookies will be used.",
          "info",
        );
      });
    });
  })();

  /* ================================================================
     04. CART SYSTEM — global drawer synced to localStorage
  ================================================================ */
  const CartSystem = (function CartSystem() {
    const CART_KEY = "nbCart";
    function getCart() {
      try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
      } catch {
        return [];
      }
    }
    function setCart(cart) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      renderBadge();
      renderDrawer();
      window.dispatchEvent(
        new CustomEvent("nb:cartchange", { detail: { cart } }),
      );
    }

    function addItem(item) {
      const cart = getCart();
      const existing = cart.find((c) => c.id === item.id);
      if (existing) existing.qty++;
      else cart.push({ ...item, qty: 1 });
      setCart(cart);
      toast(`🛒 ${item.name} added to your order!`, "ok");
      pulseBadge();
    }
    function updateQty(id, delta) {
      const cart = getCart();
      const it = cart.find((c) => c.id === id);
      if (!it) return;
      it.qty += delta;
      const filtered = it.qty <= 0 ? cart.filter((c) => c.id !== id) : cart;
      setCart(filtered);
    }
    function removeItem(id) {
      setCart(getCart().filter((c) => c.id !== id));
    }
    function clearCart() {
      setCart([]);
    }

    /* — FAB: reuse existing #cartFloat if page already has one (menu.html), else inject — */
    let fab = document.getElementById("cartFloat");
    let badgeEl = document.getElementById("cartCount");
    let usingExisting = !!fab;

    if (!fab) {
      fab = document.createElement("button");
      fab.className = "nb-cart-fab";
      fab.setAttribute("aria-label", "View cart");
      fab.innerHTML = `🛒<span class="nb-cart-fab__badge hidden" id="nbCartBadge">0</span>`;
      fabStack.appendChild(fab);
      badgeEl = fab.querySelector("#nbCartBadge");
    } else {
      // Prevent the existing <a href="#"> from navigating
      fab.addEventListener("click", (e) => e.preventDefault());
    }

    function pulseBadge() {
      if (!badgeEl) return;
      badgeEl.style.animation = "none";
      void badgeEl.offsetHeight;
      badgeEl.style.animation = "nbBadgePop .4s cubic-bezier(.34,1.56,.64,1)";
    }

    function renderBadge() {
      const count = getCart().reduce((s, i) => s + i.qty, 0);
      if (badgeEl) {
        badgeEl.textContent = count;
        badgeEl.classList.toggle("hidden", count === 0 && !usingExisting);
      }
      if (usingExisting) {
        fab.classList.toggle("visible", count > 0); // matches menu.css .cart-float.visible pattern
      }
    }

    /* — Overlay + Drawer — */
    const overlay = document.createElement("div");
    overlay.className = "nb-overlay";
    document.body.appendChild(overlay);

    const drawer = document.createElement("div");
    drawer.className = "nb-drawer";
    drawer.innerHTML = `
      <div class="nb-drawer__head">
        <div class="nb-drawer__title">Your Order</div>
        <button class="nb-drawer__close" aria-label="Close cart">✕</button>
      </div>
      <div class="nb-drawer__body" id="nbCartBody"></div>
      <div class="nb-drawer__foot" id="nbCartFoot"></div>`;
    document.body.appendChild(drawer);

    function renderDrawer() {
      const cart = getCart();
      const body = drawer.querySelector("#nbCartBody");
      const foot = drawer.querySelector("#nbCartFoot");

      if (cart.length === 0) {
        body.innerHTML = `
          <div class="nb-cart-empty">
            <span class="nb-cart-empty__icon">☕</span>
            <div>Your cart is empty.<br>Add something delicious!</div>
          </div>`;
        foot.innerHTML = "";
        return;
      }

      body.innerHTML = cart
        .map(
          (item) => `
        <div class="nb-cart-item" data-id="${item.id}">
          <div class="nb-cart-item__icon">☕</div>
          <div class="nb-cart-item__body">
            <div class="nb-cart-item__name">${escapeHtml(item.name)}</div>
            <div class="nb-cart-item__price">$${item.price.toFixed(2)}</div>
            <div class="nb-cart-item__ctrls">
              <button class="nb-qty-btn" data-action="dec">−</button>
              <span class="nb-qty-val">${item.qty}</span>
              <button class="nb-qty-btn" data-action="inc">+</button>
              <button class="nb-cart-remove" data-action="remove">Remove</button>
            </div>
          </div>
        </div>
      `,
        )
        .join("");

      const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
      foot.innerHTML = `
        <div class="nb-cart-subtotal">
          <span class="nb-cart-subtotal__label">Subtotal</span>
          <span class="nb-cart-subtotal__value">$${subtotal.toFixed(2)}</span>
        </div>
        <button class="nb-checkout-btn" id="nbCheckoutBtn">Proceed to Checkout →</button>`;

      body.querySelectorAll("[data-action]").forEach((btn) => {
        const id = btn.closest(".nb-cart-item").dataset.id;
        btn.addEventListener("click", () => {
          const action = btn.dataset.action;
          if (action === "inc") updateQty(id, 1);
          if (action === "dec") updateQty(id, -1);
          if (action === "remove") removeItem(id);
        });
      });

      foot.querySelector("#nbCheckoutBtn")?.addEventListener("click", () => {
        toast(
          "✨ Checkout is a demo in this build — no real payment is processed.",
          "info",
        );
      });
    }

    function escapeHtml(str) {
      const d = document.createElement("div");
      d.textContent = str;
      return d.innerHTML;
    }

    function openDrawer() {
      overlay.classList.add("show");
      drawer.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeDrawer() {
      overlay.classList.remove("show");
      drawer.classList.remove("open");
      document.body.style.overflow = "";
    }

    fab.addEventListener("click", openDrawer);
    drawer
      .querySelector(".nb-drawer__close")
      .addEventListener("click", closeDrawer);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeDrawer();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
    // Cross-tab sync
    window.addEventListener("storage", (e) => {
      if (e.key === CART_KEY) {
        renderBadge();
        renderDrawer();
      }
    });

    renderBadge();
    renderDrawer();

    return {
      addItem,
      updateQty,
      removeItem,
      clearCart,
      getCart,
      open: openDrawer,
      close: closeDrawer,
    };
  })();
  window.NB.cart = CartSystem;

  // Auto-wire any element with data-add-to-cart="id|name|price"
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-add-to-cart]");
    if (!el) return;
    const [id, name, price] = el.dataset.addToCart.split("|");
    CartSystem.addItem({ id, name, price: parseFloat(price) });
  });

  /* ================================================================
     05. STORE STATUS BADGE — computed live from real hours
  ================================================================ */
  (function StoreStatusBadge() {
    // Hours: Mon–Fri 7–20, Sat–Sun 8–21 (matches footer copy site-wide)
    function isOpenNow() {
      const now = new Date();
      const day = now.getDay(); // 0=Sun..6=Sat
      const hour = now.getHours() + now.getMinutes() / 60;
      const isWeekend = day === 0 || day === 6;
      const open = isWeekend ? 8 : 7;
      const close = isWeekend ? 21 : 20;
      return hour >= open && hour < close;
    }

    function nextOpenLabel() {
      const now = new Date();
      const day = now.getDay();
      const isWeekend = day === 0 || day === 6;
      const openHour = isWeekend ? 8 : 7;
      return `opens ${openHour}:00`;
    }

    const open = isOpenNow();
    const badge = document.createElement("span");
    badge.className = `nb-store-status${open ? "" : " closed"}`;
    badge.innerHTML = `<span class="nb-store-status__dot"></span> ${open ? "Open now" : `Closed — ${nextOpenLabel()}`}`;

    // Try to slot into footer bottom row if present
    const footerBottom = document.querySelector(".footer__bottom");
    if (footerBottom) {
      const wrap = document.createElement("span");
      wrap.appendChild(badge);
      footerBottom.insertBefore(wrap, footerBottom.firstChild.nextSibling);
    }
    // Also expose for any element with [data-store-status]
    document.querySelectorAll("[data-store-status]").forEach((slot) => {
      slot.appendChild(badge.cloneNode(true));
    });

    window.NB.isStoreOpen = isOpenNow;
  })();

  /* ================================================================
     06. FIND YOUR BREW QUIZ
  ================================================================ */
  const BrewQuiz = (function FindYourBrewQuiz() {
    const questions = [
      {
        q: "What time do you usually reach for coffee?",
        opts: [
          {
            label: "Early morning, before anyone else is up",
            emoji: "🌅",
            tag: "bold",
          },
          { label: "Mid-morning, with breakfast", emoji: "🥐", tag: "classic" },
          { label: "Afternoon slump rescue", emoji: "☀️", tag: "sweet" },
          {
            label: "Evening — I love coffee any time",
            emoji: "🌙",
            tag: "cold",
          },
        ],
      },
      {
        q: "Pick a flavour word that speaks to you:",
        opts: [
          { label: "Bold & intense", emoji: "🔥", tag: "bold" },
          { label: "Smooth & balanced", emoji: "🎯", tag: "classic" },
          { label: "Sweet & indulgent", emoji: "🍯", tag: "sweet" },
          { label: "Bright & refreshing", emoji: "✨", tag: "cold" },
        ],
      },
      {
        q: "Milk or no milk?",
        opts: [
          { label: "Black, always black", emoji: "⚫", tag: "bold" },
          {
            label: "A little milk, well balanced",
            emoji: "🥛",
            tag: "classic",
          },
          { label: "Lots of creamy milk please", emoji: "🍦", tag: "sweet" },
          { label: "Depends on the weather", emoji: "🌤️", tag: "cold" },
        ],
      },
      {
        q: "Your ideal coffee moment looks like:",
        opts: [
          {
            label: "Quick shot before a big meeting",
            emoji: "⚡",
            tag: "bold",
          },
          {
            label: "Slow morning ritual, no rush",
            emoji: "📖",
            tag: "classic",
          },
          { label: "Treating myself, no guilt", emoji: "🎉", tag: "sweet" },
          { label: "Something to sip while working", emoji: "💻", tag: "cold" },
        ],
      },
      {
        q: "Last one — hot or iced?",
        opts: [
          { label: "Hot, no question", emoji: "☕", tag: "bold" },
          {
            label: "Hot, but I'll take iced sometimes",
            emoji: "🌡️",
            tag: "classic",
          },
          { label: "Iced, always iced", emoji: "🧊", tag: "cold" },
          { label: "Surprise me either way", emoji: "🎲", tag: "sweet" },
        ],
      },
    ];

    const results = {
      bold: {
        icon: "⚫",
        label: "Your Match",
        title: "Noir Espresso",
        desc: "You don't mess around. Double ristretto, thick crema, notes of dark chocolate and cedar — this is coffee stripped to its essence, exactly how you like it.",
        price: "$5.50",
      },
      classic: {
        icon: "🎯",
        label: "Your Match",
        title: "Signature Flat White",
        desc: "Balanced, disciplined, dependable — like you. Colombian espresso and perfectly steamed milk in a precise 1:3 ratio. A daily ritual done right.",
        price: "$6.00",
      },
      sweet: {
        icon: "🍯",
        label: "Your Match",
        title: "Honey Oat Latte",
        desc: "Life's too short for boring coffee. Ethiopian espresso, silky oat milk, house honey syrup — warm, golden, and exactly the treat you deserve.",
        price: "$7.80",
      },
      cold: {
        icon: "🧊",
        label: "Your Match",
        title: "Nitro Cold Brew",
        desc: "Smooth, cool, and always ready to go. 18-hour cold brew on nitrogen tap — cascades like velvet, no milk required. Built for your pace.",
        price: "$8.50",
      },
    };

    let currentQ = 0;
    let answers = [];

    // FAB trigger
    const fab = document.createElement("button");
    fab.className = "nb-quiz-fab";
    fab.innerHTML = `<span class="nb-quiz-fab__icon">🎯</span><span>Find Your Brew</span>`;
    fabStack.appendChild(fab);

    // Overlay + modal
    const overlay = document.createElement("div");
    overlay.className = "nb-overlay";
    const modal = document.createElement("div");
    modal.className = "nb-quiz-modal";
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    function renderQuestion() {
      const item = questions[currentQ];
      modal.innerHTML = `
        <button class="nb-quiz-close" aria-label="Close quiz">✕</button>
        <div class="nb-quiz-progress">
          ${questions.map((_, i) => `<div class="nb-quiz-progress__seg"><div class="nb-quiz-progress__seg-fill" style="width:${i < currentQ ? "100" : i === currentQ ? "50" : "0"}%"></div></div>`).join("")}
        </div>
        <div class="nb-quiz-q">${item.q}</div>
        <div class="nb-quiz-opts">
          ${item.opts
            .map(
              (o, i) => `
            <button class="nb-quiz-opt" data-tag="${o.tag}">
              <span class="nb-quiz-opt__emoji">${o.emoji}</span> ${o.label}
            </button>`,
            )
            .join("")}
        </div>`;
      bindClose();
      modal.querySelectorAll(".nb-quiz-opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          answers.push(btn.dataset.tag);
          currentQ++;
          if (currentQ < questions.length) renderQuestion();
          else renderResult();
        });
      });
    }

    function renderResult() {
      const counts = {};
      answers.forEach((tag) => (counts[tag] = (counts[tag] || 0) + 1));
      const winner = Object.keys(counts).reduce((a, b) =>
        counts[a] >= counts[b] ? a : b,
      );
      const r = results[winner];

      modal.innerHTML = `
        <button class="nb-quiz-close" aria-label="Close quiz">✕</button>
        <div class="nb-quiz-result">
          <span class="nb-quiz-result__icon">${r.icon}</span>
          <div class="nb-quiz-result__label">${r.label}</div>
          <div class="nb-quiz-result__title">${r.title}</div>
          <p class="nb-quiz-result__desc">${r.desc}</p>
          <div class="nb-quiz-actions">
            <button class="nb-btn-ghost" id="nbQuizRetry">Try Again</button>
            <a href="menu.html" class="nb-btn-primary">Order ${r.title} — ${r.price}</a>
          </div>
        </div>`;
      bindClose();
      modal.querySelector("#nbQuizRetry").addEventListener("click", resetQuiz);

      // Celebrate if confetti util is available (from animations.js)
      if (window.NB && window.NB.confetti) {
        window.NB.confetti(modal.querySelector(".nb-quiz-result__icon"), 28);
      }
    }

    function bindClose() {
      modal
        .querySelector(".nb-quiz-close")
        ?.addEventListener("click", closeQuiz);
    }

    function resetQuiz() {
      currentQ = 0;
      answers = [];
      renderQuestion();
    }

    function openQuiz() {
      resetQuiz();
      overlay.classList.add("show");
      document.body.style.overflow = "hidden";
    }
    function closeQuiz() {
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    }

    fab.addEventListener("click", openQuiz);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeQuiz();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("show")) closeQuiz();
    });

    return { open: openQuiz, close: closeQuiz };
  })();
  window.NB.quiz = BrewQuiz;

  /* ================================================================
     07. COMMAND PALETTE — ⌘K / Ctrl+K instant search
  ================================================================ */
  const CommandPalette = (function CommandPalette() {
    const pages = [
      {
        title: "Home",
        sub: "Back to the homepage",
        icon: "🏠",
        url: "index.html",
      },
      {
        title: "Menu",
        sub: "Browse drinks, food & beans",
        icon: "☕",
        url: "menu.html",
      },
      {
        title: "About Us",
        sub: "Our story, team & farms",
        icon: "🫘",
        url: "about.html",
      },
      {
        title: "Contact",
        sub: "Locations, hours & form",
        icon: "📍",
        url: "contact.html",
      },
      {
        title: "Customer Login",
        sub: "Sign in or register",
        icon: "👤",
        url: "login-customer.html",
      },
      {
        title: "Supplier Portal",
        sub: "Wholesale & partners",
        icon: "📦",
        url: "login-supplier.html",
      },
    ];
    const actions = [
      {
        title: "Toggle theme",
        sub: "Switch dark / light mode",
        icon: "🌗",
        action: () => window.NB_toggleTheme?.(),
      },
      {
        title: "Open cart",
        sub: "View your order",
        icon: "🛒",
        action: () => CartSystem.open(),
      },
      {
        title: "Find Your Brew",
        sub: "Take the coffee quiz",
        icon: "🎯",
        action: () => BrewQuiz.open(),
      },
      {
        title: "Open chat",
        sub: "Talk to the AI barista",
        icon: "🤖",
        action: () => window.NB?.chatbot?.open(),
      },
    ];
  })();
})();
