import { useEffect, useRef, useState } from "react";
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
  const [bot1Position, setBot1Position] = useState(0);
  const [bot2Position, setBot2Position] = useState(0);
  const bot1PositionRef = useRef(bot1Position);
  const bot2PositionRef = useRef(bot2Position);

  useEffect(() => {
    bot1PositionRef.current = bot1Position;
    bot2PositionRef.current = bot2Position;
  }, [bot1Position, bot2Position]);
  
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
      console.log("[TetQuizGame] Incorrect answer");
    },
  });

  useEffect(() => {
    if (currentQuestionIndex === 0) {
      setBot1Position(0);
      setBot2Position(0);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (hasSubmitted) {
      const botsAvailable = [];
      if (bot1PositionRef.current < totalQuestions) botsAvailable.push(1);
      if (bot2PositionRef.current < totalQuestions) botsAvailable.push(2);

      let botToMove = null;

      if (!currentResult?.isCorrect) {
        if (botsAvailable.length > 0) {
          botToMove = botsAvailable[Math.floor(Math.random() * botsAvailable.length)];
        }
      } else {
        if (botsAvailable.length > 0 && Math.random() < 0.6) {
          botToMove = botsAvailable[Math.floor(Math.random() * botsAvailable.length)];
        }
      }

      if (botToMove === 1) {
        setBot1Position(prev => Math.min(prev + 1, totalQuestions));
      } else if (botToMove === 2) {
        setBot2Position(prev => Math.min(prev + 1, totalQuestions));
      }
    }
  }, [hasSubmitted, currentResult, totalQuestions]);

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

  const mainMaxWidth = "w-[45%]";

  const playerPosition = correctCount;

  const isJumping = {
    player: hasSubmitted && currentResult?.isCorrect === true,
    bot1: hasSubmitted && currentResult?.isCorrect === true,
    bot2: hasSubmitted && currentResult?.isCorrect === true,
  };

  return (
    <div
      className="game-container flex flex-col"
    >
      <div className="w-full flex flex-col pt-[1cqw] pb-[1cqw]">
        {!isCompleted && (
          <header className="game-header">
            <ScoreDisplay
              score={correctCount}
              total={totalQuestions}
              currentIndex={currentQuestionIndex}
              answerResults={answers}
              banhChungImage={assets.banhChung}
            />
          </header>
        )}

        <main 
          className={`flex-1 flex flex-col px-[2%] pb-[0.5cqw] ${mainMaxWidth} mx-auto`}
          style={{ containerType: 'inline-size' }}
        >
          {isCompleted ? (
            <WinScreen
              score={correctCount}
              onRestart={onFinish}
              mascotImage={assets.mascotRed}
            />
          ) : (
            <>
              <QuestionBox
                question={quiz.text ?? ""}
                questionNumber={currentQuestionIndex + 1}
                type="text"
                imageUrl={undefined}
                questionFrame={assets.questionFrame}
                uiConfig={uiConfig.questionBox}
              />

              {quiz.audioUrl && (
                <div className="flex justify-center mb-[1cqw]">
                  <audio src={quiz.audioUrl} controls className="max-w-full" />
                </div>
              )}

              <div
                className="answers-grid"
                key={currentQuestionIndex}
              >
                {quiz.answers?.map((answer: QuizAnswer, idx: number) => {
                  const isSelected = selectedAnswer?.id === answer.id;

                  let isCorrectAnswer: boolean | null = null;
                  if (hasSubmitted && currentResult && isSelected) {
                    isCorrectAnswer = currentResult.isCorrect;
                  }

                  return (
                    <AnswerButton
                      key={answer.id}
                      answer={answer.content ?? ""}
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

              <div className="flex justify-center mt-0">
                <SubmitButton
                  isAnswered={hasSubmitted}
                  isDisabled={(!selectedAnswer && !hasSubmitted) || isSubmitting}
                  onClick={hasSubmitted ? onContinue : onSubmit}
                  submitButtonImage={assets.submitButton}
                  continueButtonImage={assets.continueButton}
                  uiConfig={uiConfig.actionButton}
                />
              </div>

              {hasSubmitted && currentResult?.explanation && (
                <div className="mt-[1cqw] px-[1cqw] py-[0.5cqw] bg-background/80 rounded-[1cqw] text-center">
                  <p className="text-[1.5cqw] text-foreground/70">{currentResult.explanation}</p>
                </div>
              )}
            </>
          )}
        </main>
        
        {/* Race Track Component - Fixed Position */}
        {!isCompleted && (
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
        )}
      </div>
    </div>
  );
};

export default TetQuizGame;
