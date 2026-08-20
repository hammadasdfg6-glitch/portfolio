# Muhammad Hammad — Backend Developer Portfolio Website

A fast, lightweight, and modern single-page portfolio website tailored specifically for a backend engineer. Built with semantic HTML5, Tailwind CSS (via CDN), and vanilla JavaScript. Zero build steps, zero npm dependencies, fully responsive, accessible, dark-mode first with light-mode toggle, and 1-click frictionless CV download.

---

## 📁 Project Structure

```text
portfolio/
├── index.html                  # Main single-page application & semantic layout
├── assets/
│   ├── favicon.svg             # Custom SVG brand favicon with <MH/> monogram
│   └── Muhammad_Hammad_CV.pdf  # Target PDF for immediate 1-click download & preview
├── css/
│   └── style.css               # Custom styles, animations, glowing borders & scrollbars
├── js/
│   └── main.js                 # Dark mode, typing effect, scroll-reveal & interactive handlers
└── README.md                   # Project documentation & deployment guide
```

---

## 🚀 Key Features

1. **Instant 1-Click CV Download**:
   - Primary `<a>` tags with `download="Muhammad_Hammad_CV.pdf"` in both the Navbar and Hero.
   - Secondary "Preview CV" button to open the PDF in a new tab without downloading.
2. **Developer-First Aesthetic**:
   - Dark mode by default (`#090d16` obsidian/slate base) with high-contrast electric emerald (`#10b981`) and cyan accents.
   - Light mode toggle with state persistence in `localStorage`.
   - Google Fonts: `Inter` (clean UI body) + `JetBrains Mono` (code, metrics, section tags).
3. **Subtle Motion & Interactions**:
   - Terminal-style typing animation for backend engineering roles.
   - Native `IntersectionObserver` scroll-reveal animations (respects `prefers-reduced-motion`).
   - Sticky navbar with shrink-on-scroll and backdrop blur.
   - Interactive Backend Terminal card with system status, metrics, and monogram seal.
   - 1-click Copy-to-clipboard for Email and Phone with toast feedback.
   - Contact form wired to `mailto:` client with simple Formspree upgrade option.
   - Dynamic current year in footer via JavaScript.
4. **Zero Build Step**:
   - Open `index.html` directly in any web browser, or drop into any static web host.

---

## 📄 CV PDF Placement Instructions

Place your real resume/CV file at:
```text
portfolio/assets/Muhammad_Hammad_CV.pdf
```
Ensure the filename matches **`Muhammad_Hammad_CV.pdf`** exactly. Once replaced, the download and preview buttons will serve your real CV with zero code changes.

---

## 🌐 Deployment Guide

### Option 1: Deploy on Vercel (Recommended)
1. Push this repository to GitHub or install the [Vercel CLI](https://vercel.com/cli).
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository (or drag-and-drop the `portfolio` folder into Vercel).
3. Framework Preset: **Other** / **Static HTML**.
4. Click **Deploy**. Your site will be live instantly on an `*.vercel.app` domain with SSL.

### Option 2: Deploy on GitHub Pages
1. Push this folder to a GitHub repository (e.g. `https://github.com/hammadasdfg6-glitch/portfolio` or `hammadasdfg6-glitch.github.io`).
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
4. Choose branch `main` (or `master`) and folder `/ (root)`.
5. Click **Save**. Your site will be published at `https://<your-username>.github.io/<repo-name>/`.

### Option 3: Deploy on Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `portfolio` folder directly into the browser window.
3. Netlify will deploy it immediately.

---

## 🔗 Connecting a Custom Domain (e.g. `hammad.dev`)

1. Buy your domain from any registrar (Namecheap, Cloudflare, Google Domains/Squarespace, GoDaddy).
2. In your deployment dashboard (e.g. **Vercel** or **GitHub Pages**):
   - **Vercel**: Go to **Settings** > **Domains** > Add `yourdomain.com`.
   - **GitHub Pages**: Go to **Settings** > **Pages** > **Custom domain** > Enter `yourdomain.com`.
3. In your Domain Registrar's DNS Manager, configure:
   - **Apex domain (`yourdomain.com`)**:
     - Type: `A` Record
     - Host/Name: `@`
     - Value: `76.76.21.21` (for Vercel) or `185.199.108.153` (for GitHub Pages)
   - **Subdomain (`www.yourdomain.com`)**:
     - Type: `CNAME` Record
     - Host/Name: `www`
     - Value: `cname.vercel-dns.com` (for Vercel) or `<username>.github.io` (for GitHub Pages)
4. DNS propagation typically takes 5–30 minutes, after which HTTPS certificates are issued automatically.

---

## 📬 Connecting Formspree for Contact Form Submissions (Optional)

If you want form submissions to arrive directly in your email inbox instead of opening the user's email client:
1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy your unique Form endpoint (e.g. `https://formspree.io/f/xyzyqwer`).
3. In `index.html`, replace `<form id="contact-form" ...>` with:
   ```html
   <form action="https://formspree.io/f/YOUR_ENDPOINT_ID" method="POST" class="...">
   ```
4. Submissions will be sent straight to your email inbox with spam filtering included.
