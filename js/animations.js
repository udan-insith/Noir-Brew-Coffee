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
})();
