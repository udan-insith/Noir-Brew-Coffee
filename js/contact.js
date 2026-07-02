"use strict";

// PAGE LOADER
window.addEventListener("load", () => {
  const bar = document.getElementById("loaderBar");
  if (bar) bar.style.width = "100%";
  setTimeout(() => {
    const loader = document.getElementById("pageLoader");
    if (loader) loader.classList.add("done");
  }, 1650);
});
