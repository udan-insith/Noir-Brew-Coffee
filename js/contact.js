"use strict";

// UTILITY
function addToast(msg, type = "info") {
  const wrap = document.getElementById("toastWrap");
  if (!wrap) return;
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => {
    t.style.cssText =
      "opacity:0;transform:translateY(14px);transition:all .4s ease;";
    setTimeout(() => t.remove(), 420);
  }, 3400);
}
window.addToast = addToast;

// NAVBAR
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 60);
  },
  { passive: true },
);

// HAMBURGER
const hbBtn = document.getElementById("hamburger");
const mobMenu = document.getElementById("mobMenu");
const mobOverlay = document.getElementById("mobOverlay");

function openMob() {
  hbBtn.classList.add("open");
  mobMenu.classList.add("open");
  mobOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
  hbBtn.setAttribute("aria-expanded", "true");
}
function closeMob() {
  hbBtn.classList.remove("open");
  mobMenu.classList.remove("open");
  mobOverlay.classList.remove("show");
  document.body.style.overflow = "";
  hbBtn.setAttribute("aria-expanded", "false");
}
hbBtn?.addEventListener("click", () =>
  mobMenu.classList.contains("open") ? closeMob() : openMob(),
);
mobOverlay?.addEventListener("click", closeMob);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMob();
  }
});

// DROPDOWN MENU
document.querySelectorAll(".has-dropdown").forEach((dd) => {
  dd.addEventListener("click", () => {
    const wasOpen = dd.classList.contains("open");
    document
      .querySelectorAll(".has-dropdown.open")
      .forEach((o) => o.classList.remove("open"));
    if (!wasOpen) dd.classList.add("open");
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".has-dropdown"))
    document
      .querySelectorAll(".has-dropdown.open")
      .forEach((o) => o.classList.remove("open"));
});

// THEME SWITCHER
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const curtain = document.getElementById("themeCurtain");
let isDark = true;

(function applyStoredTheme() {
  const saved = localStorage.getItem("nbTheme");
  if (saved) {
    isDark = saved === "dark";
    root.setAttribute("data-theme", saved);
    if (themeBtn) themeBtn.textContent = isDark ? "🌙" : "☀️";
  }
})();

themeBtn?.addEventListener("click", () => {
  curtain.classList.remove("dropping");
  curtain.offsetHeight;
  curtain.classList.add("dropping");
  setTimeout(() => {
    isDark = !isDark;
    const next = isDark ? "dark" : "light";
    root.setAttribute("data-theme", next);
    themeBtn.textContent = isDark ? "🌙" : "☀️";
    localStorage.setItem("nbTheme", next);
  }, 420);
});

// PAGE LOADER
window.addEventListener("load", () => {
  const bar = document.getElementById("loaderBar");
  if (bar) bar.style.width = "100%";
  setTimeout(() => {
    const loader = document.getElementById("pageLoader");
    if (loader) loader.classList.add("done");
  }, 1650);
});

// SCROLL REVEAL
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
);

document
  .querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-s")
  .forEach((el) => revealObs.observe(el));

// LOCATION TABS
const locTabs = document.querySelectorAll(".loc-tab");
const locPanels = document.querySelectorAll(".loc-panel");

function switchTab(targetId) {
  locTabs.forEach((t) =>
    t.classList.toggle("active", t.dataset.loc === targetId),
  );
  locPanels.forEach((p) => p.classList.toggle("active", p.id === targetId));
}

locTabs.forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.loc));
});

// Highlight today's hours
(function highlightToday() {
  const dayIndex = new Date().getDay(); // 0=Sun…6=Sat
  document.querySelectorAll(".hours-row").forEach((row) => {
    const days = row.dataset.days
      ? row.dataset.days.split(",").map(Number)
      : [];
    if (days.includes(dayIndex)) row.classList.add("today");
  });
})();

// FAQ ACCORDION
document.querySelectorAll(".faq-item").forEach((item) => {
  const q = item.querySelector(".faq-q");
  q?.addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    // Close all others
    document
      .querySelectorAll(".faq-item.open")
      .forEach((o) => o.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
  // Keyboard
  q?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      q.click();
    }
  });
});

// TOPIC CHIP SELECTOR
const topicChips = document.querySelectorAll(".topic-chip");
const topicInput = document.getElementById("topicInput");

topicChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    topicChips.forEach((c) => c.classList.remove("selected"));
    chip.classList.add("selected");
    if (topicInput) topicInput.value = chip.textContent.trim();
  });
});

// FLOATING LABEL
document.querySelectorAll(".fl-select").forEach((sel) => {
  sel.addEventListener("change", () => {
    sel.classList.toggle("has-val", sel.value !== "");
  });
});

