# 🎬 Cinematic Video Editor & Colorist Portfolio

A sleek, modern, high-converting portfolio website built specifically for video editors, colorists, and post-production specialists.

---

## 🌟 Key Features

1. **Cinematic Dark Theme**: Crafted with deep atmospheric dark tones, amber/gold accents, and glassmorphism panels.
2. **Dynamic Project Showcase & Lightbox**:
   - Filter by **All Works**, **YouTube / Long-form**, **Viral Shorts / TikTok / Reels**, **Commercials & Brands**, and **Color Grading**.
   - Built-in video modal lightbox supporting YouTube embeds and direct video files.
3. **Interactive Before & After Color Grading Slider**:
   - Interactive slider allowing potential clients to drag between raw uncorrected camera Log footage and finished color grading & film emulation.
4. **Interactive Cost & Project Estimator**:
   - Prospective clients can choose deliverables, turnaround speed (standard, 48h rush, 24h express), and add-ons (subtitles, dedicated color grade) to calculate an instant quote and pre-populate the inquiry form.
5. **Services & Production Suite**:
   - Highlights retention editing, pacing, sound design, DaVinci Resolve, Premiere Pro, After Effects, and Frame.io review pipeline.
6. **Client Testimonials & Endorsements**:
   - Highlight metrics, subscriber counts, and client reviews.
7. **Comprehensive Project Inquiry Form**:
   - Collects project brief, deliverable type, and raw footage links (Drive/Dropbox/Frame.io).

---

## 🚀 How to Run & View Locally

You can open the website right away!

### Option 1: Double-click
Simply open `index.html` directly in your favorite web browser (Chrome, Edge, Firefox).

### Option 2: Live Server (Python)
Run a local test server from the folder:
```bash
cd "C:\Users\AYMEN BM\.gemini\antigravity\scratch\video-portfolio"
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## ✏️ How to Customize Your Portfolio

All your portfolio data is separated into a clean, easy-to-edit file:
📁 **`assets/js/projects-data.js`**

Open that file to:
- **Change Name & Bio**: Update `name`, `role`, `tagline`, and `stats`.
- **Add Your Videos**: Add or replace projects in `projects: [...]` with your own YouTube video links or direct MP4 URLs.
- **Update Socials & Email**: Update `socials` with your email, Telegram, Discord, Twitter, and YouTube channel.
- **Customize Services & Rates**: Modify the services list or the base rates in `app.js` if desired.

---

## 🌐 Free Deployment (GitHub Pages / Vercel / Netlify)

Because this website uses clean vanilla HTML, Tailwind CSS CDN, and JavaScript without complex build configurations, you can deploy it in 60 seconds:
- **GitHub Pages**: Push this directory to a GitHub repo and enable GitHub Pages under Settings > Pages.
- **Vercel / Netlify**: Drag-and-drop the `video-portfolio` folder directly onto [vercel.com](https://vercel.com) or [netlify.com](https://app.netlify.com/drop).
