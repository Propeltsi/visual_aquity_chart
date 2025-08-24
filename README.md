# Visual Acuity Chart (Geometric Symbols)

Interactive, self‑contained visual acuity style demo using four simple geometric symbols (circle, square, paprika shape, house). Intended for educational / demonstration and non‑commercial personal use only. Not a medical device.

## 🌐 Live Demo

https://propeltsi.github.io/visual_aquity_chart/

## 🎯 Features

- Geometric symbol set (4 distinct outlines)
- Randomized chart generation (constraints avoid obvious repetition)
- Multiple high‑contrast color schemes (cycle button)
- Timed test mode with per‑symbol countdown & result summary
- Printable layout (uses mm sizing for symbols)
- Responsive: desktop & mobile, touch + keyboard navigation helpers
- No external dependencies (pure HTML/CSS/JS)

## 🖼️ Screenshots

| Main | Timed Mode | Test Results |
|------|------------|--------------|
| ![Main screen](img/Main%20screen.png) | ![Timed mode](img/Timed%20mode.png) | ![Test results modal](img/Test%20results.png) |

| Black / White Theme | Blue / White Theme | Yellow / White Theme |
|---------------------|--------------------|----------------------|
| ![Black & white theme](img/BLACK-WHITE%20theme.png) | ![Blue & white theme](img/BLUE-WHITE%20theme.png) | ![Yellow & white theme](img/YELLOW-WHITE%20theme.png) |

| Mobile Landscape Mode |
|-----------------------|
| ![Mobile landscape mode](img/Mobile%20landscape%20mode.png) |

## 🚀 Quick Start

1. Open `index.html` (or `visual_acuity_chart.html` if retained) in a modern browser (no build step needed)
2. Use the top left menu (hamburger / stop icon) for actions:
   - 🔄 Generate new randomized chart
   - 🎨 Toggle color scheme
   - 🖨️ Print chart
   - ⏱️ Start/stop timed mode
   - ❓ Read the disclaimer/about modal

## ⏱️ Timed Mode

- Highlights one symbol at a time (default 5s per symbol)
- Mark answers: ✓ (correct) or ✗ (wrong); or let timer elapse (no answer)
- Automatic scroll to active symbol
- Pause / resume supported
- Results modal: total correctness, per-row breakdown, early stop note

## 🎨 Color Schemes

1. White background / black stroke
2. Black background / white stroke
3. Yellow background / black stroke
4. Deep blue background / white stroke

## ⚠️ Disclaimer

This tool is for educational and demonstration purposes only.
- Does NOT replace professional eye examinations
- Results are indicative only
- Display size, viewing distance, and ambient light affect perception
- Consult an eye care professional if you notice vision changes

## 🛠️ Technical Notes

- Files:
  - `index.html` (container + modals + controls)
  - `styles.css` (layout, responsive rules, highlight / result classes)
  - `script.js` (generation logic, timed mode state machine, UI handlers)
- Symbol sizing: millimeter units (width/height in mm) for print-friendly scaling
- Randomization rules: avoids immediate duplicates, limits repeated column placements, ensures diversity per row
- Accessibility: high contrast modes; keyboard arrow navigation for landscape scenarios

## 📋 Chart Structure

Nine rows, decreasing symbol size (40.0 mm → 1.3 mm). Each row contains 4–5 symbols. Rows are generated with constraints to reduce pattern predictability (e.g., limited same-column repeats, shuffled order, minimal consecutive duplicates).

## 🎯 Intended Non-Commercial Uses

- Classroom / teaching demos
- Personal experimentation
- Non‑commercial research prototypes
- Open source learning resources

## 🤝 Contributing

Issues and pull requests are welcome. Please keep contributions dependency‑free unless a strong justification exists.

## 📦 Offline Use Tips

Offline:
1. Download or clone the repository
2. Open `index.html` locally (double-click) – no server needed
3. Optional: Add to home screen / install site (Chrome/Edge/Android) for quicker access
4. No external network calls; once opened it works fully offline

Printing:
- Disable print scaling / fit-to-page for more accurate mm sizing
- Verify symbol size with a ruler if precision matters

### PWA / Installable App

This project now includes:
- `manifest.webmanifest` (standalone display, theme & background colors)
- `service-worker.js` (cache-first for core assets, versioned)
- `favicon.svg` (maskable icon)

Install hints:
- Desktop Chrome / Edge: Open site → browser menu → Install App
- Android Chrome: Prompt may appear automatically; or use Add to Home Screen
- iOS Safari: Share → Add to Home Screen (uses apple-touch icon fallback)

Updating cache: Increment `CACHE_NAME` in `service-worker.js` to force refresh. Users get the new version on next load after SW activation.

## 🧩 Favicon

Vector favicon (`favicon.svg`) contains three outline motifs; scales crisply. `apple-touch-icon` falls back to main screenshot.

## 📄 License

Licensed for non‑commercial use under **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**. See `LICENSE` for the full legal text.

