# Visual Acuity Chart (Geometric Symbols)

Visual Acuity Chart is a pure client-side web application that generates interactive visual acuity style charts using geometric symbols. It requires no build system, dependencies, or server - just open the HTML file in a modern browser.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Initial Setup and Running
- **NO BUILD STEP REQUIRED** - This is a static web application with zero dependencies
- **Quick Start**: Open `index.html` directly in any modern browser (double-click works for local development)
- **For testing changes**: Use a simple HTTP server to avoid CORS issues:
  ```bash
  python3 -m http.server 8080
  # Then open http://localhost:8080 in browser
  ```
- **TIMING**: Application loads instantly (< 1 second) - no build or compilation time

### Development Workflow
- **Direct file editing**: Make changes directly to HTML, CSS, or JavaScript files
- **No transpilation, bundling, or preprocessing** - what you write is what runs
- **Live reload**: Refresh browser after making file changes to see updates
- **NEVER try to run npm install, build commands, or look for package.json** - they don't exist

### Project Structure
```
.
├── index.html              # Main application file (start here)
├── script.js              # Core application logic (~27KB)
├── styles.css             # All styling and responsive design (~19KB)
├── service-worker.js      # PWA caching logic
├── manifest.webmanifest   # PWA manifest
├── favicon.svg           # Vector icon
├── img/                  # Screenshots and documentation images
├── LICENSE               # CC BY-NC 4.0 license
└── README.md            # Project documentation
```

## Validation Requirements

### **CRITICAL**: Manual Testing Scenarios
After making ANY changes, **ALWAYS** run through these validation scenarios:

1. **Basic Chart Generation** (2-3 minutes):
   - Open application in browser
   - Verify chart displays with 9 rows of geometric symbols
   - Click hamburger menu → "Generate New Random Chart"
   - Verify symbols change and layout remains correct

2. **Timed Mode Complete Flow** (5-7 minutes):
   - Click hamburger menu → "Timed Mode"
   - Verify UI switches to timed mode with pause/correct/wrong buttons
   - Test clicking "Correct" button - symbol should highlight and advance
   - Test clicking "Wrong" button - symbol should advance with feedback
   - Let timer run out (5 seconds) - should auto-advance
   - Click "Stop timed mode" after testing a few symbols
   - Verify results modal displays with statistics and per-row breakdown
   - Click "Close" to return to chart view

3. **Color Schemes** (1-2 minutes):
   - Click hamburger menu → "Toggle Background and Text Colors"
   - Verify cycling through: White→Black→Yellow→Blue backgrounds
   - Verify symbol colors change appropriately (check browser console for "Switched to:" messages)
   - Take screenshot to verify visual changes

4. **Print Layout** (1-2 minutes):
   - Click hamburger menu → "Print Chart"
   - Verify print preview shows proper layout
   - Cancel print dialog

5. **PWA Functionality** (2-3 minutes - CRITICAL):
   - Verify service worker loads without errors in browser dev tools
   - Test offline functionality: Stop HTTP server, refresh page - application should still work
   - Verify all features work offline: chart generation, timed mode, color schemes

### **TIMING EXPECTATIONS** (Validated):
- Application startup: **< 1 second** (confirmed)
- Chart generation: **< 1 second** (confirmed)
- Timed mode transitions: **< 1 second** (confirmed)
- Color scheme changes: **< 1 second** (confirmed)
- Offline functionality: **Immediate** - works without server (confirmed)
- **NEVER CANCEL** manual testing - complete all scenarios each time

## Key Application Features

### Core Functionality
- **Geometric Symbols**: Circle, square, "paprika" shape, and house symbols
- **Symbol Sizing**: 9 rows from 40.0mm down to 1.3mm (print-optimized)
- **Randomization**: Anti-pattern algorithms prevent obvious repetition
- **Responsive Design**: Desktop, tablet, and mobile support
- **Keyboard Navigation**: Arrow keys work in landscape mode

