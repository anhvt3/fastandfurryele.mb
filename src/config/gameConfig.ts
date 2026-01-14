// Game Configuration
// Set USE_SAMPLE_DATA to true to use hardcoded sample questions
// Set USE_SAMPLE_DATA to false to load questions from API

export const USE_SAMPLE_DATA = true;

// API endpoint for questions (used when USE_SAMPLE_DATA is false)
export const API_ENDPOINT = "https://supham.clevai.edu.vn";

// Audio URLs for game sounds
export const AUDIO_URLS = {
  buttonClick: "https://r73troypb4obj.vcdn.cloud/audio/20260110174628.mp3",
  wrongAnswer: "https://r73troypb4obj.vcdn.cloud/audio/20260110174416.mp3",
  correctAnswer: "https://r73troypb4obj.vcdn.cloud/audio/20260110174359.mp3",
  finishGame: "https://r73troypb4obj.vcdn.cloud/audio/20260110174229.mp3",
};
