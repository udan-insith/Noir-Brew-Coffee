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
    `;
  });
});
