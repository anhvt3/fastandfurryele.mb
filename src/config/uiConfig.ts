// ==========================================
// UI CONFIGURATION - CHANGE VALUES HERE
// All positions, sizes, and spacing for UI elements
// ==========================================

// ==========================================
// MOBILE UI CONFIG (Current default)
// ==========================================
export const UI_CONFIG_MOBILE = {
  // ==========================================
  // SCORE DISPLAY (Top banh chung icons)
  scoreDisplay: {
    scale: 1.0,
    paddingTop: 16,
    paddingBottom: 8,
    iconSize: 40,
    iconGap: 8,
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
    scale: 1.0,
    width: 460,
    height: 240,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 20,
    marginBottom: 8,
    buttonGap: 6,
    buttonPadding: 8,
    buttonMinHeight: 90,
    buttonBorderRadius: 16,
    borderWidth: 3,
    fontSize: 16,
    fontFamily: "roboto",
    textAlign: "left" as "left" | "center" | "right",
    textColor: "#000000",
    letterCircleSize: 32,
    letterFontSize: 16,
    letterGap: 12,
    defaultBackgroundColor: "#ffe6cc",
    defaultBorderColor: "#c9954a",
    defaultLetterColor: "#0a0a48",
    defaultLetterBgColor: "rgba(139, 69, 19, 0.2)",
    selectedBackgroundColor: "#ffe6cc",
    selectedBorderColor: "#007bff",
    selectedShadowColor: "rgba(0, 123, 255, 0.5)",
    selectedShadowBlur: 12,
    correctBackgroundColor: "#cefdd5",
    correctBorderColor: "#2acb42",
    correctLetterColor: "#2acb42",
    correctLetterBgColor: "#C8F7C5",
    wrongBackgroundColor: "#ffcfcc",
    wrongBorderColor: "#ff3b30",
    wrongLetterColor: "#ff3b30",
    wrongLetterBgColor: "#FADBD8",
    disabledOpacity: 0.7,
    activeScale: 0.95,
    transitionDuration: 200,
  },

  // ==========================================
  // SUBMIT/CONTINUE BUTTON
  // ==========================================
  actionButton: {
    scale: 1.0,
    containerPaddingX: 16,
    containerPaddingY: 130,
    buttonWidth: 128,
    buttonHeight: 35,
    disabledOpacity: 0.5,
    activeScale: 0.95,
    transitionDuration: 200,
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
    scale: 1.0,
    offsetTop: -24,
    paddingX: 8,
    paddingY: 2,
    fontSize: 11,
    borderRadius: 9999,
  },

  // ==========================================
  // WIN SCREEN
  // ==========================================
  winScreen: {
    scale: 1.0,
    overlayOpacity: 0.6,
    cardPadding: 32,
    cardMarginX: 16,
    cardBorderRadius: 24,
    cardBorderWidth: 4,
    mascotWidth: 128,
    mascotMarginBottom: 16,
    titleFontSize: 30,
    titleMarginBottom: 16,
    scoreFontSize: 36,
    scoreMarginBottom: 24,
    buttonPaddingY: 12,
    buttonPaddingX: 32,
    buttonFontSize: 18,
    buttonBorderRadius: 9999,
  },
};

