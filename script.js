// Color schemes with maximum contrast
const colorSchemes = [
  {
    name: "White Background",
    background: "#ffffff",
    text: "#000000",
    stroke: "#000000",
  },
  {
    name: "Black Background",
    background: "#000000",
    text: "#ffffff",
    stroke: "#ffffff",
  },
  {
    name: "Yellow Background",
    background: "#ffff00",
    text: "#000000",
    stroke: "#000000",
  },
  {
    name: "Blue Background",
    background: "#003366",
    text: "#ffffff",
    stroke: "#ffffff",
  },
];

let currentColorScheme = 0;
let menuOpen = false;

// Timed mode variables
let timedModeActive = false;
let timedModePaused = false;
let currentSymbolIndex = 0;
let allSymbols = [];
let timedModeResults = [];
let symbolTimer = null;
let countdownTimer = null;
let currentCountdown = 5; // seconds per symbol
let awaitingAnswer = false;

// Function to toggle menu
function toggleMenu() {
  // If in timed mode, clicking hamburger stops the timed mode
  if (timedModeActive) {
    stopTimedMode();
    return;
  }

  const controls = document.getElementById("controls");
  menuOpen = !menuOpen;

  if (menuOpen) {
    controls.classList.add("open");
  } else {
    controls.classList.remove("open");
  }
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const controls = document.getElementById("controls");
  if (!controls.contains(event.target) && menuOpen) {
    toggleMenu();
  }
});

// Function to toggle color schemes
function toggleColors() {
  currentColorScheme = (currentColorScheme + 1) % colorSchemes.length;
  const scheme = colorSchemes[currentColorScheme];

  // Apply colors to body
  document.body.style.background = scheme.background;
  document.body.style.color = scheme.text;

  // Apply colors to all symbols
  const symbols = document.querySelectorAll(".symbol");
  symbols.forEach((symbol) => {
    symbol.style.color = scheme.stroke;
  });

  // Update title color
  const title = document.querySelector(".title");
  if (title) {
    title.style.color = scheme.text;
  }

  // Update footer color
  const footer = document.querySelector(".footer");
  if (footer) {
    footer.style.color = scheme.text;
  }

  // Update row labels color
  const rowLabels = document.querySelectorAll(".row-label, .row-label-top");
  rowLabels.forEach((label) => {
    label.style.color = scheme.text;
    if (label.classList.contains("row-label-top")) {
      label.style.background = scheme.background;
    }
  });

  console.log(`Switched to: ${scheme.name}`);
}

// Symbol SVG templates
const symbols = {
  circle: `<svg class="symbol" viewBox="0 0 126 126" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
        <g transform="matrix(1,0,0,1,-528.814,-29.3988)">
            <circle cx="591.339" cy="91.924" r="53.858" style="fill:none;stroke:currentColor;stroke-width:17.33px;"/>
        </g>
    </svg>`,

  rectangle: `<svg class="symbol" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
        <g transform="matrix(1.03012,0,0,1.05322,-33.895,-39.8549)">
            <rect x="41.317" y="46.07" width="99.347" height="97.033" style="fill:none;stroke:currentColor;stroke-width:16.64px;"/>
        </g>
    </svg>`,

  paprika: `<svg class="symbol" viewBox="0 0 123 123" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
        <g transform="matrix(1.03016,0,0,1.01599,-787.206,-35.9424)">
            <path d="M808.242,145.687C795.883,150.633 784.505,136.071 777.005,111.904C774.325,103.27 764.398,73.655 784.615,64.632C801.687,57.012 810.053,72.718 821.878,69.832C832.217,67.308 837.157,52.891 856.428,56.31C868.025,58.368 881.648,73.015 870.581,109.22C858.685,148.136 841.583,146.443 837.837,145.29C829.95,142.864 819.012,141.378 808.242,145.687Z" style="fill:none;stroke:currentColor;stroke-width:16.94px;stroke-linecap:round;"/>
        </g>
        <path d="M59.458,35.006C59.102,33.414 45.635,9.6 64.715,8.983" style="fill:none;stroke:currentColor;stroke-width:17.33px;stroke-linecap:round;"/>
    </svg>`,

  house: `<svg class="symbol" viewBox="0 0 149 149" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:5;">
        <g transform="matrix(1.1,0,0,1.18,-5,-1)">
            <path d="M119.956,118.339L119.956,74.153L119.81,40.78L119.956,118.339ZM141.739,54.789L73.972,11.499L141.739,54.789ZM27.942,118.339L27.942,74.153L28.087,40.78L27.942,118.339ZM6.158,54.789L73.972,11.499L6.158,54.789ZM27.942,118.339L119.956,118.339" style="fill:none;stroke:currentColor;stroke-width:17.33px;stroke-linecap:round;stroke-linejoin:round;"/>
        </g>
    </svg>`,
};

