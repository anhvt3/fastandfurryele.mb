import { useState, useCallback, useEffect } from "react";
import { useDevice } from "@/context/DeviceContext";
import ScoreDisplay from "./ScoreDisplay";
import QuestionBox from "./QuestionBox";
import AnswerButton from "./AnswerButton";
import SubmitButton from "./SubmitButton";
import RaceTrack from "./RaceTrack";
import WinScreen from "./WinScreen";
import { sampleQuestions, Question } from "@/data/questions";
import { fetchQuestions } from "@/services/questionApi";
import { USE_SAMPLE_DATA } from "@/config/gameConfig";
import { useGameAudio } from "@/hooks/useGameAudio";

const TetQuizGame = () => {
  const { assets, uiConfig, deviceType } = useDevice();

  // Debug: verify which device + background is actually being used
  useEffect(() => {
    console.log("[TetQuizGame] deviceType:", deviceType);
    console.log("[TetQuizGame] background:", assets.background);
  }, [deviceType, assets.background]);
  
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [isLoading, setIsLoading] = useState(!USE_SAMPLE_DATA);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [bot1Position, setBot1Position] = useState(0);
  const [bot2Position, setBot2Position] = useState(0);
  const [isJumping, setIsJumping] = useState({ player: false, bot1: false, bot2: false });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [answerResults, setAnswerResults] = useState<(boolean | null)[]>(Array(5).fill(null));

  const { playButtonClick, playCorrectAnswer, playWrongAnswer, playFinishGame } = useGameAudio();

  // Load questions based on data source configuration
  useEffect(() => {
    if (USE_SAMPLE_DATA) {
      setQuestions(sampleQuestions);
      setIsLoading(false);
    } else {
      // Load from API
      setIsLoading(true);
      fetchQuestions()
        .then((data) => {
          setQuestions(data);
          setAnswerResults(Array(data.length).fill(null));
        })
        .catch((error) => {
          console.error("Failed to load questions from API, using sample data:", error);
          setQuestions(sampleQuestions);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    playButtonClick();
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null || isAnswered || gameOver) return;

    playButtonClick();
    setIsAnswered(true);
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;

    // Play correct or wrong answer sound
    if (isCorrect) {
      playCorrectAnswer();
    } else {
      playWrongAnswer();
    }

    // Xác định di chuyển
    const playerWillMove = isCorrect;
    const bot1WillMove = Math.random() < 0.5;
    const bot2WillMove = Math.random() < 0.5;

    // Kích hoạt animation nhảy
    setIsJumping({
      player: playerWillMove,
      bot1: bot1WillMove,
      bot2: bot2WillMove,
    });

    // Cập nhật vị trí và điểm số
    if (playerWillMove) {
      setScore((prev) => prev + 1);
      setPlayerPosition((prev) => Math.min(prev + 1, 5));
    }
    if (bot1WillMove) {
      setBot1Position((prev) => Math.min(prev + 1, 5));
    }
    if (bot2WillMove) {
      setBot2Position((prev) => Math.min(prev + 1, 5));
    }

    // Track answer result for current question
    setAnswerResults((prev) => {
      const newResults = [...prev];
      newResults[currentQuestionIndex] = isCorrect;
      return newResults;
    });

    // Reset jumping after animation
    setTimeout(() => {
      setIsJumping({ player: false, bot1: false, bot2: false });
    }, 500);
  }, [selectedAnswer, isAnswered, gameOver, currentQuestion?.correctIndex, playButtonClick, playCorrectAnswer, playWrongAnswer, currentQuestionIndex]);

  const handleContinue = useCallback(() => {
    playButtonClick();
    const currentScore = score;

    if (currentQuestionIndex >= questions.length - 1 || currentScore >= 5) {
      playFinishGame();
      setGameOver(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }

    // Reset for next question
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentQuestionIndex, score, questions.length, playButtonClick, playFinishGame]);

  const handleRestart = () => {
    playButtonClick();
    setCurrentQuestionIndex(0);
    setScore(0);
    setPlayerPosition(0);
    setBot1Position(0);
    setBot2Position(0);
    setIsJumping({ player: false, bot1: false, bot2: false });
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameOver(false);
    setAnswerResults(Array(questions.length).fill(null));
  };

  // Show loading state while fetching from API
  if (isLoading || !currentQuestion) {
    return (
      <div 
        className="game-container flex items-center justify-center" 
        style={{ backgroundImage: `url(${assets.background})` }}
      >
        <div className="text-foreground font-sf-compact text-xl">Đang tải câu hỏi...</div>
      </div>
    );
  }

  // Apply different max-width based on device type
  const mainMaxWidth = deviceType === 'desktop' ? 'max-w-2xl' : 'max-w-md';

  return (
    <div 
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col overflow-y-auto"
      style={{ backgroundImage: `url(${assets.background})` }}
    >
      <div className="w-full flex flex-col pt-8 pb-4 lg:pt-16">
        {/* Score Display */}
        {!gameOver && (
          <header className="flex justify-center pb-4 lg:pb-6">
            <ScoreDisplay 
              score={score} 
              total={5} 
              currentIndex={currentQuestionIndex} 
              answerResults={answerResults}
              banhChungImage={assets.banhChung}
              uiConfig={uiConfig.scoreDisplay}
            />
          </header>
        )}

        {/* Main Content */}
        <main className={`flex-1 flex flex-col px-4 pb-1 ${mainMaxWidth} mx-auto w-full`}>
          {gameOver ? (
            <WinScreen 
              score={score} 
              totalQuestions={questions.length} 
              onRestart={handleRestart}
              mascotImage={assets.mascotRed}
              uiConfig={uiConfig.winScreen}
            />
          ) : (
            <>
              {/* Question Box */}
              <QuestionBox 
                question={currentQuestion.question} 
                questionNumber={currentQuestionIndex + 1}
                type={currentQuestion.type}
                imageUrl={currentQuestion.imageUrl}
                questionFrame={assets.questionFrame}
                uiConfig={uiConfig.questionBox}
              />

              {/* Answer Buttons */}
              <div className="flex flex-col gap-2 w-full px-4 mt-4" key={currentQuestionIndex}>
                {currentQuestion.answers.map((answer, index) => (
                  <AnswerButton
                    key={index}
                    answer={answer}
                    index={index}
                    correctIndex={currentQuestion.correctIndex}
                    isSelected={selectedAnswer === index}
                    isCorrect={selectedAnswer === index ? selectedAnswer === currentQuestion.correctIndex : null}
                    isDisabled={isAnswered}
                    isAnswered={isAnswered}
                    onClick={() => handleSelectAnswer(index)}
                  />
                ))}
              </div>

              {/* Submit/Continue Button */}
              <div className="flex justify-center mt-6">
                <SubmitButton
                  isAnswered={isAnswered}
                  isDisabled={selectedAnswer === null && !isAnswered}
                  onClick={isAnswered ? handleContinue : handleSubmitAnswer}
                  submitButtonImage={assets.submitButton}
                  continueButtonImage={assets.continueButton}
                  uiConfig={uiConfig.actionButton}
                />
              </div>

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