Summary (informative only):
- You may use, modify, and share for non‑commercial purposes with attribution ("Timo Peltoniemi")
- You must keep attribution & license notice
- No commercial use without prior written permission (including embedding in paid products/services, ad-monetized deployments, or internal commercial workflows)

For commercial licensing, please contact the author.

Full legal text: `LICENSE`.

## 🇫🇮 Lyhyt huomautus suomeksi

Projekti on ei‑kaupalliseen opetukseen ja demokäyttöön. Ei korvaa ammattilaistutkimusta. Lisenssi: CC BY-NC 4.0.

---

Author: Timo Peltoniemi (2025)# Visual Acuity Chart (Geometric Symbols)

Interactive, self‑contained visual acuity style demo using four simple geometric symbols (circle, square, paprika shape, house). Intended for educational / demonstration and non‑commercial personal use only. Not a medical device.

## � Live Demo

https://propeltsi.github.io/visual_aquity_chart/

## �🎯 Features

- Geometric symbol set (4 distinct outlines)
- Randomized chart generation (constraints avoid obvious repetition)
- Multiple high‑contrast color schemes (cycle button)
- Timed test mode with per‑symbol countdown & result summary
- Printable layout (uses mm sizing for symbols)
- Responsive: desktop & mobile, touch + keyboard navigation helpers
- No external dependencies (pure HTML/CSS/JS)

## 🖼️ Screenshots

| Main | Timed Mode | Test Results |
|------|------------|--------------|
| ![Main screen](img/Main%20screen.png) | ![Timed mode](img/Timed%20mode.png) | ![Test results modal](img/Test%20results.png) |

| Black / White Theme | Blue / White Theme | Yellow / White Theme |
|---------------------|--------------------|----------------------|
| ![Black & white theme](img/BLACK-WHITE%20theme.png) | ![Blue & white theme](img/BLUE-WHITE%20theme.png) | ![Yellow & white theme](img/YELLOW-WHITE%20theme.png) |

| Mobile Landscape Mode |
|-----------------------|
| ![Mobile landscape mode](img/Mobile%20landscape%20mode.png) |

## � Quick Start

1. Open `visual_acuity_chart.html` in a modern browser (no build step needed)
2. Use the top left menu (hamburger / stop icon) for actions:
   - 🔄 Generate new randomized chart
   - 🎨 Toggle color scheme
   - 🖨️ Print chart
   - ⏱️ Start/stop timed mode
   - ❓ Read the disclaimer/about modal

## ⏱️ Timed Mode

- Highlights one symbol at a time (default 5s per symbol)
- Mark answers: ✓ (correct) or ✗ (wrong); or let timer elapse (no answer)
- Automatic scroll to active symbol
- Pause / resume supported
- Results modal: total correctness, per-row breakdown, early stop note

## 🎨 Color Schemes

1. White background / black stroke
2. Black background / white stroke
3. Yellow background / black stroke
4. Deep blue background / white stroke

## ⚠️ Disclaimer

This tool is for educational and demonstration purposes only.
- Does NOT replace professional eye examinations
- Results are indicative only
- Display size, viewing distance, and ambient light affect perception
- Consult an eye care professional if you notice vision changes

## 🛠️ Technical Notes

- Files:
  - `visual_acuity_chart.html` (container + modals + controls)
  - `styles.css` (layout, responsive rules, highlight / result classes)
  - `script.js` (generation logic, timed mode state machine, UI handlers)
- Symbol sizing: millimeter units (width/height in mm) for print-friendly scaling
- Randomization rules: avoids immediate duplicates, limits repeated column placements, ensures diversity per row
- Accessibility considerations: high contrast modes; keyboard arrow navigation for landscape scenarios

## 📋 Chart Structure

Nine rows, decreasing symbol size (40.0 mm → 1.3 mm). Each row contains 4–5 symbols. Rows are generated with constraints to reduce pattern predictability (e.g., limited same-column repeats, shuffled order, minimal consecutive duplicates).

## 🎯 Intended Non-Commercial Uses

- Classroom / teaching demos
- Personal experimentation
- Non‑commercial research prototypes
- Open source learning resources

## 🤝 Contributing

Issues and pull requests are welcome. Please keep contributions dependency‑free unless a strong justification exists.

## 📄 License

Licensed for non‑commercial use under **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**. See `LICENSE` for the full legal text.

Summary (informative only):
- You may use, modify, and share for non‑commercial purposes with attribution ("Timo Peltoniemi")
- You must keep attribution & license notice
- No commercial use without prior written permission (including embedding in paid products/services, ad-monetized deployments, or internal commercial workflows)

For commercial licensing, please contact the author.

Full legal text: `LICENSE`.

## 🇫🇮 Lyhyt huomautus suomeksi

Projekti on ei‑kaupalliseen opetukseen ja demokäyttöön. Ei korvaa ammattilaistutkimusta. Lisenssi: CC BY-NC 4.0.

---

Author: Timo Peltoniemi (2025)
