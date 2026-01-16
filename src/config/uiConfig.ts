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
    iconSize: 32, // pixels - banh chung icon width/height (w-8 h-8)
    iconGap: 8, // pixels - gap between icons (gap-2)
  },

  // QUESTION BOX
  // ==========================================
  questionBox: {
    scale: 1.0, // Multiplier for all size values in this section
    // Height settings
    minHeight: 140, // pixels - minimum question box height
    height: 270, // pixels - fixed height (used when useFixedHeight is true)
    useFixedHeight: true, // true = use fixed height, false = use image aspect ratio
    // Container spacing
    containerPaddingX: 8, // pixels - left/right container padding (px-2)
    containerPaddingY: 0, // pixels - top/bottom container padding
    marginBottom: 6, // pixels - space below question box (mb-1)
    innerPaddingX: 6, // pixels - inner horizontal padding (px-4)
    innerPaddingTop: 72, // pixels - top padding inside frame
    innerPaddingBottom: 20, // pixels - bottom padding inside frame
    framePaddingX: 10, // pixels - text padding inside frame (px-8)
    // Text settings
    fontSize: 16, // pixels - question text font size
    fontFamily: "roboto", // font family - "fredoka" | "sf-compact" | "roboto" | "sans-serif" | "serif"
    textAlign: "center" as "left" | "center" | "right", // "left" | "center" | "right" - question text alignment
    textColor: "#1a1a1a", // hex - question text color
    // Image settings
    imageMaxWidth: 200, // pixels - max width for image questions
    imageGap: 10, // pixels - gap between text and image (gap-2)
    // Scroll configuration for long questions
    maxContentHeight: 120, // pixels - max height before scrolling
    scrollbarWidth: 4, // pixels - scrollbar width
    scrollbarColor: "#c4a484", // scrollbar thumb color (tan/wood)
    scrollbarTrackColor: "transparent", // scrollbar track color
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
    scale: 1.0, // Multiplier for all size values in this section
    trackBottomOffset: 10, // pixels - distance from screen bottom
    trackHeight: 180, // pixels - track container height
    startLineLeft: 5, // percentage - start line position
    finishLineLeft: 85, // percentage - finish line position
    startLineWidth: 80, // pixels - start line image width (w-20)
    finishLineWidth: 64, // pixels - finish line image width (w-16)
    playerBottom: 0, // pixels - player vertical position
    bot1Bottom: 20, // pixels - bot1 vertical position
    bot2Bottom: 40, // pixels - bot2 vertical position
    bot1LeftOffset: 6, // percentage - bot1 horizontal offset
    bot2LeftOffset: 12, // percentage - bot2 horizontal offset
  },

  // ==========================================
  // MASCOTS
  // ==========================================
  mascots: {
    scale: 1.0, // Multiplier for all size values in this section
    playerWidth: 96, // pixels - player mascot width (w-24)
    bot1Width: 80, // pixels - bot1 mascot width (w-20)
    bot2Width: 80, // pixels - bot2 mascot width (w-20)
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