// Chart configuration - rows with sizes and symbol counts
const chartConfig = [
  { size: 40.0, count: 4, label: "40.0 mm" },
  { size: 26.0, count: 5, label: "26.0 mm" },
  { size: 16.9, count: 5, label: "16.9 mm" },
  { size: 11.0, count: 5, label: "11.0 mm" },
  { size: 7.1, count: 5, label: "7.1 mm" },
  { size: 4.6, count: 5, label: "4.6 mm" },
  { size: 3.0, count: 5, label: "3.0 mm" },
  { size: 2.0, count: 5, label: "2.0 mm" },
  { size: 1.3, count: 5, label: "1.3 mm" },
];

// Utility function to shuffle array
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate random symbols for a row (all symbols at least once, no consecutive duplicates)
function generateRowSymbols(count) {
  const symbolKeys = Object.keys(symbols);

  if (count === 4) {
    // For 4 symbols: exactly one of each
    let rowSymbols = [...symbolKeys];
    rowSymbols = shuffle(rowSymbols);

    // Check for consecutive duplicates and fix if needed
    for (let i = 1; i < rowSymbols.length; i++) {
      if (rowSymbols[i] === rowSymbols[i - 1]) {
        // Find a different symbol to swap with
        for (let j = 0; j < rowSymbols.length; j++) {
          if (
            j !== i &&
            j !== i - 1 &&
            rowSymbols[j] !== rowSymbols[i - 1] &&
            (j === rowSymbols.length - 1 || rowSymbols[j] !== rowSymbols[j + 1])
          ) {
            [rowSymbols[i], rowSymbols[j]] = [rowSymbols[j], rowSymbols[i]];
            break;
          }
        }
      }
    }

    return rowSymbols;
  } else if (count === 5) {
    // For 5 symbols: all 4 different symbols plus one random
    let rowSymbols = [...symbolKeys];
    const extraSymbol =
      symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
    rowSymbols.push(extraSymbol);
    rowSymbols = shuffle(rowSymbols);

    // Check and fix consecutive duplicates
    let attempts = 0;
    while (attempts < 50) {
      let hasConsecutive = false;
      for (let i = 1; i < rowSymbols.length; i++) {
        if (rowSymbols[i] === rowSymbols[i - 1]) {
          hasConsecutive = true;
          // Try to swap with another position
          for (let j = 0; j < rowSymbols.length; j++) {
            if (
              j !== i &&
              j !== i - 1 &&
              rowSymbols[j] !== rowSymbols[i - 1] &&
              (j === 0 || rowSymbols[j] !== rowSymbols[j - 1]) &&
              (j === rowSymbols.length - 1 ||
                rowSymbols[j] !== rowSymbols[j + 1])
            ) {
              [rowSymbols[i], rowSymbols[j]] = [rowSymbols[j], rowSymbols[i]];
              break;
            }
          }
          break;
        }
      }
      if (!hasConsecutive) break;
      attempts++;
    }

    return rowSymbols;
  } else {
    // For other counts: original logic
    const rowSymbols = [];

    for (let i = 0; i < count; i++) {
      let randomSymbol;
      let attempts = 0;

      do {
        randomSymbol =
          symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
        attempts++;
        if (attempts > 20) break;
      } while (i > 0 && randomSymbol === rowSymbols[i - 1]);

      rowSymbols.push(randomSymbol);
    }

    return rowSymbols;
  }
}

// Create an SVG with specific size and stroke width
function createSizedSymbol(symbolType, size) {
  const strokeWidth = size * 0.2; // 20% of size for stroke width
  const currentScheme = colorSchemes[currentColorScheme];
  let svg = symbols[symbolType];

  // Set size, stroke width and color
  svg = svg.replace(
    'class="symbol"',
    `class="symbol" width="${size}mm" height="${size}mm" style="stroke-width:${strokeWidth}px; color:${currentScheme.stroke}"`
  );

  return svg;
}

