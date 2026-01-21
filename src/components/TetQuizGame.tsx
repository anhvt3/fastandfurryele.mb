/**
 * TetQuizGame - Main game component
 * 
 * Uses useGameQuiz hook following the Complete Quiz Flow Example pattern:
 * - quiz: Current question data
 * - selectedAnswer: Currently selected answer
 * - currentResult: Result after submission (isCorrect, isLastQuestion)
 * - answers: Array of results (true/false/null)
 * - correctCount: Number of correct answers
 * - currentQuestionIndex: Current question index
 * - isSubmitting: Whether answer is being submitted
 * - hasSubmitted: Whether current question has been answered
 * - isCompleted: Whether quiz is finished
 * - handleAnswerSelect: Select an answer
 * - updateAnswer: Submit the selected answer
 * - handleContinue: Move to next question
 * - finish: Signal quiz completion
 */

import { useEffect } from "react";
import { useDevice } from "@/context/DeviceContext";
import ScoreDisplay from "./ScoreDisplay";
import QuestionBox from "./QuestionBox";
import AnswerButton from "./AnswerButton";
import SubmitButton from "./SubmitButton";
import RaceTrack from "./RaceTrack";
import WinScreen from "./WinScreen";
import { useGameQuiz, QuizAnswer } from "@/hooks/useGameQuiz";
import { useGameAudio } from "@/hooks/useGameAudio";

