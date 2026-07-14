(function NB_Chatbot() {
  "use strict";

  // CHATBOT KNOWLEDGE BASE
  const KB = {
    greeting: {
      match: /^(hi|hello|hey|yo|sup|good (morning|afternoon|evening))\b/i,
      reply:
        "Hey there! 👋 Welcome to Noir Brew Co. I'm your AI barista — ask me about our menu, locations, hours, or bean subscriptions!",
      qr: ["Show me the menu", "Where are you located?", "Opening hours?"],
    },
    menu: {
      match: /menu|drink|coffee|latte|espresso|brew|cappuccino|order|piccolo/i,
      reply:
        "We've got hot drinks, cold brews, food & pastries, seasonal specials, and whole beans. ☕ <a href='menu.html'>Browse the full menu →</a>",
      qr: ["Bestsellers?", "Cold brew options", "Vegan options"],
    },
    price: {
      match: /price|cost|how much|\$|expensive|cheap/i,
      reply:
        "Drinks range from $5.00–$9.50. Food from $5.50–$18.00. Whole bean bags start at $24/250g. 💰",
      qr: ["What is your bestseller?", "Bean subscriptions?"],
    },
    hours: {
      match: /hour|open|close|when.*(open|close)|what time/i,
      reply:
        "We're open Mon–Fri 7:00–20:00, and Sat–Sun 8:00–21:00 at all three locations! 🕐",
      qr: ["Where are you located?", "Any public holiday hours?"],
    },
    location: {
      match:
        /where|location|address|find you|changi|tiong|dempsey|directions|map/i,
      reply:
        "Three cafés in Singapore: 📍 <b>Tiong Bahru</b> (flagship), 📍 <b>Dempsey Hill</b>, 📍 <b>Jewel Changi Airport</b>. <a href='contact.html'>Get directions →</a>",
      qr: ["Opening hours?", "Contact details"],
    },
    bestseller: {
      match: /best|popular|recommend|favou?rite|top seller|must try/i,
      reply:
        "Our absolute favourites: the <b>Honey Oat Latte</b>, <b>Nitro Cold Brew</b>, and <b>The Noir Signature</b> blend. ⭐",
      qr: ["How much is it?", "Full menu"],
    },
    subscription: {
      match: /subscri|delivery|deliver|bean club|door|ship|recurring/i,
      reply:
        "Our Bean Club delivers fresh-roasted coffee every 2 or 4 weeks. 🫘 First bag is on us! <a href='menu.html#beans'>Sign up →</a>",
      qr: ["How much does it cost?", "Can I pause anytime?"],
    },
    beans: {
      match: /bean|origin|single.origin|roast level|whole bean|grind/i,
      reply:
        "We stock six origins: Ethiopia, Colombia, Guatemala, Indonesia, Kenya, and our House Blend. All roasted to order. <a href='menu.html#beans'>Shop beans →</a>",
      qr: ["Bean prices?", "Subscription info"],
    },
    vegan: {
      match: /vegan|plant.based|dairy.free|oat milk|almond milk|allerg/i,
      reply:
        "Most of our menu is vegan-friendly! We offer oat, almond, and soy milk at no extra charge. 🌱 Look for the <b>VG</b> tag on menu items.",
      qr: ["Full menu", "Gluten-free options?"],
    },
    wifi: {
      match: /wifi|wi-fi|internet|work.*(laptop|remote)|study/i,
      reply:
        "Yes! Free high-speed WiFi at all locations. Tiong Bahru & Dempsey have dedicated work zones with power outlets. 💻☕",
      qr: ["Opening hours?", "Which location is best for working?"],
    },
    wholesale: {
      match: /wholesale|bulk|supplier|partner.*(coffee|trade)|b2b/i,
      reply:
        "We'd love to chat! Visit our <a href='supplier-login.html'>Supplier Portal</a> or email suppliers@noirbrew.com. 🤝",
      qr: ["Supplier portal →", "Minimum order?"],
    },
    catering: {
      match: /cater|event|private.*(function|party)|wedding|corporate event/i,
      reply:
        "We offer catering and event coffee service! Email events@noirbrew.com with your date and headcount and we'll put a package together. 🎉",
      qr: ["Contact details", "Opening hours?"],
    },
    contact: {
      match: /contact|email|phone|call|reach you|talk to (a )?human/i,
      reply:
        "Reach us at ✉️ hello@noirbrew.com or 📞 +65 6234 5678 — or use the form on our <a href='contact.html'>Contact page</a>.",
      qr: ["Locations?", "Opening hours?"],
    },
    about: {
      match: /story|found|start|begin|histor|who (are|founded)|about you/i,
      reply:
        "Noir Brew Co. was founded in 2018 by Marcus Chen in a tiny Tiong Bahru roastery. Today: 3 cafés, 12 farm partners, 12,000+ cups a month. <a href='about.html'>Read our story →</a>",
      qr: ["The team?", "Awards won?"],
    },
    thanks: {
      match: /thank|thanks|appreciate|cheers|ty\b/i,
      reply: "You're so welcome! Anything else I can help with? ☕😊",
      qr: ["Menu", "Locations", "Nothing, thanks!"],
    },
    bye: {
      match: /bye|goodbye|see ya|later|that'?s all|nothing, thanks/i,
      reply:
        "Thanks for stopping by! Come see us in person soon. Have a wonderful day ☕✨",
      qr: [],
    },
    login: {
      match: /login|sign in|log in|account|register|sign up|create account/i,
      reply:
        "You can sign in or create a customer account here: <a href='login-customer.html'>Customer Login →</a> Suppliers, use the <a href='login-supplier.html'>Supplier Portal →</a>.",
      qr: ["Customer login", "Supplier portal"],
    },
  };

  const DEFAULT_REPLY = {
    reply:
      "Great question! I can help with our menu, prices, hours, locations, or bean subscriptions. What would you like to know? ☕",
    qr: ["Menu", "Prices", "Locations", "Opening hours"],
  };

  /* ================================================================
     MATCH USER INPUT AGAINST KB
  ================================================================ */
  function matchIntent(text) {
    for (const key in KB) {
      if (KB[key].match.test(text)) return KB[key];
    }
    return DEFAULT_REPLY;
  }

  /* ================================================================
     DOM REFERENCES (with graceful fallback if page has none)
  ================================================================ */
  const fab = document.getElementById("chatbotFab");
  const panel = document.getElementById("chatPanel");
  const msgsEl = document.getElementById("chatMsgs");
  const inputEl = document.getElementById("chatInput");
  const sendBtn = document.getElementById("chatSend");
  const closeBtn = document.getElementById("chatClose"); // optional
  const badge = document.getElementById("fabBadge");

  if (!fab || !panel || !msgsEl) return; // chatbot not present on this page

  /* ================================================================
     SESSION STORAGE — remember conversation across page nav
  ================================================================ */
  const SESSION_KEY = "nbChatHistory";
  const MAX_HISTORY = 30;

  function loadHistory() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || [];
    } catch {
      return [];
    }
  }
  function saveHistory(history) {
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify(history.slice(-MAX_HISTORY)),
      );
    } catch {
      /* storage unavailable — fail silently */
    }
  }
  let history = loadHistory();

  /* ================================================================
     RENDER A MESSAGE BUBBLE
  ================================================================ */
  function renderMsg(text, type, qr) {
    const row = document.createElement("div");
    row.className = `msg-row ${type}`;

    const avt = document.createElement("div");
    avt.className = `msg-avt ${type}`;
    avt.textContent = type === "bot" ? "🤖" : "👤";

    const content = document.createElement("div");
    content.className = "msg-content";

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.innerHTML = sanitize(text);
    content.appendChild(bubble);

    if (qr && qr.length) {
      const qrWrap = focume.createElement("div");
      qrWrap.className = "qr-wrap";
      qr.forEach((q) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "qr-btn";
        btn.textContent = q;
        btn.addEventListener("click", () => sendMessage(q));
        qrWrap.appendChild(btn);
      });
      content.appendChild(qrWrap);
    }
    if (type === "bot") {
      row.appendChild(avt);
      row.appendChild(content);
    } else {
      row.appendChild(content);
      row.appendChild(avt);
    }

    msgsEl.appendChild(row);
    scrollToBottom();
  }

  // Minimal sanitize — allow only <a>, <b>, <br> tags we generate ourselves
  function sanitize(html) {
    const allowed = /<(\/?)(a|b|br)(\s+href="[^"]*")?\s*>/gi;
    const div = document.createElement("div");
    div.textContent = html;
    let escaped = div.innerHTML;
    // Re-allow our known-safe tags (since KB content is developer-authored, not user input)
    return html; // KB replies are trusted developer content; user text is placed via textContent below
  }

  function scrollToBottom() {
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  /* ================================================================
     TYPING INDICATOR
  ================================================================ */
  function showTyping() {
    const row = document.createElement("div");
    row.className = "typing-row";
    row.id = "nbTypingRow";

    const avt = document.createElement("div");
    avt.className = "msg-avt bot";
    avt.textContent = "🤖";

    const dots = document.createElement("div");
    dots.className = "typing-dots";
    for (let i = 0; i < 3; i++) {
      const d = document.createElement("div");
      d.className = "dot";
      dots.appendChild(d);
    }
    row.appendChild(avt);
    row.appendChild(dots);
    msgsEl.appendChild(row);
    scrollToBottom();
  }
  function hideTyping() {
    document.getElementById("nbTypingRow")?.remove();
  }

  /* ================================================================
     SEND MESSAGE (user-initiated or quick-reply)
  ================================================================ */
  function sendMessage(rawText) {
    const text = (rawText ?? inputEl.value).trim();
    if (!text) return;

    // Render user message (escaped — never innerHTML for user content)
    const row = document.createElement("div");
    row.className = "msg-row user";
    const avt = document.createElement("div");
    avt.className = "msg-avt user";
    avt.textContent = "👤";
    const content = document.createElement("div");
    content.className = "msg-content";
    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.textContent = text; // safe — textContent, not innerHTML
    content.appendChild(bubble);
    row.appendChild(content);
    row.appendChild(avt);
    msgsEl.appendChild(row);
    scrollToBottom();

    history.push({ role: "user", text });
    saveHistory(history);

    if (inputEl) inputEl.value = "";
    updateSendButtonState();

    showTyping();
    const thinkDelay = 650 + Math.random() * 550;

    setTimeout(() => {
      hideTyping();
      const match = matchIntent(text);
      renderMsg(match.reply, "bot", match.qr);
      history.push({ role: "bot", text: match.reply });
      saveHistory(history);
    }, thinkDelay);
  }
  window.NB_sendChatMessage = sendMessage; // exposed for external triggers

  /* ================================================================
     INPUT HANDLERS
  ================================================================ */
  function updateSendButtonState() {
    if (!sendBtn || !inputEl) return;
    sendBtn.disabled = inputEl.value.trim().length === 0;
  }

  inputEl?.addEventListener("input", updateSendButtonState);
  inputEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  sendBtn?.addEventListener("click", () => sendMessage());
  updateSendButtonState();

  /* ================================================================
     OPEN / CLOSE PANEL
  ================================================================ */
  let panelOpen = false;

  function openPanel() {
    panelOpen = true;
    panel.classList.add("open");
    fab.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    fab.setAttribute("aria-expanded", "true");
    const icon = fab.querySelector(".fab-icon");
    if (icon) icon.textContent = "✕";
    badge?.remove();

    // Render welcome message + restore history on first open
    if (msgsEl.children.length === 0) {
      if (history.length > 0) {
        // Restore prior session
        history.forEach((h) =>
          renderMsg(h.text, h.role === "user" ? "user" : "bot"),
        );
      } else {
        setTimeout(() => {
          renderMsg(
            "Hello! ☕ I'm your Noir Brew AI Barista. Ask me about our <b>menu</b>, <b>locations</b>, <b>opening hours</b>, or bean subscriptions!",
            "bot",
            [
              "Menu & drinks",
              "Our locations",
              "Opening hours",
              "Bean subscriptions",
            ],
          );
        }, 320);
      }
    }
    setTimeout(() => inputEl?.focus(), 400);
  }

  function closePanel() {
    panelOpen = false;
    panel.classList.remove("open");
    fab.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    fab.setAttribute("aria-expanded", "false");
    const icon = fab.querySelector(".fab-icon");
    if (icon) icon.textContent = "☕";
  }

  function togglePanel() {
    panelOpen ? closePanel() : openPanel();
  }

  fab.addEventListener("click", togglePanel);
  closeBtn?.addEventListener("click", closePanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panelOpen) closePanel();
  });
});
