# FocusTrack

Minimal freelance timer — track projects and objectives from any tab.

---

## 📁 File Structure

```
focustrack-extension/
├── manifest.json       # Chrome extension config
├── popup.html          # Minimal popup (timer only)
├── index.html          # Full web app
├── background.js       # Service worker
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

---

## 🚀 Step 1 — Deploy Web App to GitHub Pages

1. Create a new GitHub repo called `focustrack`
2. Upload all files in this folder to the repo root
3. Go to **Settings → Pages → Source → main branch → / (root)**
4. Your app will be live at: `https://YOUR-USERNAME.github.io/focustrack/`

5. Open `popup.html` and replace this line:
   ```js
   const APP_URL = 'https://YOUR-USERNAME.github.io/focustrack/';
   ```
   with your actual GitHub Pages URL.

---

## 🔧 Step 2 — Install Chrome Extension (Developer Mode)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select this entire `focustrack-extension` folder
5. The FocusTrack icon appears in your toolbar — pin it for easy access

---

## ⚡ How It Works

- **Popup** — click the toolbar icon from any tab to see your active countdown, pause/resume, or mark complete
- **Full App** — click "Open App ↗" in the popup to open the full app with Projects, History, and Analytics
- **Shared data** — popup and web app share the same storage, always in sync

---

## ⌨️ Keyboard Shortcuts (Web App)

| Key | Action |
|-----|--------|
| `Space` | Play / Pause timer |
| `R` | Reset timer |

---

## 🔮 Coming Soon

- Cloud sync (Supabase backend)
- Browser notifications when time is up
- Weekly email digest