// Generate the complete chart
function generateChart() {
  const chartContent = document.getElementById("chart-content");
  let html = "";
  let previousRowSymbols = null;

  chartConfig.forEach((config, rowIndex) => {
    let rowSymbols;
    let attempts = 0;

    // Generate symbols with additional constraints
    do {
      rowSymbols = generateRowSymbols(config.count);
      attempts++;

      if (
        previousRowSymbols &&
        rowSymbols.length >= 3 &&
        previousRowSymbols.length >= 3
      ) {
        // Check if first symbol is the same as in previous row
        if (rowSymbols[0] === previousRowSymbols[0]) {
          continue;
        }

        // Check if positions 1 and 3 are the same as in previous row
        const currentPair = [rowSymbols[0], rowSymbols[2]];
        const previousPair = [previousRowSymbols[0], previousRowSymbols[2]];

        if (
          currentPair[0] === previousPair[0] &&
          currentPair[1] === previousPair[1]
        ) {
          continue;
        }

        // Check that at most one symbol is in the same column as previous row
        let sameColumnCount = 0;
        const minLength = Math.min(
          rowSymbols.length,
          previousRowSymbols.length
        );

        for (let i = 0; i < minLength; i++) {
          if (rowSymbols[i] === previousRowSymbols[i]) {
            sameColumnCount++;
          }
        }

        if (sameColumnCount > 1) {
          continue;
        }
      }
      break;
    } while (attempts < 100);

    html += `
            <div class="row">
                <div class="row-label">${config.label}</div>
                <div class="row-label-top">${config.label}</div>
                <div class="row-line"></div>
        `;

    rowSymbols.forEach((symbolType) => {
      html += createSizedSymbol(symbolType, config.size);
    });

    html += "</div>";
    previousRowSymbols = rowSymbols;
  });

  chartContent.innerHTML = html;
}

// Function to generate new chart (for button)
function generateNewChart() {
  generateChart();
  // Apply current color scheme to new symbols
  if (currentColorScheme > 0) {
    const scheme = colorSchemes[currentColorScheme];
    const symbols = document.querySelectorAll(".symbol");
    symbols.forEach((symbol) => {
      symbol.style.color = scheme.stroke;
    });
  }
}

// Timed mode functions
function toggleTimedMode() {
  if (timedModeActive) {
    stopTimedMode();
  } else {
    startTimedMode();
  }
}

function startTimedMode() {
  console.log("Starting timed mode");

  // Close menu first
  if (menuOpen) {
    toggleMenu();
  }

  timedModeActive = true;
  timedModePaused = false;
  currentSymbolIndex = 0;
  timedModeResults = [];
  awaitingAnswer = false;

  // Get all symbols from the chart
  allSymbols = Array.from(document.querySelectorAll(".symbol"));
  console.log("Found symbols:", allSymbols.length);

  if (allSymbols.length === 0) {
    alert("Please generate a visual acuity chart before starting timed mode.");
    return;
  }

  // Clear any previous answer feedback
  allSymbols.forEach((symbol) => {
    symbol.classList.remove("symbol-correct", "symbol-wrong", "symbol-missed", "current-symbol");
    // Remove any existing arrows
    const existingArrow = symbol.querySelector(".symbol-arrow");
    if (existingArrow) {
      existingArrow.remove();
    }
  });

  // Update UI for timed mode
  updateTimedModeUI();

  // Show timed mode UI
  document.body.classList.add("timed-mode-active");
  document.getElementById("timedInfo").classList.add("visible");

  console.log("Starting first symbol highlight");
  highlightNextSymbol();
}

function stopTimedMode() {
  timedModeActive = false;
  timedModePaused = false;
  awaitingAnswer = false;

  // Clear timers
  if (symbolTimer) {
    clearTimeout(symbolTimer);
    symbolTimer = null;
  }
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }

  // Update UI back to normal
  updateTimedModeUI();

  // Hide timed mode UI
  document.body.classList.remove("timed-mode-active");
  document.getElementById("timedInfo").classList.remove("visible");

  // Try to hide timedControls only if it exists
  const timedControls = document.getElementById("timedControls");
  if (timedControls) {
    timedControls.classList.remove("visible");
  }

  // Remove all highlights and answer feedback
  if (allSymbols && allSymbols.length > 0) {
    allSymbols.forEach((symbol) => {
      symbol.classList.remove("symbol-correct", "symbol-wrong", "symbol-missed", "current-symbol");
      // Remove any existing arrows
      const existingArrow = symbol.querySelector(".symbol-arrow");
      if (existingArrow) {
        existingArrow.remove();
      }
    });
  }

  // Always show results when stopping timed mode, even if no answers were recorded
  showResults();
}