// ==========================================
// PC UI CONFIG (Larger sizes for desktop)
// ==========================================
export const UI_CONFIG_PC = {
  // ==========================================
  // SCORE DISPLAY (Top banh chung icons)
  scoreDisplay: {
    scale: 1.2,
    paddingTop: 20,
    paddingBottom: 12,
    iconSize: 50,
    iconGap: 12,
  },

  // QUESTION BOX
  // ==========================================
  questionBox: {
    scale: 1.0,
    minHeight: 180,
    height: 300,
    useFixedHeight: true,
    containerPaddingX: 16,
    containerPaddingY: 0,
    marginBottom: 10,
    innerPaddingX: 12,
    innerPaddingTop: 90,
    innerPaddingBottom: 0,
    framePaddingX: 16,
    fontSize: 1.1,
    fontSizeUnit: "rem" as "px" | "rem",
    fontFamily: "'Medium SF Compact Rounded', 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    textAlign: "justify" as "left" | "center" | "right" | "justify",
    textColor: "#4a2c00",
    imageMaxWidth: 280,
    imageGap: 14,
    maxContentHeight: 160,
    scrollbarWidth: 6,
    scrollbarColor: "#c4a484",
    scrollbarTrackColor: "transparent",
  },

  // ==========================================
  // ANSWER BUTTONS
  answerButtons: {
    scale: 1.0,
    width: 600,
    height: 300,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 28,
    marginBottom: 12,
    buttonGap: 10,
    buttonPadding: 12,
    buttonMinHeight: 60,
    buttonBorderRadius: 20,
    borderWidth: 3,
    fontSize: 18,
    fontFamily: "roboto",
    textAlign: "left" as "left" | "center" | "right",
    textColor: "#000000",
    letterCircleSize: 38,
    letterFontSize: 18,
    letterGap: 16,
    defaultBackgroundColor: "#ffe6cc",
    defaultBorderColor: "#c9954a",
    defaultLetterColor: "#0a0a48",
    defaultLetterBgColor: "rgba(139, 69, 19, 0.2)",
    selectedBackgroundColor: "transparent",
    selectedBorderColor: "#ff9900",
    selectedShadowColor: "rgba(255, 153, 0, 0.5)",
    selectedShadowBlur: 16,
    gridCols: 2,
    gridGap: 12,
    correctBackgroundColor: "#cefdd5",
    correctBorderColor: "#2acb42",
    correctLetterColor: "#2acb42",
    correctLetterBgColor: "#C8F7C5",
    wrongBackgroundColor: "#ffcfcc",
    wrongBorderColor: "#ff3b30",
    wrongLetterColor: "#ff3b30",
    wrongLetterBgColor: "#FADBD8",
    disabledOpacity: 0.7,
    activeScale: 0.95,
    transitionDuration: 200,
  },

  // ==========================================
  // SUBMIT/CONTINUE BUTTON
  // ==========================================
  actionButton: {
    scale: 1.2,
    containerPaddingX: 24,
    containerPaddingY: 160,
    buttonWidth: 160,
    buttonHeight: 45,
    disabledOpacity: 0.5,
    activeScale: 0.95,
    transitionDuration: 200,
  },

  // ==========================================
  // RACE TRACK
  // ==========================================
  raceTrack: {
    scale: 1.2,
    trackBottomOffset: 15,
    trackHeight: 220,
    startLineLeft: 0,
    finishLineLeft: 85,
    startLineWidth: 80,
    finishLineWidth: 70,
    playerBottom: 80,
    bot1Bottom: 40,
    bot2Bottom: 0,
    bot1LeftOffset: 5,
    bot2LeftOffset: 0,
    playerLeftOffset: 10,
  },

  // ==========================================
  // MASCOTS
  // ==========================================
  mascots: {
    scale: 1.2,
    playerWidth: 95,
    bot1Width: 95,
    bot2Width: 95,
  },

  // ==========================================
  // PLAYER LABEL
  // ==========================================
  playerLabel: {
    scale: 1.2,
    offsetTop: -30,
    paddingX: 12,
    paddingY: 4,
    fontSize: 14,
    borderRadius: 9999,
  },

  // ==========================================
  // WIN SCREEN
  // ==========================================
  winScreen: {
    scale: 1.2,
    overlayOpacity: 0.6,
    cardPadding: 48,
    cardMarginX: 24,
    cardBorderRadius: 32,
    cardBorderWidth: 4,
    mascotWidth: 160,
    mascotMarginBottom: 24,
    titleFontSize: 40,
    titleMarginBottom: 24,
    scoreFontSize: 48,
    scoreMarginBottom: 32,
    buttonPaddingY: 16,
    buttonPaddingX: 48,
    buttonFontSize: 22,
    buttonBorderRadius: 9999,
  },
};

// Type export
export type UIConfigType = typeof UI_CONFIG_MOBILE;

// Helper function to get config based on device type
export const getUIConfig = (deviceType: 'mobile' | 'desktop'): UIConfigType => 
  deviceType === 'mobile' ? UI_CONFIG_MOBILE : UI_CONFIG_PC;

// Legacy export for backward compatibility
export const UI_CONFIG = UI_CONFIG_MOBILE;
