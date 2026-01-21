// Game Configuration
// Query param ?sample=true enables sample data mode
// Default (no param or sample=false) uses API via postMessage

// Fixed total questions for progress bar display
export const FIXED_TOTAL_QUESTIONS = 5;

// Legacy export for backward compatibility (deprecated)
export const USE_SAMPLE_DATA = false;

// API endpoint for questions (used when USE_SAMPLE_DATA is false)
export const API_ENDPOINT = "https://supham.clevai.edu.vn";

// Audio URLs for game sounds
export const AUDIO_URLS = {
  buttonClick: "https://r73troypb4obj.vcdn.cloud/audio/20260110174628.mp3",
  wrongAnswer: "https://r73troypb4obj.vcdn.cloud/audio/20260110174416.mp3",
  correctAnswer: "https://r73troypb4obj.vcdn.cloud/audio/20260110174359.mp3",
  finishGame: "https://r73troypb4obj.vcdn.cloud/audio/20260110174229.mp3",
};
