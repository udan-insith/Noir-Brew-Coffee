# ☕ Noir Brew Co.

**An specialty coffee website** — built from scratch with pure HTML, CSS, and vanilla JavaScript. Dark-gold aesthetic, full animation system, dual login portals, and a built-in AI barista chatbot.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Frameworks](https://img.shields.io/badge/Frameworks-None-critical?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## Watch A Demo - https://noir-brew-coffee.netlify.app/

## ✨ Overview

Noir Brew Co. is a fictional Singapore-based specialty coffee roaster. This repo is the full front-end for its brand website — designed to feel premium, animated, and modern, while staying dependency-free (no GSAP, no frameworks, no build step required).

> Open `index.html` in a browser and the whole site runs. No `npm install`, no bundler, no backend required for the core experience.

---

## 🗂️ Project Structure

```
noir-brew/
├── index.html                 # Home page — hero, features, menu showcase, testimonials
├── menu.html                  # Full menu — filters, search, sort, quick-view modal
├── about.html                 # Brand story, timeline, team, farm partners, awards
├── contact.html                # Location tabs, contact form, FAQ accordion
├── login-customer.html        # Customer sign in / register
├── login-supplier.html        # Supplier portal sign in / apply + OTP verification
│
├── css/
│   ├── style.css               # Core design system — tokens, layout, components
│   ├── menu.css                 # Menu page — filter bar, item cards, quick view
│   ├── about.css                # About page — timeline, team grid, awards
│   ├── contact.css              # Contact page — forms, location tabs, FAQ
│   ├── navbar.css               # Navbar, dropdowns, hamburger, mobile menu
│   ├── theme.css                # Dark/light tokens, curtain transition, toasts, loader
│   ├── chatbot.css              # AI barista widget — FAB + chat panel
│   └── animations.css           # Shared animation/keyframe library
│
├── js/
│   ├── theme.js                  # Theme switching,  animation, toasts, loader
│   ├── navbar.js                 # Scroll shrink, dropdowns, hamburger, active links
│   ├── chatbot.js                # AI barista logic — intents, quick replies, memory
│   ├── animations.js             # Scroll reveal, cursor, tilt cards, parallax, confetti
│   └── main.js                   # Site-wide glue: counters, marquee, drag-scroll, misc
│
└── README.md
```

---

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| `--c-bg` | `#0a0806` | Primary background (dark mode) |
| `--c-gold` | `#d4a853` | Brand accent — buttons, links, highlights |
| `--c-cream` | `#f6f0e4` | Primary text on dark backgrounds |
| `--font-display` | Fraunces | Headings, logo |
| `--font-body` | DM Sans | Body copy, UI |
| `--font-italic` | Cormorant Garamond | Accent quotes, taglines |

All colors, spacing, radii, and easing curves are defined as CSS custom properties in `style.css` and `theme.css` — override them in one place to reskin the entire site.

---

## 🚀 Features

### Design & Animation
- Dark/light **theme switcher** with a signature "curtain drop" transition (gold sheet wipes top → bottom)
- Full **scroll-reveal system** (fade/slide/scale-in on scroll via `IntersectionObserver`)
- Animated **hamburger menu** with staggered link entrance
- **Dropdown navbar menus** with keyboard navigation (arrow keys, `Esc`)
- Parallax hero, particle canvas, marquee ticker, draggable scroll strips
- Magnetic buttons, tilt cards, custom cursor, confetti burst utility
- Page loader with animated coffee cup SVG

### Pages
- **Home** — hero, feature grid, menu showcase, testimonials, stats counter, gallery
- **Menu** — live search, category filters, sort, quick-view modal, favorites (localStorage), cart badge
- **About** — brand manifesto, scrolling timeline, team grid, farm partner map, awards
- **Contact** — tabbed multi-location info, floating-label form with live validation, FAQ accordion
- **Customer Login** — sign in / register tabs, password strength meter, forgot-password flow
- **Supplier Portal** — separate branded login, company application form, two-step OTP verification

### AI Barista Chatbot
- Floating action button with pulse + unread badge
- Intent-matching engine (menu, hours, locations, pricing, beans, wholesale, etc.)
- Quick-reply buttons, typing indicator, session memory (`sessionStorage`)
- Fully extensible — add new intents via `NB.chatbot.addIntent()`

### Accessibility & UX
- Keyboard-navigable dropdowns and modals
- `prefers-reduced-motion` respected throughout
- Focus-visible states styled to match the brand
- Toast notification system for form/action feedback

---

## 🖥️ Getting Started

No build tools needed.

```bash
git clone https://github.com/<your-username>/noir-brew-co.git
cd noir-brew-co
```

Then simply open `index.html` in your browser, or serve it locally:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Visit `http://localhost:8000`.

---

## 🔑 Demo Credentials

| Portal | Email | Password | Notes |
|---|---|---|---|
| Customer Login | `demo@noirbrew.com` | `Demo1234!` | — |
| Supplier Portal | `supplier@demo.com` | `Supplier123!` | OTP: `427193` |

> These are front-end demo flows only — no real backend/database is connected. All auth is simulated with `localStorage`/`sessionStorage` for demonstration purposes.

---

## 🧩 Extending the Chatbot

Add new intents from any page after `chatbot.js` loads:

```js
NB.chatbot.addIntent('parking', {
  match: /parking|park my car/i,
  reply: "Free parking is available at Dempsey Hill and Tiong Bahru Plaza 🚗",
  qr: ['Opening hours?', 'Locations?'],
});
```

---

## 🌗 Theming

Toggle dark/light mode programmatically:

```js
NB.setTheme('light');   // or 'dark'
NB.isDarkMode();        // → true | false
```

Keyboard shortcut: `Shift + D`.

---

## 📦 Image & Font Credits

- Photography: [Unsplash](https://unsplash.com) (royalty-free)
- Avatars: [DiceBear](https://dicebear.com) (generated, open-source)
- Fonts: [Google Fonts](https://fonts.google.com) — Fraunces, DM Sans, Cormorant Garamond

---

## 🛣️ Roadmap

- [ ] Connect contact form to a real email service (e.g. Formspree, EmailJS)
- [ ] Wire up customer/supplier auth to a real backend
- [ ] Add PHP proxy for live AI chatbot responses (optional upgrade path)
- [ ] Persist cart across sessions with a checkout flow
- [ ] Add automated Lighthouse/accessibility CI checks

---

## 📄 License

Released under the [MIT License](LICENSE). Free to use, modify, and build on for personal or commercial projects.

---

## 🙌 Author

Built by **[Your Name]** as a self-directed learning project — exploring advanced vanilla JS animation, component architecture, and UI polish without relying on frameworks.
