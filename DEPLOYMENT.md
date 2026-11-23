# Free Hosting & Deployment Guide

This KTU Question Papers & Notes Portal is built using **Zero-Dependency Modern Web Standards (HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript)**. 

Because there is **no heavy backend or database required** (it uses client-side state and instant browser `localStorage`), you can host it **100% FREE forever** on any of the leading static hosting providers with **super-smooth, lightning-fast edge CDN delivery**.

---

## Option 1: GitHub Pages (100% Free Forever) — Recommended

### Steps:
1. Initialize a git repository and push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of KTU Notes & Question Papers Portal"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
2. On GitHub, go to your repository **Settings** → **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and root folder `/` (root), then click **Save**.
4. In about 30 seconds, your site will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## Option 2: Netlify (Drag & Drop — No Git Required)

1. Go to [https://app.netlify.com](https://app.netlify.com) and sign up for a free account.
2. Go to the **Sites** tab and scroll to **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**.
3. Drag the entire project folder (`Question Papers Web by elecsta`) directly into the browser.
4. Your website is deployed instantly with a free HTTPS `.netlify.app` URL and free SSL certificate!

---

## Option 3: Vercel (Fast Global Edge Network)

### Using Vercel CLI:
```bash
npm install -g vercel
vercel
```
Follow the prompts (accept defaults by pressing Enter).

### Or via Vercel Web Dashboard:
1. Push your code to GitHub.
2. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository and click **Deploy**.
4. Your website will be live worldwide in under 15 seconds.

---

## Option 4: Cloudflare Pages (Unlimited Free Bandwidth)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Compute (Workers & Pages)** → **Pages**.
2. Connect your GitHub repository.
3. Set build configuration:
   - **Framework preset**: None / Static HTML
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
4. Click **Save and Deploy**.

---

## Adding More Subjects & Question Papers

All KTU curriculum data, schemes, course codes, syllabus modules, and papers are organized in [`js/data.js`](file:///d:/Ashik/Question%20Papers%20Web%20by%20elecsta/js/data.js).

To add a new subject, simply append a new object to the `subjects` array in `js/data.js`:

```javascript
{
  id: "cst304",
  code: "CST 304",
  name: "Computational Complexity",
  branch: ["CS", "IT"],
  sem: "S6",
  schemes: ["2024", "2019"],
  credits: 4,
  category: "Program Core",
  verified: true,
  modules: [ ... ],
  pyqs: [
    { year: "2024", session: "June Regular", solved: true, solutionKey: "Official Solved Key", type: "Regular", size: "2.5 MB", downloads: 1200 }
  ],
  notes: [ ... ]
}
```

---

## Key Features Included:
- **Instant Client-Side Filtering**: Schemes (2024, 2019, 2015), Branches (CSE, AI/DS, ECE, EEE, ME, CE, IT, CHE), Semesters (S1 to S8).
- **Authentic KTU Examination Viewer**: Interactive modal reproducing the real APJ KTU exam format with Zoom in/out, Fullscreen, Print, and Download.
- **Global Command Palette**: Press `Ctrl + K` (or `Cmd + K` on Mac) anywhere for instant subject & code search.
- **Offline / LocalStorage Library**: Bookmark question papers and notes to access them anytime without re-searching.
- **KTU SGPA / CGPA Grade Calculator**: Calculate semester grade points based on official KTU marks & credit scale.