// FORM VALIDATION
const rules = {
  name: {
    validate: (v) => v.trim().length >= 2 && /^[a-zA-Z\s\-']+$/.test(v.trim()),
    msg: "Please enter a valid name (at least 2 characters).",
  },
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    msg: "Please enter a valid email address.",
  },
  phone: {
    validate: (v) => v.trim() === "" || /^[\+\d\s\-\(\)]{7,18}$/.test(v.trim()),
    msg: "Please enter a valid phone number.",
  },
  message: {
    validate: (v) => v.trim().length >= 15,
    msg: "Message must be at least 15 characters.",
  },
  subject: {
    validate: (v) => v.trim().length >= 3,
    msg: "Please enter a subject (at least 3 characters).",
  },
};

function validateField(fieldEl) {
  const group = fieldEl.closest(".fl-group");
  const name = fieldEl.dataset.validate;
  const icon = group?.querySelector(".fl-icon");
  const errEl = group?.querySelector(".fl-error");

  if (!name || !rules[name] || !group) return true;

  const rule = rules[name];
  const valid = rule.validate(fieldEl.value);
  const empty = fieldEl.value.trim() === "";

  // Skip optional fields if empty
  const optional = fieldEl.dataset.optional === "true";
  if (optional && empty) {
    group.classList.remove("valid", "invalid");
    if (icon) icon.textContent = "";
    return true;
  }

  group.classList.toggle("valid", valid);
  group.classList.toggle("invalid", !valid);
  if (icon) icon.textContent = valid ? "✓" : "✕";
  if (errEl) errEl.textContent = valid ? "" : rule.msg;
  return valid;
}

// Live validation on blur/input
document.querySelectorAll("[data-validate]").forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.closest(".fl-group")?.classList.contains("invalid"))
      validateField(field);
  });
});

// CHARACTER COUNTER
const msgArea = document.getElementById("msgArea");
const charSpan = document.getElementById("charCount");
const MAX_CHARS = 1000;

if (msgArea && charSpan) {
  msgArea.addEventListener("input", () => {
    const len = msgArea.value.length;
    charSpan.textContent = `${len} / ${MAX_CHARS}`;
    charSpan.parentElement.classList.toggle("warn", len > MAX_CHARS * 0.8);
    charSpan.parentElement.classList.toggle("over", len > MAX_CHARS);
  });
}

// CONTACT FORM SUBMIT
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formWrap = document.getElementById("formWrap");
const successMsg = document.getElementById("successMsg");

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validate all required fields
  const fields = contactForm.querySelectorAll("[data-validate]");
  let allValid = true;
  fields.forEach((f) => {
    if (!validateField(f)) allValid = false;
  });
  if (!allValid) {
    // Shake the submit button
    submitBtn.style.animation = "none";
    submitBtn.offsetHeight;
    submitBtn.style.animation = "shake .5s ease";
    addToast("⚠️ Please fix the errors before submitting.", "err");
    // Scroll to first error
    const firstErr = contactForm.querySelector(".fl-group.invalid");
    firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Loading state
  submitBtn.classList.add("loading");
  submitBtn.innerHTML = '<div class="spinner"></div> Sending…';

  // Simulate async send (replace with real fetch in production)
  await new Promise((r) => setTimeout(r, 1800));

  // Collect data
  const data = Object.fromEntries(new FormData(contactForm));
  console.log("Form data:", data); // Remove in production

  // Success state
  submitBtn.classList.remove("loading");
  submitBtn.classList.add("success");
  submitBtn.innerHTML = "✓ Message Sent!";

  // Show success panel
  setTimeout(() => {
    formWrap.style.display = "none";
    successMsg.classList.add("show");
  }, 600);

  addToast("✅ Message sent! We'll reply within 24 hours.", "ok");

  // Reset after delay
  setTimeout(() => {
    contactForm.reset();
    document
      .querySelectorAll(".fl-group")
      .forEach((g) => g.classList.remove("valid", "invalid"));
    topicChips.forEach((c) => c.classList.remove("selected"));
    if (topicInput) topicInput.value = "";
    submitBtn.classList.remove("success");
    submitBtn.innerHTML = "<span>Send Message</span><span>→</span>";
    formWrap.style.display = "";
    successMsg.classList.remove("show");
    if (charSpan) charSpan.textContent = `0 / ${MAX_CHARS}`;
  }, 6000);
});

// NEWSLETTER
document.getElementById("cnForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailEl = document.getElementById("cnEmail");
  const email = emailEl?.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!valid) {
    emailEl?.classList.add("shake");
    setTimeout(() => emailEl?.classList.remove("shake"), 600);
    addToast("⚠️ Please enter a valid email.", "err");
    return;
  }
  addToast(`✅ ${email} added to the list!`, "ok");
  e.target.reset();
});
