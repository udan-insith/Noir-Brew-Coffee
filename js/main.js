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

    `;
  });
});
