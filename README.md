# 🕊️ NayePankh Foundation — Official Website Redesign

> **"Giving Wings to Dreams"**  
> A premium, modern, fully-responsive NGO website built with HTML5, CSS3, and Vanilla JavaScript.

---

## 🌐 Live Preview

Open `index.html` in your browser or deploy to:
- **Netlify**: Drag & drop the project folder at [app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages**: Push to a GitHub repo and enable Pages from Settings → Pages → Root

---

## 📁 Project Structure

```
nayepankh-foundation-website/
│
├── index.html            → Home Page
├── about.html            → About Us (Who We Are)
├── success-stories.html  → Success Stories (Interactive Before/After Comparison)
├── media-coverage.html   → Media Coverage & Awards Page
├── careers.html          → Careers / Internships Portal Page
├── programs.html         → Programs & Initiatives Page
├── volunteer.html        → Volunteer Registration Page
├── donate.html           → Donation Portal Page
├── gallery.html          → Photo Gallery Page
├── events.html           → NGO Events & Campaigns Calendar Page
├── contact.html          → Contact & Social Media Page
│
├── css/
│   ├── style.css         → Global Design System & Component Styles
│   └── responsive.css    → Media Queries & Mobile-First Layouts
│
├── js/
│   ├── main.js           → Core Interactivity (Nav, Search, Share, Slider, Modals, Forms, Counter)
│   └── animations.js     → AOS Init, Ripple Effects & 3D Card Tilt
│
├── images/
│   └── hero_illustration.png   → Generated Hero Section Illustration
│
├── assets/               → Additional SVGs, icons, or media (placeholder directory)
│
└── README.md             → This File
```

---

## ✨ Features

### Design System
- 🎨 **Blue & Purple Gradient Accents** with cyan highlights
- 🌙 **Dark / Light Mode Toggle** — persists across page reloads via `localStorage`
- 💎 **Glassmorphism Cards** with `backdrop-filter: blur()`
- 🌊 **Animated Gradient Blobs** — floating background shapes on each page
- 🔤 **Google Fonts** — Outfit (headings) + Inter (body text)

### Pages & Sections
| Page | Key Sections |
|------|--------------|
| **Home** | Hero, Animated Stats, Impact Areas, Why Us, Success Preview, Testimonials, Gallery Preview, CTA |
| **About** | Mission/Vision, Core Values, Team Cards, Timeline, Certifications |
| **Success Stories** | Drag-to-Compare Slum Bridge Classroom Slider, Categorized Case File Stories |
| **Media Coverage** | Newspaper Print Mentions, Awards & Honors Showcase, Press Coverage Timeline |
| **Careers** | Open Roles (Web Dev, Social Media, Teaching, PR), Internship Benefits, Application Modal |
| **Programs** | 6 Program Cards with Collapsible Details (Education, Food, Hygiene, Clothing, Youth, Animals) |
| **Volunteer** | Opportunities Grid, Benefits Cards, Validated Registration Form |
| **Donate** | Clickable Tier Cards (₹500–₹5000) Auto-Filling Form, Custom Form, FAQ Accordion, Impact Stats |
| **Gallery** | Masonry Gallery, Category Filters, Lightbox Preview |
| **Events** | Upcoming Campaigns (Delhi, Noida, Kanpur) and Vertical Past Project Timeline |
| **Contact** | Contact Details, Inquiry Form, Interactive Social Cards, OpenStreetMap Embed |

### Advanced Features & Interactions
- 🔍 **Dynamic Search Overlay** — Navbar search icon opens overlay indexing all page content for instant searching.
- 🤝 **Floating CTAs** — Slick scroll-triggered Volunteer and Donate buttons appearing in the bottom-left corner.
- 📢 **Social Share Widget** — Floating sidebar sharing panel (desktop) and mobile Web Share API triggers.
- 📐 **Before/After Comparison** — Interactive dragging partition on the Success Stories page.
- 📋 **Form Validations** — Inline regex validations with custom toast feedback alerts for Volunteer, Contact, Newsletter, Event Registration, and Internship Application forms.
- ✅ **AOS (Animate On Scroll)** — fade-up, fade-left, fade-right, zoom-in on all sections
- ✅ **Statistics Counter** — count-up animation triggers on scroll into view
- ✅ **Testimonial Slider** — auto-play, touch swipe, dot indicators, arrow controls
- ✅ **Gallery Filter** — instant category-based show/hide with opacity transitions
- ✅ **Lightbox Preview** — keyboard navigation (Escape/Arrow keys) + click to close
- ✅ **FAQ Accordion** — smooth max-height expand/collapse animation
- ✅ **Ripple Button Effect** — Material-style click ripple on all buttons
- ✅ **3D Card Tilt** — mouse-tracking perspective tilt on glass cards (desktop only)
- ✅ **Scroll Progress Bar** — gradient progress indicator at top of viewport
- ✅ **Floating Hero Widgets** — animated small info cards floating above hero illustration
- ✅ **Scroll Indicator** — bouncing chevron arrow at hero bottom
- ✅ **Page Preloader** — branded spinner with logo fade-out on load

---

## 🔗 Social Media Links

All links open in a **new tab** (`target="_blank" rel="noopener noreferrer"`):

| Platform | URL |
|----------|-----|
| 🌐 Official Website | https://www.nayepankh.com |
| 📸 Instagram | https://www.instagram.com/nayepankhfoundation |
| 💼 LinkedIn | https://www.linkedin.com/company/nayepankh |
| 📘 Facebook | https://facebook.com/nayepankhfoundation |
| ▶️ YouTube | https://youtube.com/@nayepankhfoundation |
| 📧 Email | contact@nayepankh.com |

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Custom design system, glassmorphism, animations |
| Vanilla JavaScript (ES6+) | All interactivity without frameworks |
| [AOS Library v2.3.4](https://michalsnik.github.io/aos/) | Scroll-triggered animations (CDN) |
| [Font Awesome 6.4.0](https://fontawesome.com/) | Icon library (CDN) |
| [Google Fonts](https://fonts.google.com/) | Outfit + Inter typography (CDN) |
| [OpenStreetMap](https://www.openstreetmap.org/) | Interactive map embed on Contact page |
| [Unsplash](https://unsplash.com/) | Placeholder imagery for demonstration |

---

## 🚀 Quick Start

### Option 1: Open Locally
1. Simply double-click `index.html` inside File Explorer.
2. Navigate around the pages using the Header dropdown and Quick Links footer.

### Option 2: Serviced Server (Recommended)
If using VS Code, install the **Live Server** extension (by Ritwick Dey) and click **"Go Live"** to run the site with auto-reload at `http://127.0.0.1:5500`.
Alternatively, run with Python:
```bash
python -m http.server 8000
# Open http://localhost:8000 in your browser
```
