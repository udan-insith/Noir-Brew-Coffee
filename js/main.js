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
    `;
  });
});
