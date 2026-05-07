# Angelo Guitar Co. — Build Tracker
## iPhone App Installation Guide

---

## What You Have

This folder contains 4 things:

```
angelo-guitar-tracker/
├── index.html        ← The complete app
├── manifest.json     ← Tells iPhone "this is an app"
├── sw.js             ← Makes it work offline
└── icons/            ← All app icon sizes
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-167.png
    ├── icon-180.png
    ├── icon-192.png
    └── icon-512.png
```

---

## Step-by-Step: Deploy to GitHub Pages (Free, 10 minutes)

### What you need
- A free GitHub account (github.com)
- This folder of files

---

### Step 1 — Create a GitHub account
Go to **github.com** and sign up for a free account if you don't have one.

---

### Step 2 — Create a new repository

1. Click the **+** button (top right) → **New repository**
2. Repository name: `angelo-guitar-tracker`
3. Set to **Public** *(required for free GitHub Pages)*
4. Check **"Add a README file"**
5. Click **Create repository**

---

### Step 3 — Upload your files

1. On your new repository page, click **"uploading an existing file"** (or drag & drop)
2. Drag ALL files from this folder into the upload area:
   - `index.html`
   - `manifest.json`
   - `sw.js`
3. Click **"Commit changes"**

4. Now upload the icons folder:
   - Click **Add file → Upload files** again
   - Create a folder by typing `icons/` before the filename
   - Upload all 9 PNG files from the icons/ folder
   - Click **Commit changes**

---

### Step 4 — Enable GitHub Pages

1. In your repository, click **Settings** (top menu)
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Branch: **main**, folder: **/ (root)**
5. Click **Save**

⏳ Wait 2–3 minutes. GitHub will show you your URL — it will look like:
```
https://yourusername.github.io/angelo-guitar-tracker/
```

---

### Step 5 — Install on your iPhone

1. **Open Safari** on your iPhone (must be Safari — Chrome won't work for PWA install)
2. Go to your GitHub Pages URL
3. Wait for the app to fully load
4. Tap the **Share button** (the box with an arrow pointing up)
5. Scroll down and tap **"Add to Home Screen"**
6. Name it **"Angelo Guitar"**
7. Tap **Add**

✅ The Angelo Guitar icon now appears on your home screen.
✅ Tap it — it opens fullscreen, no browser bar.
✅ Works completely offline after first load.
✅ All your data saves locally on your iPhone.

---

## Important Notes

### Your data stays on your iPhone
All build records save to your iPhone's local storage — not in a cloud, not in a browser.
They survive app updates. They survive closing the app.

**The only way to lose data:** If you delete the app from your home screen AND clear Safari website data.
→ Use the **Export → Copy to Clipboard** feature regularly to back up to Notes or email.

### Updating the app
When we make improvements to the app:
1. Download the new `index.html`
2. Upload it to your GitHub repository (replaces the old one)
3. The app on your iPhone will update automatically next time you open it with internet

### Using on a Mac / PC
Open the GitHub Pages URL in any browser — the full app works on desktop too.

---

## Optional: Use Your Own Domain

If you have a domain like `angeloguitarco.com`, you can host it at:
`builds.angeloguitarco.com`

In your GitHub Pages settings, there's a "Custom domain" field.
Add a CNAME DNS record pointing to `yourusername.github.io`

---

## Troubleshooting

**"Add to Home Screen" is greyed out?**
→ You must use Safari (not Chrome or Firefox)
→ The page must fully load first

**App opens as a webpage, not fullscreen?**
→ Make sure you used "Add to Home Screen" not just bookmarked it
→ Try deleting and re-adding

**Data disappeared?**
→ Check if you cleared Safari website data in Settings
→ Restore from your JSON backup in the app's Export section

**App not updating after I uploaded new files?**
→ Open the app, go to Settings → there's a note about cache
→ Or: delete and re-add from home screen

---

*Angelo Guitar Co. — Napa, CA*