// New function to handle pause/resume
function toggleTimedPause() {
  if (!timedModeActive) return;

  timedModePaused = !timedModePaused;

  if (timedModePaused) {
    // Pause: clear countdown timer
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  } else {
    // Resume: restart countdown with remaining time
    if (awaitingAnswer) {
      countdownTimer = setInterval(() => {
        currentCountdown--;
        updateCountdownDisplay();

        if (currentCountdown <= 0) {
          // Auto-move to next if no answer given
          console.log("Timeout, auto-recording null answer");
          recordAnswer(null); // null = no answer
        }
      }, 1000);
    }
  }

  // Update pause button appearance
  updatePauseButton();
}

// Function to update the UI when entering/exiting timed mode
function updateTimedModeUI() {
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const stopIcon = document.getElementById("stopIcon");
  const settingsButton = document.querySelector(".settings-button");

  // Get all regular menu items and timed mode buttons
  const regularMenuItems = document.querySelectorAll(
    ".menu-item:not(.timed-pause-button):not(.timed-correct-button):not(.timed-wrong-button)"
  );
  const timedModeButtons = document.querySelectorAll(
    ".timed-pause-button, .timed-correct-button, .timed-wrong-button"
  );

  if (timedModeActive) {
    // Switch to stop mode
    hamburgerIcon.style.display = "none";
    stopIcon.style.display = "block";
    settingsButton.classList.add("stop-mode");
    settingsButton.title = "Stop timed mode";

    // Hide regular menu items
    regularMenuItems.forEach((item) => {
      item.style.display = "none";
    });

    // Show timed mode buttons
    timedModeButtons.forEach((item) => {
      item.style.display = "flex";
    });

    // Open the menu to show timed mode controls
    const controls = document.getElementById("controls");
    controls.classList.add("open");
    menuOpen = true;
  } else {
    // Switch back to hamburger mode
    hamburgerIcon.style.display = "block";
    stopIcon.style.display = "none";
    settingsButton.classList.remove("stop-mode");
    settingsButton.title = "Settings";

    // Show regular menu items
    regularMenuItems.forEach((item) => {
      item.style.display = "flex";
    });

    // Hide timed mode buttons
    timedModeButtons.forEach((item) => {
      item.style.display = "none";
    });

    // Close the menu
    const controls = document.getElementById("controls");
    controls.classList.remove("open");
    menuOpen = false;
  }
}

// Function to update pause button appearance
function updatePauseButton() {
  const pauseIcon = document.querySelector(".pause-icon");
  const playIcon = document.querySelector(".play-icon");
  const pauseButton = document.querySelector(".timed-pause-button");

  if (timedModePaused) {
    pauseIcon.style.display = "none";
    playIcon.style.display = "block";
    pauseButton.title = "Resume";
  } else {
    pauseIcon.style.display = "block";
    playIcon.style.display = "none";
    pauseButton.title = "Pause";
  }
}

