/**
 * useGameQuiz - Wrapper hook for usegamigameapi library
 * 
 * Implements the Complete Quiz Flow Example from the library documentation.
 * Supports both API mode (via postMessage) and sample data mode (via ?sample=true query).
 * 
 * Architecture:
 * - SHOW_LO5: Request question from parent
 * - RETURN_LO5: Receive question data
 * - UPDATE_ANSWER: Submit answer
 * - RETURN_UPDATE_ANSWER: Receive result
 * - FINISH: Signal completion
 */

import { useGameAPI } from 'usegamigameapi';
import { useState, useEffect, useMemo } from 'react';
import { sampleQuestions } from '@/data/questions';
import { FIXED_TOTAL_QUESTIONS } from '@/config/gameConfig';
import { fetchQuestions, Question } from '@/services/questionApi';

export interface QuizAnswer {
  id: number;
  content: string;
}

export interface Quiz {
  text: string;
  audioUrl?: string;
  answers: QuizAnswer[];
}

export interface QuizResult {
  isCorrect: boolean;
  isLastQuestion: boolean;
  explanation?: string;
}

interface UseGameQuizOptions {
  onAnswerCorrect?: (data: { currentQuestionIndex: number }) => void;
  onAnswerIncorrect?: () => void;
}

function isSampleMode(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('sample') === 'true';
}

function getLearningObjectCode(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('learning_object_code');
}

function getPlayerName(): string {
  if (typeof window === 'undefined') return 'User';
  const params = new URLSearchParams(window.location.search);
  return params.get('name') || 'User';
}

// Convert sample questions to quiz format
function convertSampleToQuiz(question: typeof sampleQuestions[0]): Quiz {
  return {
    text: question.question,
    answers: question.answers.map((answer, idx) => ({
      id: idx,
      content: answer,
    })),
  };
}

