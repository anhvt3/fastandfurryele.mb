import { useRef, useCallback, useEffect } from "react";
import { AUDIO_URLS } from "@/config/gameConfig";

interface AudioRefs {
  buttonClick: HTMLAudioElement | null;
  wrongAnswer: HTMLAudioElement | null;
  correctAnswer: HTMLAudioElement | null;
  finishGame: HTMLAudioElement | null;
}

export const useGameAudio = () => {
  const audioRefs = useRef<AudioRefs>({
    buttonClick: null,
    wrongAnswer: null,
    correctAnswer: null,
    finishGame: null,
  });

  // Initialize audio elements
  useEffect(() => {
    audioRefs.current.buttonClick = new Audio(AUDIO_URLS.buttonClick);
    audioRefs.current.wrongAnswer = new Audio(AUDIO_URLS.wrongAnswer);
    audioRefs.current.correctAnswer = new Audio(AUDIO_URLS.correctAnswer);
    audioRefs.current.finishGame = new Audio(AUDIO_URLS.finishGame);

    // Preload audio files
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.load();
      }
    });

    return () => {
      // Cleanup audio elements
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);

  const playAudio = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.log("Audio play failed:", err);
      });
    }
  }, []);

  const playButtonClick = useCallback(() => {
    playAudio(audioRefs.current.buttonClick);
  }, [playAudio]);

  const playCorrectAnswer = useCallback(() => {
    playAudio(audioRefs.current.correctAnswer);
  }, [playAudio]);

  const playWrongAnswer = useCallback(() => {
    playAudio(audioRefs.current.wrongAnswer);
  }, [playAudio]);

  const playFinishGame = useCallback(() => {
    playAudio(audioRefs.current.finishGame);
  }, [playAudio]);

  return {
    playButtonClick,
    playCorrectAnswer,
    playWrongAnswer,
    playFinishGame,
  };
};