const TetQuizGame = () => {
  const { assets, uiConfig, deviceType } = useDevice();
  const { playButtonClick, playCorrectAnswer, playWrongAnswer, playFinishGame } = useGameAudio();

  // Use the unified game quiz hook (supports both API and sample modes)
  const {
    quiz,
    selectedAnswer,
    currentResult,
    answers,
    correctCount,
    currentQuestionIndex,
    isSubmitting,
    hasSubmitted,
    isCompleted,
    totalQuestions,
    handleAnswerSelect,
    updateAnswer,
    handleContinue,
    finish,
    isSampleMode,
  } = useGameQuiz({
    onAnswerCorrect: ({ currentQuestionIndex }) => {
      playCorrectAnswer();
      console.log(`[TetQuizGame] Question ${currentQuestionIndex + 1} answered correctly!`);
    },
    onAnswerIncorrect: () => {
      playWrongAnswer();
      console.log('[TetQuizGame] Incorrect answer');
    },
  });

  // Debug: verify which device + background is actually being used
  useEffect(() => {
    console.log("[TetQuizGame] deviceType:", deviceType);
    console.log("[TetQuizGame] background:", assets.background);
    console.log("[TetQuizGame] isSampleMode:", isSampleMode);
  }, [deviceType, assets.background, isSampleMode]);

  // Play finish sound when game completes
  useEffect(() => {
    if (isCompleted) {
      playFinishGame();
    }
  }, [isCompleted, playFinishGame]);

  // Handle answer selection with sound
  const onAnswerSelect = (answer: QuizAnswer) => {
    if (hasSubmitted || isSubmitting) return;
    playButtonClick();
    handleAnswerSelect(answer);
  };

  // Handle submit with sound
  const onSubmit = () => {
    if (!selectedAnswer || hasSubmitted || isSubmitting) return;
    playButtonClick();
    updateAnswer();
  };

  // Handle continue with sound
  const onContinue = () => {
    playButtonClick();
    handleContinue();
  };

  // Handle finish/restart
  const onFinish = () => {
    playButtonClick();
    finish();
    // In sample mode, reload the page to restart
    if (isSampleMode) {
      window.location.reload();
    }
  };

  // Show loading state while waiting for first question
  if (!quiz) {
    return (
      <div 
        className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center" 
        style={{ backgroundImage: `url(${assets.background})` }}
      >
        <div className="text-foreground font-roboto text-xl">Đang tải câu hỏi...</div>
      </div>
    );
  }

  // Apply different max-width based on device type
  const mainMaxWidth = deviceType === 'desktop' ? 'max-w-2xl' : 'max-w-md';

  // Calculate player/bot positions based on correct count
  // Player position = correctCount, bots move randomly (simulated)
  const playerPosition = correctCount;
  const bot1Position = Math.min(Math.floor(currentQuestionIndex * 0.6), totalQuestions);
  const bot2Position = Math.min(Math.floor(currentQuestionIndex * 0.4), totalQuestions);

  // Determine if mascots should jump (only when answer is just submitted and correct)
  const isJumping = {
    player: hasSubmitted && currentResult?.isCorrect === true,
    bot1: false,
    bot2: false,
  };

  return (
    <div 
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col overflow-y-auto"
      style={{ backgroundImage: `url(${assets.background})` }}
    >
      <div className="w-full flex flex-col pt-8 pb-4 lg:pt-16">
        {/* Score Display - Progress bar with totalQuestions items */}
        {!isCompleted && (
          <header className="flex justify-center pb-4 lg:pb-6">
            <ScoreDisplay 
              score={correctCount} 
              total={totalQuestions} 
              currentIndex={currentQuestionIndex} 
              answerResults={answers}
              banhChungImage={assets.banhChung}
              uiConfig={uiConfig.scoreDisplay}
            />
          </header>
        )}

        {/* Main Content */}
        <main className={`flex-1 flex flex-col px-4 pb-1 ${mainMaxWidth} mx-auto w-full`}>
          {isCompleted ? (
            /* Completion Screen */
            <WinScreen 
              score={correctCount} 
              totalQuestions={totalQuestions} 
              onRestart={onFinish}
              mascotImage={assets.mascotRed}
              uiConfig={uiConfig.winScreen}
            />
          ) : (
            <>
              {/* Question Box - Uses quiz.text which may contain HTML/LaTeX */}
              <QuestionBox 
                question={quiz.text ?? ''} 
                questionNumber={currentQuestionIndex + 1}
                type="text"
                imageUrl={undefined}
                questionFrame={assets.questionFrame}
                uiConfig={uiConfig.questionBox}
              />

              {/* Audio player if question has audio */}
              {quiz.audioUrl && (
                <div className="flex justify-center mb-4">
                  <audio src={quiz.audioUrl} controls className="max-w-full" />
                </div>
              )}

              {/* Answer Buttons - Map quiz.answers to AnswerButton components */}
              <div className="flex flex-col gap-2 w-full px-4 mt-4" key={currentQuestionIndex}>
                {quiz.answers?.map((answer: QuizAnswer, idx: number) => {
                  const isSelected = selectedAnswer?.id === answer.id;
                  
                  // Determine if this answer is correct (only show after submission)
                  let isCorrectAnswer: boolean | null = null;
                  if (hasSubmitted && currentResult && isSelected) {
                    isCorrectAnswer = currentResult.isCorrect;
                  }
                  
                  return (
                    <AnswerButton
                      key={answer.id}
                      answer={answer.content ?? ''}
                      index={idx}
                      isSelected={isSelected}
                      isCorrect={isCorrectAnswer}
                      isDisabled={hasSubmitted || isSubmitting}
                      isAnswered={hasSubmitted}
                      onClick={() => onAnswerSelect(answer)}
                    />
                  );
                })}
              </div>

              {/* Submit/Continue Button */}
              <div className="flex justify-center mt-6">
                <SubmitButton
                  isAnswered={hasSubmitted}
                  isDisabled={(!selectedAnswer && !hasSubmitted) || isSubmitting}
                  onClick={hasSubmitted ? onContinue : onSubmit}
                  submitButtonImage={assets.submitButton}
                  continueButtonImage={assets.continueButton}
                  uiConfig={uiConfig.actionButton}
                />
              </div>

              {/* Result display (optional - explanation) */}
              {hasSubmitted && currentResult?.explanation && (
                <div className="mt-4 px-4 py-2 bg-background/80 rounded-lg text-center">
                  <p className="text-sm text-foreground/70">{currentResult.explanation}</p>
                </div>
              )}

              {/* Race Track */}
              <div className="mt-2">
                <RaceTrack
                  playerPosition={playerPosition}
                  bot1Position={bot1Position}
                  bot2Position={bot2Position}
                  isJumping={isJumping}
                  mascotRed={assets.mascotRed}
                  mascotGreen={assets.mascotGreen}
                  mascotBlue={assets.mascotBlue}
                  startLine={assets.startLine}
                  finishLine={assets.finishLine}
                  uiConfig={uiConfig}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default TetQuizGame;
