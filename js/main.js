// MAIN js - This is some extra features
(function NB_Main() {
  "use strict";

  window.NB = window.NB || {};
  const toast = (...args) =>
    window.addToast ? window.addToast(...args) : console.log(...args);
});