export function useGameQuiz(options: UseGameQuizOptions = {}) {
  const useSampleData = isSampleMode();
  const learningObjectCode = getLearningObjectCode();
  const useApiQuestions = !useSampleData && !!learningObjectCode;

  const [apiQuestions, setApiQuestions] = useState<Question[]>([]);
  const [apiLoading, setApiLoading] = useState(false);

  const [sampleQuestionIndex, setSampleQuestionIndex] = useState(0);
  const [sampleSelectedAnswer, setSampleSelectedAnswer] = useState<QuizAnswer | null>(null);
  const [sampleAnswers, setSampleAnswers] = useState<(boolean | null)[]>(
    Array(FIXED_TOTAL_QUESTIONS).fill(null)
  );
  const [sampleHasSubmitted, setSampleHasSubmitted] = useState(false);
  const [sampleCurrentResult, setSampleCurrentResult] = useState<QuizResult | null>(null);
  const [sampleIsCompleted, setSampleIsCompleted] = useState(false);
  const [sampleCorrectCount, setSampleCorrectCount] = useState(0);

  useEffect(() => {
    if (useApiQuestions) {
      setApiLoading(true);
      fetchQuestions()
        .then(questions => {
          setApiQuestions(questions.slice(0, FIXED_TOTAL_QUESTIONS));
          setApiLoading(false);
        })
        .catch(() => {
          setApiLoading(false);
        });
    }
  }, [useApiQuestions]);

  const apiHook = useGameAPI({
    onAnswerCorrect: options.onAnswerCorrect,
    onAnswerIncorrect: options.onAnswerIncorrect,
  });

  const currentQuestions = useApiQuestions ? apiQuestions : sampleQuestions;

  const sampleQuiz = useMemo(() => {
    if (!useSampleData && !useApiQuestions) return null;
    if (apiLoading) return null;
    const question = currentQuestions[sampleQuestionIndex];
    if (!question) return null;
    return {
      text: question.question,
      audioUrl: (question as any).audioUrl,
      answers: question.answers.map((answer: string, idx: number) => ({
        id: idx,
        content: answer,
      })),
    };
  }, [useSampleData, useApiQuestions, sampleQuestionIndex, currentQuestions, apiLoading]);

  const handleSampleAnswerSelect = (answer: QuizAnswer) => {
    if (sampleHasSubmitted) return;
    setSampleSelectedAnswer(answer);
  };

  const handleSampleUpdateAnswer = () => {
    if (!sampleSelectedAnswer || sampleHasSubmitted) return;

    const currentQuestion = currentQuestions[sampleQuestionIndex];
    const isCorrect = sampleSelectedAnswer.id === currentQuestion.correctIndex;
    const isLastQuestion = sampleQuestionIndex >= FIXED_TOTAL_QUESTIONS - 1;

    // Update answers array
    const newAnswers = [...sampleAnswers];
    newAnswers[sampleQuestionIndex] = isCorrect;
    setSampleAnswers(newAnswers);

    // Update correct count
    if (isCorrect) {
      setSampleCorrectCount(prev => prev + 1);
      options.onAnswerCorrect?.({ currentQuestionIndex: sampleQuestionIndex });
    } else {
      options.onAnswerIncorrect?.();
    }

    // Set result
    setSampleCurrentResult({
      isCorrect,
      isLastQuestion,
    });

    setSampleHasSubmitted(true);
  };

  const handleSampleContinue = () => {
    const isLastQuestion = sampleQuestionIndex >= FIXED_TOTAL_QUESTIONS - 1;

    if (isLastQuestion) {
      setSampleIsCompleted(true);
    } else {
      setSampleQuestionIndex(prev => prev + 1);
      setSampleSelectedAnswer(null);
      setSampleHasSubmitted(false);
      setSampleCurrentResult(null);
    }
  };

  const handleSampleFinish = () => {
    // In sample mode, just reset or signal parent if needed
    console.log('[useGameQuiz] Sample mode finished');
  };

  if (useSampleData || useApiQuestions) {
    return {
      quiz: sampleQuiz,
      selectedAnswer: sampleSelectedAnswer,
      currentResult: sampleCurrentResult,
      answers: sampleAnswers,
      correctCount: sampleCorrectCount,
      currentQuestionIndex: sampleQuestionIndex,
      isSubmitting: apiLoading,
      hasSubmitted: sampleHasSubmitted,
      isCompleted: sampleIsCompleted,
      totalQuestions: FIXED_TOTAL_QUESTIONS,
      handleAnswerSelect: handleSampleAnswerSelect,
      updateAnswer: handleSampleUpdateAnswer,
      handleContinue: handleSampleContinue,
      finish: handleSampleFinish,
      isSampleMode: useSampleData,
      isApiMode: useApiQuestions,
      playerName: getPlayerName(),
    };
  }

  // API mode - return hook values with totalQuestions
  return {
    // State from API hook
    quiz: apiHook.quiz as Quiz | null,
    selectedAnswer: apiHook.selectedAnswer as QuizAnswer | null,
    currentResult: apiHook.currentResult as QuizResult | null,
    answers: apiHook.answers ?? Array(FIXED_TOTAL_QUESTIONS).fill(null),
    correctCount: apiHook.correctCount ?? 0,
    currentQuestionIndex: apiHook.currentQuestionIndex ?? 0,
    isSubmitting: apiHook.isSubmitting ?? false,
    hasSubmitted: apiHook.hasSubmitted ?? false,
    isCompleted: apiHook.isCompleted ?? false,
    totalQuestions: FIXED_TOTAL_QUESTIONS,

    // Methods from API hook
    handleAnswerSelect: apiHook.handleAnswerSelect,
    updateAnswer: apiHook.updateAnswer,
    handleContinue: apiHook.handleContinue,
    finish: apiHook.finish,

    isSampleMode: false,
    isApiMode: false,
    playerName: getPlayerName(),
  };
}
