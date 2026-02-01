/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo, useEffect } from "react";
import { useGameAPIEnhanced } from "@/hooks/useGameAPIEnhanced";
import { useGameAudio } from "@/hooks/useGameAudio";
import { sampleQuestions } from "@/data/questions";
import { FIXED_TOTAL_QUESTIONS } from "@/config/gameConfig";

export interface QuizAnswer {
  id: number;
  content: string;
}

export interface Quiz {
  text: string;
  audioUrl?: string;
  answers: QuizAnswer[];
  correctIndex?: number;
}

export interface QuizResult {
  isCorrect: boolean;
  isLastQuestion: boolean;
  explanation?: string;
}

interface UseGameQuizOptions {
  onAnswerCorrect?: (data: { currentQuestionIndex: number }) => void;
  onAnswerIncorrect?: () => void;
  customQuestions?: any[] | null;
}

export function useGameQuiz(options: UseGameQuizOptions = {}) {
  const { onAnswerCorrect, onAnswerIncorrect, customQuestions } = options;
  const { playButtonClick, playCorrectAnswer, playWrongAnswer, playFinishGame } = useGameAudio();

  // --- UI/Animation State ---
  // (FastAndFurry handles UI state mostly in component, but we track flow here)

  // --- Strategy Determination ---
  const isSampleMode = useMemo(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('sample') === 'true';
    }

    return false;
  }, []);

  // --- Real API Hook ---
  const apiGame = useGameAPIEnhanced({
    onAnswerCorrect: (data) => {
      onAnswerCorrect?.(data);
    },
    onAnswerIncorrect: () => {
      onAnswerIncorrect?.();
    }
  });

  // --- Sample Mode Simulation State ---
  const [sampleIndex, setSampleIndex] = useState(0);
  const [sampleSelectedAnswer, setSampleSelectedAnswer] = useState<QuizAnswer | null>(null);
  const [sampleAnswers, setSampleAnswers] = useState<(boolean | null)[]>([]);
  const [sampleHasSubmitted, setSampleHasSubmitted] = useState(false);
  const [sampleIsCompleted, setSampleIsCompleted] = useState(false);
  const [sampleCurrentResult, setSampleCurrentResult] = useState<{ isCorrect: boolean; correctAnswerId?: number } | null>(null);
  const [sampleCorrectCount, setSampleCorrectCount] = useState(0);
  const [iframeUsername, setIframeUsername] = useState<string | null>(null);
  const [hasApiInit, setHasApiInit] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event?.data;
      if (!data || data.type !== 'INIT') return;
      setHasApiInit(true);
      const rawUsername = data?.payload?.username;
      if (typeof rawUsername === 'string' && rawUsername.trim()) {
        setIframeUsername(rawUsername.trim());
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // --- Effective Data Selector ---
  const hasCustomQuestions = !!(customQuestions && customQuestions.length > 0);
  const shouldUseCustomQuestions = !isSampleMode && !hasApiInit && hasCustomQuestions && !apiGame.quiz;
  const isLocalMode = isSampleMode || shouldUseCustomQuestions;

  const effectiveQuestionsRaw = useMemo(() => {
    if (isSampleMode) {
      return sampleQuestions.map((q, idx) => ({
        id: idx + 1,
        text: q.question,
        answers: q.answers.map((ans, aIdx) => ({ id: aIdx + 1, content: ans })),
        correctIndex: q.correctIndex ?? 0,
        audioUrl: (q as any).audioUrl
      }));
    }
    if (shouldUseCustomQuestions) return customQuestions ?? [];
    return apiGame.quiz ? [apiGame.quiz] : [];
  }, [isSampleMode, shouldUseCustomQuestions, customQuestions, apiGame.quiz]);

  const rawCurrentQuestion = useMemo(() => {
    if (isLocalMode) {
      return effectiveQuestionsRaw[sampleIndex];
    }
    return apiGame.quiz;
  }, [isLocalMode, effectiveQuestionsRaw, sampleIndex, apiGame.quiz]);

  // --- Derived State for UI ---

  // 1. Current Question Data
  const currentQuestion = useMemo(() => {
    if (!rawCurrentQuestion) return null;

    const quizText = rawCurrentQuestion.text || rawCurrentQuestion.content || rawCurrentQuestion.question || '';
    const quizAudioUrl = rawCurrentQuestion.audioUrl || rawCurrentQuestion.audio_url || rawCurrentQuestion.imageUrl;

    // Normalize answers
    const rawAnswers = rawCurrentQuestion.answers || rawCurrentQuestion.quiz_possible_options || [];
    const normalizedAnswers = rawAnswers.map((a: any, idx: number) => {
      if (typeof a === 'string') return { id: idx + 1, content: a };
      return {
        id: a.id || idx + 1,
        content: a.content || a.text || a.option_value || ''
      };
    });

    // Determine Correct Index for UI highlighting
    let correctIdx = -1;

    const relevantResult = isLocalMode ? sampleCurrentResult : apiGame.currentResult;
    const selectedObj = isLocalMode ? sampleSelectedAnswer : apiGame.selectedAnswer;

    // Logic 1: If result confirms correct, user's selection IS correct
    if (relevantResult?.isCorrect && selectedObj) {
      correctIdx = normalizedAnswers.findIndex((a: any) =>
        String(a.id) === String(selectedObj.id) ||
        a.content === selectedObj.content
      );
    }

    // Logic 2: explicit index first
    if (correctIdx === -1) {
      const rawCorrectIndex = rawCurrentQuestion.correctIndex;
      if (typeof rawCorrectIndex === 'number' && rawCorrectIndex >= 0 && rawCorrectIndex < normalizedAnswers.length) {
        correctIdx = rawCorrectIndex;
      }
    }

    // Logic 3: explicit Correct ID
    if (correctIdx === -1) {
      let targetCorrectId: any = undefined;

      if (relevantResult?.correctAnswerId !== undefined) {
        targetCorrectId = relevantResult.correctAnswerId;
      } else if (rawCurrentQuestion.correctAnswerId !== undefined) {
        targetCorrectId = rawCurrentQuestion.correctAnswerId;
      }

      if (targetCorrectId !== undefined) {
        correctIdx = normalizedAnswers.findIndex((a: any) =>
          String(a.id) === String(targetCorrectId) ||
          a.content === targetCorrectId
        );
      }
    }

    // REMOVED: Fallback to 0.

    return {
      text: quizText,
      audioUrl: quizAudioUrl,
      answers: normalizedAnswers,
      correctIndex: correctIdx,
      _raw: rawCurrentQuestion
    };
  }, [rawCurrentQuestion, isLocalMode, sampleCurrentResult, apiGame.currentResult, sampleSelectedAnswer, apiGame.selectedAnswer]);


  // 2. Status Flags
  const isLoading = isLocalMode ? !rawCurrentQuestion : (!apiGame.quiz && !apiGame.isCompleted);
  const isAnswered = isLocalMode ? sampleHasSubmitted : apiGame.hasSubmitted;
  const isCompleted = isLocalMode ? sampleIsCompleted : apiGame.isCompleted;
  // const currentIdx = isSampleMode ? sampleIndex : apiGame.currentQuestionIndex; 
  // ApiGame.currentQuestionIndex might be 0 initially

  // 3. Selected Answer Object (TetQuizGame expects object)
  const selectedAnswerObj = isLocalMode ? sampleSelectedAnswer : apiGame.selectedAnswer;

  // 4. Answers History
  // TetQuizGame uses 'answers' array of booleans/nulls
  // apiGame.answers is exactly that.
  const history = isLocalMode ? sampleAnswers : (apiGame.answers ?? []);

  // 5. Correct Count
  const correctCount = isLocalMode ? sampleCorrectCount : (apiGame.correctCount ?? 0);


  // --- Actions ---

  const handleAnswerSelect = useCallback((answer: QuizAnswer) => {
    if (isAnswered) return;

    // playButtonClick(); // handled in component

    if (isLocalMode) {
      setSampleSelectedAnswer(answer);
    } else {
      // Need to ensure answer passed to API has correct structure if simple string
      // But here answer is QuizAnswer { id, content }
      apiGame.handleAnswerSelect(answer);
    }
  }, [isAnswered, isLocalMode, apiGame]);

  const updateAnswer = useCallback(() => {
    if (isLocalMode) {
      if (!sampleSelectedAnswer || !currentQuestion) return;

      const rawCorrectIndex = currentQuestion._raw.correctIndex;
      const rawCorrectAnswerId = currentQuestion._raw.correctAnswerId;
      let isCorrect = false;

      if (typeof rawCorrectIndex === 'number') {
        const selectedIdx = currentQuestion.answers.findIndex((a: any) => a.id === sampleSelectedAnswer.id);
        isCorrect = selectedIdx === rawCorrectIndex;
      } else if (rawCorrectAnswerId !== undefined) {
        isCorrect = String(sampleSelectedAnswer.id) === String(rawCorrectAnswerId);
      }

      const nextAnswers = [...sampleAnswers];
      nextAnswers[sampleIndex] = isCorrect;
      setSampleAnswers(nextAnswers);

      setSampleCurrentResult({
        isCorrect,
        correctAnswerId: rawCorrectAnswerId !== undefined ? rawCorrectAnswerId : undefined
      });
      setSampleHasSubmitted(true);

      if (isCorrect) {
        setSampleCorrectCount(prev => prev + 1);
        options.onAnswerCorrect?.({ currentQuestionIndex: sampleIndex });
      } else {
        options.onAnswerIncorrect?.();
      }

    } else {
      apiGame.updateAnswer();
    }
  }, [isLocalMode, sampleSelectedAnswer, currentQuestion, sampleIndex, sampleAnswers, apiGame, options]);

  const handleContinue = useCallback(() => {
    if (isLocalMode) {
      const nextIdx = sampleIndex + 1;
      if (nextIdx >= FIXED_TOTAL_QUESTIONS) {
        setSampleIsCompleted(true);
      } else {
        setSampleIndex(nextIdx);
        setSampleSelectedAnswer(null);
        setSampleHasSubmitted(false);
        setSampleCurrentResult(null);
      }
    } else {
      apiGame.handleContinue();
    }
  }, [isLocalMode, sampleIndex, apiGame]);

  const finish = useCallback(() => {
    apiGame.finish();
  }, [apiGame]);

  const restart = useCallback(() => {
    setSampleIndex(0);
    setSampleSelectedAnswer(null);
    setSampleAnswers([]);
    setSampleHasSubmitted(false);
    setSampleIsCompleted(false);
    setSampleCurrentResult(null);
    setSampleCorrectCount(0);
  }, []);

  // Return structure matching what TetQuizGame expects
  return {
    quiz: currentQuestion, // { text, answers, audioUrl }
    selectedAnswer: selectedAnswerObj,
    currentResult: isLocalMode ? sampleCurrentResult : apiGame.currentResult,
    answers: history,
    correctCount,
    currentQuestionIndex: isLocalMode ? sampleIndex : (apiGame.currentQuestionIndex || 0),
    isSubmitting: isLoading, // Re-map? isLoading implies fetching. isSubmitting implies posting.
    // apiGame.isSubmitting exists? Yes. Use that.
    isSubmittingPost: apiGame.isSubmitting, // differentiate
    hasSubmitted: isAnswered,
    isCompleted,
    totalQuestions: FIXED_TOTAL_QUESTIONS,
    username: (apiGame as { username?: string | null }).username ?? iframeUsername,

    handleAnswerSelect,
    updateAnswer,
    handleContinue,
    finish,
    restart,

    isSampleMode
  };
}
