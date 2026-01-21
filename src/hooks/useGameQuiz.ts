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

// Types matching the library's expected format
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

// Check if sample mode is enabled via query string
function isSampleMode(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('sample') === 'true';
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
  
  // Sample data mode state
  const [sampleQuestionIndex, setSampleQuestionIndex] = useState(0);
  const [sampleSelectedAnswer, setSampleSelectedAnswer] = useState<QuizAnswer | null>(null);
  const [sampleAnswers, setSampleAnswers] = useState<(boolean | null)[]>(
    Array(FIXED_TOTAL_QUESTIONS).fill(null)
  );
  const [sampleHasSubmitted, setSampleHasSubmitted] = useState(false);
  const [sampleCurrentResult, setSampleCurrentResult] = useState<QuizResult | null>(null);
  const [sampleIsCompleted, setSampleIsCompleted] = useState(false);
  const [sampleCorrectCount, setSampleCorrectCount] = useState(0);

  // API mode - use the actual hook
  const apiHook = useGameAPI({
    onAnswerCorrect: options.onAnswerCorrect,
    onAnswerIncorrect: options.onAnswerIncorrect,
  });

  // Sample mode handlers
  const sampleQuiz = useMemo(() => {
    if (!useSampleData) return null;
    const question = sampleQuestions[sampleQuestionIndex];
    return question ? convertSampleToQuiz(question) : null;
  }, [useSampleData, sampleQuestionIndex]);

  const handleSampleAnswerSelect = (answer: QuizAnswer) => {
    if (sampleHasSubmitted) return;
    setSampleSelectedAnswer(answer);
  };

  const handleSampleUpdateAnswer = () => {
    if (!sampleSelectedAnswer || sampleHasSubmitted) return;
    
    const currentQuestion = sampleQuestions[sampleQuestionIndex];
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

  // Return unified interface
  if (useSampleData) {
    return {
      // State
      quiz: sampleQuiz,
      selectedAnswer: sampleSelectedAnswer,
      currentResult: sampleCurrentResult,
      answers: sampleAnswers,
      correctCount: sampleCorrectCount,
      currentQuestionIndex: sampleQuestionIndex,
      isSubmitting: false,
      hasSubmitted: sampleHasSubmitted,
      isCompleted: sampleIsCompleted,
      totalQuestions: FIXED_TOTAL_QUESTIONS,
      
      // Methods
      handleAnswerSelect: handleSampleAnswerSelect,
      updateAnswer: handleSampleUpdateAnswer,
      handleContinue: handleSampleContinue,
      finish: handleSampleFinish,
      
      // Meta
      isSampleMode: true,
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
    
    // Meta
    isSampleMode: false,
  };
}