function highlightNextSymbol() {
  console.log(
    "highlightNextSymbol called, index:",
    currentSymbolIndex,
    "total:",
    allSymbols.length
  );

  if (!timedModeActive || currentSymbolIndex >= allSymbols.length) {
    console.log("Stopping timed mode");
    stopTimedMode();
    return;
  }

  // Remove previous arrows and current symbol class
  allSymbols.forEach((symbol) => {
    const existingArrow = symbol.querySelector(".symbol-arrow");
    if (existingArrow) {
      existingArrow.remove();
    }
    symbol.classList.remove("current-symbol");
  });

  // Add arrow to current symbol and mark as current
  const currentSymbol = allSymbols[currentSymbolIndex];
  const arrow = document.createElement("div");
  arrow.className = "symbol-arrow";
  currentSymbol.appendChild(arrow);
  currentSymbol.classList.add("current-symbol");
  console.log("Highlighted symbol:", currentSymbolIndex);

  // Scroll behavior: in landscape snap mode scroll entire row to top; otherwise minimal movement centering symbol only if needed
  const landscapeSnap = window.matchMedia(
    "(orientation: landscape) and (max-height: 600px)"
  ).matches;
  if (landscapeSnap) {
    const row = currentSymbol.closest(".row");
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    try {
      const rect = currentSymbol.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const topSafe = 90; // space for controls + pill
      const bottomSafe = 40; // footer margin allowance
      const needsScroll =
        rect.top < topSafe || rect.bottom > viewH - bottomSafe;
      if (needsScroll) {
        const targetY =
          window.scrollY + rect.top - (viewH / 2 - rect.height / 2) - 10;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    } catch (e) {
      currentSymbol.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Update UI
  updateTimedModeInfo();

  awaitingAnswer = true;
  console.log("Now awaiting answer");

  // Start countdown
  currentCountdown = 5;
  updateCountdownDisplay();

  // Only start countdown timer if not paused
  if (!timedModePaused) {
    countdownTimer = setInterval(() => {
      currentCountdown--;
      updateCountdownDisplay();

      if (currentCountdown <= 0) {
        // Auto-move to next if no answer given
        console.log("Timeout, auto-recording null answer");
        recordAnswer(null); // null = no answer
      }
    }, 1000);
  }
}

function updateTimedModeInfo() {
  const counter = document.getElementById("symbolCounter");
  const timer = document.getElementById("timerDisplay");

  counter.textContent = `Symbol ${currentSymbolIndex + 1}/${allSymbols.length}`;
}

function updateCountdownDisplay() {
  const timer = document.getElementById("timerDisplay");
  timer.textContent = `${currentCountdown}s`;
}

function recordAnswer(isCorrect) {
  console.log("recordAnswer called with:", isCorrect);

  if (!awaitingAnswer) {
    console.log("Not awaiting answer, ignoring click");
    return;
  }

  console.log("Recording answer for symbol:", currentSymbolIndex);
  awaitingAnswer = false;

  // Clear countdown timer
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }

  // Get current symbol and add visual feedback
  const currentSymbol = allSymbols[currentSymbolIndex];

  // Remove arrow and current symbol class
  const existingArrow = currentSymbol.querySelector(".symbol-arrow");
  if (existingArrow) {
    existingArrow.remove();
  }
  currentSymbol.classList.remove("current-symbol");

  // Add answer feedback visual style
  if (isCorrect === true) {
    currentSymbol.classList.add("symbol-correct");
  } else if (isCorrect === false) {
    currentSymbol.classList.add("symbol-wrong");
  } else {
    // null (no answer) - missed
    currentSymbol.classList.add("symbol-missed");
  }

  // Record the answer
  timedModeResults.push({
    symbolIndex: currentSymbolIndex,
    answer: isCorrect,
    symbol: allSymbols[currentSymbolIndex].cloneNode(true).outerHTML,
  });

  // Move to next symbol after brief delay to show the feedback
  currentSymbolIndex++;
  setTimeout(() => {
    highlightNextSymbol();
  }, 800); // Increased delay to show feedback longer
}

function showResults() {
  const modal = document.getElementById("resultsModal");
  const stats = document.getElementById("resultsStats");

  if (!modal || !stats) {
    console.error("Modal or stats element not found!");
    return;
  }

  const correct = timedModeResults.filter((r) => r.answer === true).length;
  const wrong = timedModeResults.filter((r) => r.answer === false).length;
  const noAnswer = timedModeResults.filter((r) => r.answer === null).length;
  const total = timedModeResults.length;
  const totalSymbols = allSymbols ? allSymbols.length : 0;

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Check if test was stopped early (only if allSymbols is defined)
  const wasStoppedEarly = totalSymbols > 0 && total < totalSymbols;
  const earlyStopMessage = wasStoppedEarly
    ? `<p><em>Test was stopped early. Tested ${total}/${totalSymbols} symbols.</em></p>`
    : totalSymbols === 0
    ? `<p><em>Test was stopped before any symbols were tested.</em></p>`
    : "";

  // Calculate results by row height
  const rowResults = calculateRowResults();

  let rowResultsHTML = "";
  if (rowResults.length > 0) {
    rowResultsHTML = `
      <div class="row-results">
        <h3>Results by row size:</h3>
        ${rowResults
          .map(
            (row) => `
          <div class="row-result">
            <span class="row-label-result">${row.label}:</span>
            <div class="answer-boxes">
              ${row.answerBoxes
                .map((boxClass) => `<div class="answer-box ${boxClass}"></div>`)
                .join("")}
            </div>
            <span class="row-summary">${row.correct}/${row.total} (${
              row.percentage
            }%)</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  const totalText =
    totalSymbols > 0
      ? `${correct}/${total}`
      : total === 0
      ? "0/0"
      : `${correct}/${total}`;

  stats.innerHTML = `
        <div class="results-stats">
            ${earlyStopMessage}
            <p><strong>Total score:</strong> ${totalText} (${percentage}%)</p>
            <p><strong>Wrong answers:</strong> ${wrong}</p>
            <p><strong>No answer:</strong> ${noAnswer}</p>
            ${rowResultsHTML}
        </div>
    `;

  modal.classList.add("visible");
}

function calculateRowResults() {
  const rowResults = [];
  let symbolIndex = 0;

  chartConfig.forEach((config, rowIndex) => {
    const rowStartIndex = symbolIndex;
    const rowEndIndex = symbolIndex + config.count - 1;

    // Filter results for this row
    const rowAnswers = timedModeResults.filter(
      (result) =>
        result.symbolIndex >= rowStartIndex && result.symbolIndex <= rowEndIndex
    );

    const rowCorrect = rowAnswers.filter((r) => r.answer === true).length;
    const rowTotal = rowAnswers.length;
    const rowPercentage =
      rowTotal > 0 ? Math.round((rowCorrect / rowTotal) * 100) : 0;

    if (rowTotal > 0) {
      // Create individual answer boxes for visualization
      const answerBoxes = [];

      // Sort answers by symbolIndex to maintain order
      const sortedAnswers = rowAnswers.sort(
        (a, b) => a.symbolIndex - b.symbolIndex
      );

      sortedAnswers.forEach((result) => {
        let boxClass = "";
        if (result.answer === true) {
          boxClass = "answer-box-correct";
        } else if (result.answer === false) {
          boxClass = "answer-box-wrong";
        } else {
          boxClass = "answer-box-skipped";
        }
        answerBoxes.push(boxClass);
      });

      rowResults.push({
        label: config.label,
        correct: rowCorrect,
        total: rowTotal,
        percentage: rowPercentage,
        answerBoxes: answerBoxes,
      });
    }

    symbolIndex += config.count;
  });

  return rowResults;
}

function closeResults() {
  document.getElementById("resultsModal").classList.remove("visible");
}

function restartTimedMode() {
  closeResults();
  startTimedMode();
}

// Back to top via menu button
function scrollToTopFromMenu() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (menuOpen) toggleMenu();
}

// Removed legacy JS sticky scroll (replaced by pure CSS scroll-snap in styles.css)
// Lightweight enhancement: keyboard & swipe navigation for landscape low-height mode
function enhanceLandscapeNavigation() {
  if (
    !window.matchMedia("(orientation: landscape) and (max-height: 600px)")
      .matches
  )
    return;
  const rows = Array.from(document.querySelectorAll(".row"));
  if (!rows.length) return;

  // Keyboard arrows / PageUp / PageDown
  const keyHandler = (e) => {
    const keysNext = ["ArrowDown", "PageDown", "ArrowRight"];
    const keysPrev = ["ArrowUp", "PageUp", "ArrowLeft"];
    if (![...keysNext, ...keysPrev].includes(e.key)) return;
    e.preventDefault();
    const scrollY = window.scrollY;
    // Find closest row top
    let closestIndex = 0;
    let minDelta = Infinity;
    rows.forEach((r, i) => {
      const top = r.getBoundingClientRect().top + window.scrollY;
      const d = Math.abs(top - scrollY);
      if (d < minDelta) {
        minDelta = d;
        closestIndex = i;
      }
    });
    let target = closestIndex + (keysNext.includes(e.key) ? 1 : -1);
    target = Math.max(0, Math.min(rows.length - 1, target));
    rows[target].scrollIntoView({ behavior: "smooth", block: "start" });
  };
  document.addEventListener("keydown", keyHandler);

  // Basic vertical swipe detection
  let touchStartY = null;
  let touchStartTime = 0;
  window.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }
  });
  window.addEventListener("touchend", (e) => {
    if (touchStartY == null) return;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const dt = Date.now() - touchStartTime;
    if (Math.abs(dy) > 50 && dt < 800) {
      const direction = dy < 0 ? 1 : -1; // swipe up -> next row
      const scrollY = window.scrollY;
      let closestIndex = 0;
      let minDelta = Infinity;
      rows.forEach((r, i) => {
        const top = r.getBoundingClientRect().top + window.scrollY;
        const d = Math.abs(top - scrollY);
        if (d < minDelta) {
          minDelta = d;
          closestIndex = i;
        }
      });
      let target = Math.max(
        0,
        Math.min(rows.length - 1, closestIndex + direction)
      );
      rows[target].scrollIntoView({ behavior: "smooth", block: "start" });
    }
    touchStartY = null;
  });
}

// Generate initial chart when page loads
document.addEventListener("DOMContentLoaded", function () {
  generateChart();
  enhanceLandscapeNavigation();
});
