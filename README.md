# FocusTrack

Minimal freelance timer — track projects and objectives from any tab.

---

## 📁 File Structure

```
focustrack/
├── manifest.json       # Chrome extension config
├── popup.html          # Minimal popup (timer only)
├── index.html          # Full web app
├── background.js       # Service worker
├── icons/              # Extension icons
└── README.md
```

---

## 🚀 Step 1 — Deploy Web App to GitHub Pages

1. Go to your GitHub repo settings for `focustrack`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select the **main** branch and the **/(root)** folder, then click **Save**.
5. Your app will be live at: `https://Collins-01.github.io/focustrack/`

*Note: The `popup.html` has already been updated with this URL.*

---

## 🔧 Step 2 — Install Chrome Extension (Developer Mode)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the local `focustrack` folder (this repository folder)
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

