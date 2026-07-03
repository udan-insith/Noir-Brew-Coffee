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

// MAP BUTTONS
function openMaps(query) {
  const url = `https://maps.google.com/?q=${encodeURIComponent(query)}`;
  window.open(url, "_blank", "noopener");
  addToast("📍 Opening in Google Maps…", "info");
}
window.openMaps = openMaps;

function copyAddress(addr) {
  navigator.clipboard
    .writeText(addr)
    .then(() => {
      addToast("📋 Address copied to clipboard!", "ok");
    })
    .catch(() => {
      addToast("⚠️ Could not copy — please copy manually.", "err");
    });
}
window.copyAddress = copyAddress;

// CHATBOT
const kb = {
  hours: {
    r: "Mon–Fri 7:00–20:00 · Sat–Sun 8:00–21:00 at all three locations. 🕐",
    qr: ["Tiong Bahru address?", "Dempsey Hill address?", "Jewel Changi?"],
  },
  tiong: {
    r: "📍 Tiong Bahru (Flagship)\n15 Eng Hoon Street, #01-02, Singapore 169175\nTel: +65 6234 5678",
    qr: ["Get directions", "Opening hours?"],
  },
  dempsey: {
    r: "📍 Dempsey Hill\n12 Dempsey Road, #01-15, Singapore 249677\nTel: +65 6234 9012",
    qr: ["Get directions", "Opening hours?"],
  },
  changi: {
    r: "📍 Jewel Changi Airport\n78 Airport Blvd, #B1-01, Singapore 819666\nTel: +65 6234 3456",
    qr: ["Get directions", "Opening hours?"],
  },
  contact: {
    r: "You can reach us via:\n✉️ hello@noirbrew.com\n📞 +65 6234 5678\nOr use the contact form on this page!",
    qr: ["Opening hours?", "Locations?"],
  },
  wholesale: {
    r: "For wholesale or supplier enquiries, visit our Supplier Portal — or drop us a line at suppliers@noirbrew.com. 🤝",
    qr: ["Supplier portal →", "Contact form?"],
  },
  catering: {
    r: "We offer catering and event coffee service! Contact us at events@noirbrew.com and we'll put together a package. ☕",
    qr: ["Contact details", "Opening hours?"],
  },
  default: {
    r: "I can help with locations, opening hours, or contact details. What do you need? ☕",
    qr: ["Locations", "Opening hours", "Email us", "Wholesale"],
  },
};

function matchKb(text) {
  const t = text.toLowerCase();
  if (/hour|open|close|when|time/.test(t)) return kb.hours;
  if (/tiong|bahru|eng hoon/.test(t)) return kb.tiong;
  if (/dempsey/.test(t)) return kb.dempsey;
  if (/changi|jewel|airport/.test(t)) return kb.changi;
  if (/email|phone|call|contact|reach/.test(t)) return kb.contact;
  if (/wholesale|bulk|supplier|partner|trade/.test(t)) return kb.wholesale;
  if (/cater|event|private|function/.test(t)) return kb.catering;
  return kb.default;
}

const chatFab = document.getElementById("chatbotFab");
const chatPanel = document.getElementById("chatPanel");
const chatMsgs = document.getElementById("chatMsgs");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

function appendMsg(text, type = "bot", qr = null) {
  const row = document.createElement("div");
  row.className = `msg-row ${type}`;
  const avt = document.createElement("div");
  avt.className = `msg-avt ${type}`;
  avt.textContent = type === "bot" ? "🤖" : "👤";
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "78%";
  const bub = document.createElement("div");
  bub.className = "msg-bubble";
  bub.innerHTML = text.replace(/\n/g, "<br>");
  wrap.appendChild(bub);
  if (qr) {
    const qWrap = document.createElement("div");
    qWrap.className = "qr-wrap";
    qr.forEach((q) => {
      const b = document.createElement("button");
      b.className = "qr-btn";
      b.textContent = q;
      b.addEventListener("click", () => sendMsg(q));
      qWrap.appendChild(b);
    });
    wrap.appendChild(qWrap);
  }
  type === "bot"
    ? (row.appendChild(avt), row.appendChild(wrap))
    : (row.appendChild(wrap), row.appendChild(avt));
  chatMsgs.appendChild(row);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function showTyping() {
  const tr = document.createElement("div");
  tr.className = "typing-row";
  tr.id = "typingRow";
  const a = document.createElement("div");
  a.className = "msg-avt bot";
  a.textContent = "🤖";
  const d = document.createElement("div");
  d.className = "typing-dots";
  for (let i = 0; i < 3; i++) {
    const dt = document.createElement("div");
    dt.className = "dot";
    d.appendChild(dt);
  }
  tr.appendChild(a);
  tr.appendChild(d);
  chatMsgs.appendChild(tr);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function sendMsg(text) {
  if (!text.trim()) return;
  appendMsg(text, "user");
  chatInput.value = "";
  showTyping();
  setTimeout(
    () => {
      document.getElementById("typingRow")?.remove();
      const m = matchKb(text);
      appendMsg(m.r, "bot", m.qr);
    },
    700 + Math.random() * 500,
  );
}

chatSend?.addEventListener("click", () => sendMsg(chatInput.value));
chatInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMsg(chatInput.value);
});

chatFab?.addEventListener("click", () => {
  const isOpen = chatPanel.classList.toggle("open");
  chatFab.classList.toggle("open", isOpen);
  chatFab.querySelector(".fab-icon").textContent = isOpen ? "✕" : "☕";
  document.getElementById("fabBadge")?.remove();
  if (isOpen && chatMsgs.children.length === 0) {
    setTimeout(() => {
      appendMsg(
        "Hi! 📍 I can help you find our cafés, check opening hours, or get in touch. What do you need?",
        "bot",
        ["Opening hours", "Tiong Bahru", "Dempsey Hill", "Jewel Changi"],
      );
    }, 320);
  }
});