### Timed Mode Details
- **5-second countdown** per symbol with visual indicator
- **Pause/Resume**: Maintains state across pause cycles
- **Answer Tracking**: Correct, wrong, and no-answer statistics
- **Early Termination**: Can stop test early and see partial results
- **Results Breakdown**: Overall statistics plus per-row analysis

### Technical Architecture
- **Pure JavaScript**: No frameworks, libraries, or build tools
- **CSS Grid/Flexbox**: Responsive layout without media query complexity
- **SVG Symbols**: Scalable vector graphics for print quality
- **Progressive Web App**: Installable with offline support
- **Local Storage**: Persists user preferences

## Common Development Tasks

### Adding New Features
1. **Edit files directly** - no compilation step
2. **Test in browser** - refresh to see changes
3. **Validate scenarios** - run through complete testing checklist above
4. **Check browser console** - look for JavaScript errors

### Debugging Issues
1. **Browser Developer Tools**: Use console, network, and elements tabs
2. **Check browser console logs**: Application uses console.log for debugging
3. **Verify file paths**: Ensure relative paths work when served from HTTP server
4. **Test cross-browser**: Chrome, Firefox, Safari, Edge

### Modifying Symbols
- **Symbol definitions**: Located in `script.js` around line 260-300
- **SVG format**: All symbols are inline SVG with `viewBox` and `currentColor` stroke
- **Size constraints**: Maintain aspect ratio for proper scaling across all sizes

### Styling Changes  
- **All CSS in single file**: `styles.css` contains all styling
- **CSS Custom Properties**: Uses CSS variables for theme colors
- **Print styles**: `@page` and `@media print` rules for print optimization
- **Responsive breakpoints**: Uses CSS Container Queries and flexible layouts

## File Descriptions

### `index.html` (~9KB)
- Complete application structure
- Modal dialogs for results, about, disclaimer
- Menu system with hamburger/stop icon states  
- Metadata for PWA and SEO

### `script.js` (~27KB)  
- Chart generation with anti-pattern randomization
- Timed mode state machine and timer logic
- Symbol definitions (SVG strings)
- UI event handlers and responsive behaviors
- Local storage for preferences

### `styles.css` (~19KB)
- Responsive grid layout for chart
- Print optimization with mm-based sizing  
- Color scheme definitions and transitions
- Timed mode UI states and animations
- Mobile-friendly touch interactions

### `service-worker.js` (~2KB)
- Cache-first strategy for offline support
- Asset caching with versioning
- Automatic cleanup of old caches

## Deployment

### GitHub Pages (Current)
- **Auto-deploy**: Pushes to main branch automatically deploy to https://propeltsi.github.io/visual_aquity_chart/
- **No build process**: Static files are served directly
- **Cache invalidation**: Increment `CACHE_NAME` in service-worker.js for PWA updates

### Local Testing
- **File protocol**: `file://` works for basic testing
- **HTTP server recommended**: Prevents CORS issues with service worker
- **Any static server**: Apache, nginx, Python, Node.js, etc. all work

## License and Usage

- **Non-commercial use only**: CC BY-NC 4.0 license
- **Educational/demo purposes**: Classroom, personal learning, research prototypes
- **NOT a medical device**: Include disclaimers for any modifications
- **Attribution required**: Credit "Timo Peltoniemi" in derivative works

## Troubleshooting

### Common Issues
- **Blank page**: Check browser console for JavaScript errors
- **Service worker errors**: Clear browser cache and reload
- **Symbol sizing**: Verify CSS mm units display correctly
- **Touch interactions**: Test on actual mobile device, not just browser dev tools
- **Print layout**: Use "More settings" in browser print dialog, disable "Fit to page"

### Browser Compatibility
- **Minimum requirements**: ES6+ support (Chrome 60+, Firefox 55+, Safari 12+)
- **Features used**: CSS Grid, CSS Custom Properties, SVG, Service Workers
- **Mobile support**: iOS Safari 12+, Android Chrome 60+

## Performance Notes
- **Lightweight**: Total download < 60KB including images
- **Fast rendering**: CSS transforms for animations, minimal DOM manipulation
- **Memory efficient**: Event delegation, minimal object creation in loops
- **Offline capable**: Full functionality available without network after first load