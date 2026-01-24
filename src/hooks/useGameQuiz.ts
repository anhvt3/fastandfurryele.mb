/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { useGameAPI } from "usegamigameapi";
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
    // Priority 1: Custom questions passed in (from URL loading in Index.tsx)
    if (customQuestions && customQuestions.length > 0) return true;

    // Priority 2: Query param ?sample=true
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('sample') === 'true';
    }

    return false;
  }, [customQuestions]);

  // --- Real API Hook ---
  const apiGame = useGameAPI({
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

  // --- Effective Data Selector ---
  const effectiveQuestionsRaw = useMemo(() => {
    if (isSampleMode) {
      if (customQuestions && customQuestions.length > 0) return customQuestions;
      // Convert sampleQuestions (if they are different format) or use as is
      // sampleQuestions in fastandfurry seems to be local data
      // We might need to map them to Expected structure if customQuestions uses different one
      return sampleQuestions.map((q, idx) => ({
        id: idx + 1,
        text: q.question,
        answers: q.answers.map((ans, aIdx) => ({ id: aIdx + 1, content: ans })),
        correctIndex: q.correctIndex ?? 0, // Ensure sampleQuestions has this
        audioUrl: (q as any).audioUrl
      }));
    }
    return apiGame.quiz ? [apiGame.quiz] : [];
  }, [isSampleMode, customQuestions, apiGame.quiz]);

  const rawCurrentQuestion = useMemo(() => {
    if (isSampleMode) {
      return effectiveQuestionsRaw[sampleIndex];
    }
    return apiGame.quiz;
  }, [isSampleMode, effectiveQuestionsRaw, sampleIndex, apiGame.quiz]);

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

    const relevantResult = isSampleMode ? sampleCurrentResult : apiGame.currentResult;
    const selectedObj = isSampleMode ? sampleSelectedAnswer : apiGame.selectedAnswer;

    // Logic 1: If result confirms correct, user's selection IS correct
    if (relevantResult?.isCorrect && selectedObj) {
      correctIdx = normalizedAnswers.findIndex((a: any) =>
        String(a.id) === String(selectedObj.id) ||
        a.content === selectedObj.content
      );
    }

    // Logic 2: explicit Correct ID
    if (correctIdx === -1) {
      let targetCorrectId: any = undefined;

      if (relevantResult?.correctAnswerId) {
        targetCorrectId = relevantResult.correctAnswerId;
      } else if (rawCurrentQuestion.correctAnswerId !== undefined) {
        targetCorrectId = rawCurrentQuestion.correctAnswerId;
      } else if (rawCurrentQuestion.correctIndex !== undefined) {
        targetCorrectId = rawCurrentQuestion.correctIndex;
      }

      if (targetCorrectId !== undefined) {
        correctIdx = normalizedAnswers.findIndex((a: any) =>
          String(a.id) === String(targetCorrectId) ||
          a.content === targetCorrectId
        );

        if (correctIdx === -1 && typeof targetCorrectId === 'number' && targetCorrectId < normalizedAnswers.length) {
          correctIdx = targetCorrectId;
        }
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
  }, [rawCurrentQuestion, isSampleMode, sampleCurrentResult, apiGame.currentResult, sampleSelectedAnswer, apiGame.selectedAnswer]);


  // 2. Status Flags
  const isLoading = isSampleMode ? !rawCurrentQuestion : (!apiGame.quiz && !apiGame.isCompleted);
  const isAnswered = isSampleMode ? sampleHasSubmitted : apiGame.hasSubmitted;
  const isCompleted = isSampleMode ? sampleIsCompleted : apiGame.isCompleted;
  // const currentIdx = isSampleMode ? sampleIndex : apiGame.currentQuestionIndex; 
  // ApiGame.currentQuestionIndex might be 0 initially

  // 3. Selected Answer Object (TetQuizGame expects object)
  const selectedAnswerObj = isSampleMode ? sampleSelectedAnswer : apiGame.selectedAnswer;

  // 4. Answers History
  // TetQuizGame uses 'answers' array of booleans/nulls
  // apiGame.answers is exactly that.
  const history = isSampleMode ? sampleAnswers : (apiGame.answers ?? []);

  // 5. Correct Count
  const correctCount = isSampleMode ? sampleCorrectCount : (apiGame.correctCount ?? 0);


  // --- Actions ---

  const handleAnswerSelect = useCallback((answer: QuizAnswer) => {
    if (isAnswered) return;

    // playButtonClick(); // handled in component

    if (isSampleMode) {
      setSampleSelectedAnswer(answer);
    } else {
      // Need to ensure answer passed to API has correct structure if simple string
      // But here answer is QuizAnswer { id, content }
      apiGame.handleAnswerSelect(answer);
    }
  }, [isAnswered, isSampleMode, apiGame]);

  const updateAnswer = useCallback(() => {
    if (isSampleMode) {
      if (!sampleSelectedAnswer || !currentQuestion) return;

      // Sample Logic
      const correctId = currentQuestion._raw.correctAnswerId || currentQuestion._raw.correctIndex;
      // Flexible compare
      let isCorrect = String(sampleSelectedAnswer.id) === String(correctId);

      // If correctId is index-based (integer) and sample answer IDs are 1-based, handle mismatch?
      // Our normalization made IDs.
      // Let's rely on correctIndex from currentQuestion if available
      if (currentQuestion.correctIndex !== -1) {
        const selectedIdx = currentQuestion.answers.findIndex((a: any) => a.id === sampleSelectedAnswer.id);
        isCorrect = selectedIdx === currentQuestion.correctIndex;
      }

      const nextAnswers = [...sampleAnswers];
      nextAnswers[sampleIndex] = isCorrect;
      setSampleAnswers(nextAnswers);

      setSampleCurrentResult({ isCorrect, correctAnswerId: correctId });
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
  }, [isSampleMode, sampleSelectedAnswer, currentQuestion, sampleIndex, sampleAnswers, apiGame, options]);

  const handleContinue = useCallback(() => {
    if (isSampleMode) {
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
  }, [isSampleMode, sampleIndex, apiGame]);

  const finish = useCallback(() => {
    if (isSampleMode) {
      window.location.reload();
    } else {
      apiGame.finish();
    }
  }, [isSampleMode, apiGame]);

  // Return structure matching what TetQuizGame expects
  return {
    quiz: currentQuestion, // { text, answers, audioUrl }
    selectedAnswer: selectedAnswerObj,
    currentResult: isSampleMode ? sampleCurrentResult : apiGame.currentResult,
    answers: history,
    correctCount,
    currentQuestionIndex: isSampleMode ? sampleIndex : (apiGame.currentQuestionIndex || 0),
    isSubmitting: isLoading, // Re-map? isLoading implies fetching. isSubmitting implies posting.
    // apiGame.isSubmitting exists? Yes. Use that.
    isSubmittingPost: apiGame.isSubmitting, // differentiate
    hasSubmitted: isAnswered,
    isCompleted,
    totalQuestions: FIXED_TOTAL_QUESTIONS,

    handleAnswerSelect,
    updateAnswer,
    handleContinue,
    finish,

    isSampleMode
  };
}
