// ==========================================
// UI CONFIGURATION - CHANGE VALUES HERE
// All positions, sizes, and spacing for UI elements
// ==========================================

export const UI_CONFIG = {
  // ==========================================
  // SCORE DISPLAY (Top banh chung icons)
  scoreDisplay: {
    scale: 1.0, // Multiplier for all size values in this section
    paddingTop: 16, // pixels - top padding (pt-4)
    paddingBottom: 8, // pixels - bottom padding (pb-2)
    iconSize: 40, // pixels - banh chung icon width/height
    iconGap: 8, // pixels - gap between icons (gap-2)
  },

  // QUESTION BOX
  // ==========================================
  questionBox: {
    scale: 1.0,
    minHeight: 140,
    height: 250,
    useFixedHeight: true,
    containerPaddingX: 8,
    containerPaddingY: 0,
    marginBottom: 6,
    innerPaddingX: 6,
    innerPaddingTop: 70,
    innerPaddingBottom: 0,
    framePaddingX: 10,
    fontSize: 0.95,
    fontSizeUnit: "rem" as "px" | "rem",
    fontFamily: "'Medium SF Compact Rounded', 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    textAlign: "justify" as "left" | "center" | "right" | "justify",
    textColor: "#4a2c00",
    imageMaxWidth: 200,
    imageGap: 10,
    maxContentHeight: 120,
    scrollbarWidth: 4,
    scrollbarColor: "#c4a484",
    scrollbarTrackColor: "transparent",
  },

  // ==========================================
  // ANSWER BUTTONS
  answerButtons: {
    scale: 1.0, // Multiplier for all size values in this section
    // Fixed dimensions for answer container
    width: 460, // pixels - fixed width for answer container
    height: 240, // pixels - fixed height for answer container
    // Padding inside container
    paddingTop: 6, // pixels - top padding
    paddingBottom: 6, // pixels - bottom padding
    paddingLeft: 12, // pixels - left padding
    paddingRight: 20, // pixels - right padding
    marginBottom: 8, // pixels - space below answer buttons (mb-1)
    buttonGap: 6, // pixels - gap between answer buttons (gap-1)
    buttonPadding: 8, // pixels - padding inside each button (p-2.5)
    buttonMinHeight: 90, // pixels - minimum button height (min-h-[60px])
    buttonBorderRadius: 16, // pixels - border radius (rounded-2xl)
    borderWidth: 3, // pixels - button border width
    // Text settings
    fontSize: 16, // pixels - answer text font size
    fontFamily: "roboto", // font family - "fredoka" | "sf-compact" | "roboto" | "sans-serif" | "serif"
    textAlign: "left" as "left" | "center" | "right", // "left" | "center" | "right" - answer text alignment
    textColor: "#000000", // hex - answer text color
    // Letter circle settings
    letterCircleSize: 32, // pixels - A/B/C/D circle size (w-8 h-8)
    letterFontSize: 16, // pixels - A/B/C/D letter font size
    letterGap: 12, // pixels - gap between letter circle and text (gap-3)

    // ========== BUTTON COLORS ==========
    // Default state
    defaultBackgroundColor: "#ffe6cc", // hsl(30 100% 90%)
    defaultBorderColor: "#c9954a", // hsl(30 80% 65%)
    defaultLetterColor: "#0a0a48", // letter A/B/C/D color
    defaultLetterBgColor: "rgba(139, 69, 19, 0.2)", // letter circle background

    // Selected state (before submit)
    selectedBackgroundColor: "#ffe6cc", // same as default
    selectedBorderColor: "#007bff", // blue selection border
    selectedShadowColor: "rgba(0, 123, 255, 0.5)", // glow shadow
    selectedShadowBlur: 12, // pixels - shadow blur radius

    // Correct state (after submit)
    correctBackgroundColor: "#cefdd5", // light green
    correctBorderColor: "#2acb42", // green border
    correctLetterColor: "#2acb42", // green letter
    correctLetterBgColor: "#C8F7C5", // light green circle

    // Wrong state (after submit)
    wrongBackgroundColor: "#ffcfcc", // light red
    wrongBorderColor: "#ff3b30", // red border
    wrongLetterColor: "#ff3b30", // red letter
    wrongLetterBgColor: "#FADBD8", // light red circle

    // Animation settings
    disabledOpacity: 0.7, // opacity when disabled but not answered
    activeScale: 0.95, // scale when pressed
    transitionDuration: 200, // ms - transition duration
  },

  // ==========================================
  // SUBMIT/CONTINUE BUTTON
  // ==========================================
  actionButton: {
    scale: 1.0, // Multiplier for all size values in this section
    containerPaddingX: 16, // pixels - left/right padding (px-4)
    containerPaddingY: 130, // pixels - top/bottom padding
    buttonWidth: 128, // pixels - button width (w-32)
    buttonHeight: 35, // pixels - button height
    // Animation settings
    disabledOpacity: 0.5, // opacity when disabled
    activeScale: 0.95, // scale when pressed
    transitionDuration: 200, // ms - transition duration
  },

  // ==========================================
  // RACE TRACK
  // ==========================================
  raceTrack: {
    scale: 1.0,
    trackBottomOffset: 10,
    trackHeight: 180,
    startLineLeft: 0,
    finishLineLeft: 85,
    startLineWidth: 60,
    finishLineWidth: 50,
    playerBottom: 60,
    bot1Bottom: 30,
    bot2Bottom: 0,
    bot1LeftOffset: 5,
    bot2LeftOffset: 0,
    playerLeftOffset: 10,
  },

  // ==========================================
  // MASCOTS
  // ==========================================
  mascots: {
    scale: 1.0,
    playerWidth: 75,
    bot1Width: 75,
    bot2Width: 75,
  },

  // ==========================================
  // PLAYER LABEL
  // ==========================================
  playerLabel: {
    scale: 1.0, // Multiplier for all size values in this section
    offsetTop: -24, // pixels - distance above player (-top-6)
    paddingX: 8, // pixels - horizontal padding (px-2)
    paddingY: 2, // pixels - vertical padding (py-0.5)
    fontSize: 11, // pixels - label font size
    borderRadius: 9999, // full rounded
  },

  // ==========================================
  // WIN SCREEN
  // ==========================================
  winScreen: {
    scale: 1.0, // Multiplier for all size values in this section
    overlayOpacity: 0.6, // background overlay opacity
    cardPadding: 32, // pixels - card padding (p-8)
    cardMarginX: 16, // pixels - horizontal margin (mx-4)
    cardBorderRadius: 24, // pixels - card border radius (rounded-3xl)
    cardBorderWidth: 4, // pixels - border width
    mascotWidth: 128, // pixels - mascot image width (w-32)
    mascotMarginBottom: 16, // pixels - margin below mascot (mb-4)
    titleFontSize: 30, // pixels - "Hoàn thành!" title size (text-3xl)
    titleMarginBottom: 16, // pixels - margin below title (mb-4)
    scoreFontSize: 36, // pixels - score display size (text-4xl)
    scoreMarginBottom: 24, // pixels - margin below score (mb-6)
    buttonPaddingY: 12, // pixels - button vertical padding (py-3)
    buttonPaddingX: 32, // pixels - button horizontal padding (px-8)
    buttonFontSize: 18, // pixels - button text size (text-lg)
    buttonBorderRadius: 9999, // full rounded (rounded-full)
  },
};
