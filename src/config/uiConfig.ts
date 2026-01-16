// ==========================================
// UI CONFIGURATION - CHANGE VALUES HERE
// All positions, sizes, and spacing for UI elements
// ==========================================

export const UI_CONFIG = {
  // ==========================================
  // SCORE DISPLAY (Top banh chung icons)
  // ==========================================
  scoreDisplay: {
    paddingTop: 16, // pixels - top padding (pt-4)
    paddingBottom: 8, // pixels - bottom padding (pb-2)
    iconSize: 32, // pixels - banh chung icon width/height (w-8 h-8)
    iconGap: 8, // pixels - gap between icons (gap-2)
  },

  // ==========================================
  // QUESTION BOX
  // ==========================================
  questionBox: {
    // Container spacing
    containerPaddingX: 8, // pixels - left/right container padding (px-2)
    containerPaddingY: 0, // pixels - top/bottom container padding
    marginBottom: 4, // pixels - space below question box (mb-1)
    innerPaddingX: 16, // pixels - inner horizontal padding (px-4)
    innerPaddingY: 16, // pixels - frame padding Y (py-4)
    framePaddingX: 32, // pixels - text padding inside frame (px-8)
    // Text settings
    fontSize: 16, // pixels - question text font size
    textAlign: "center" as "left" | "center" | "right", // "left" | "center" | "right" - question text alignment
    // Image settings
    imageMaxWidth: 200, // pixels - max width for image questions
    imageGap: 8, // pixels - gap between text and image (gap-2)
    // Scroll configuration for long questions
    maxContentHeight: 120, // pixels - max height before scrolling
    scrollbarWidth: 4, // pixels - scrollbar width
    scrollbarColor: "#c4a484", // scrollbar thumb color (tan/wood)
    scrollbarTrackColor: "transparent", // scrollbar track color
  },

  // ==========================================
  // ANSWER BUTTONS
  // ==========================================
  answerButtons: {
    // Container spacing
    containerPaddingX: 16, // pixels - left/right container padding (px-4)
    containerPaddingY: 10, // pixels - top/bottom container padding
    marginBottom: 4, // pixels - space below answer buttons (mb-1)
    buttonGap: 12, // pixels - gap between answer buttons (gap-1)
    buttonPadding: 10, // pixels - padding inside each button (p-2.5)
    buttonMinHeight: 60, // pixels - minimum button height (min-h-[60px])
    buttonBorderRadius: 16, // pixels - border radius (rounded-2xl)
    // Text settings
    fontSize: 16, // pixels - answer text font size
    textAlign: "left" as "left" | "center" | "right", // "left" | "center" | "right" - answer text alignment
    // Letter circle settings
    letterCircleSize: 32, // pixels - A/B/C/D circle size (w-8 h-8)
    letterFontSize: 16, // pixels - A/B/C/D letter font size
    letterGap: 12, // pixels - gap between letter circle and text (gap-3)
  },

  // ==========================================
  // SUBMIT/CONTINUE BUTTON
  // ==========================================
  actionButton: {
    containerPaddingX: 16, // pixels - left/right padding (px-4)
    containerPaddingY: 0, // pixels - top/bottom padding
    buttonWidth: 128, // pixels - button width (w-32)
    buttonHeight: 35, // pixels - button height
  },

  // ==========================================
  // RACE TRACK
  // ==========================================
  raceTrack: {
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
    playerWidth: 96, // pixels - player mascot width (w-24)
    bot1Width: 80, // pixels - bot1 mascot width (w-20)
    bot2Width: 80, // pixels - bot2 mascot width (w-20)
  },

  // ==========================================
  // PLAYER LABEL
  // ==========================================
  playerLabel: {
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
