import { useState, useCallback } from "react";
import background from "@/assets/background.png";
import submitButton from "@/assets/submit-button.png";
import continueButton from "@/assets/continue-button.png";
import ScoreDisplay from "./ScoreDisplay";
import QuestionBox from "./QuestionBox";
import AnswerButton from "./AnswerButton";
import RaceTrack from "./RaceTrack";
import WinScreen from "./WinScreen";
import { questions } from "@/data/questions";

const TetQuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [bot1Position, setBot1Position] = useState(0);
  const [bot2Position, setBot2Position] = useState(0);
  const [isJumping, setIsJumping] = useState({ player: false, bot1: false, bot2: false });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null || isAnswered || gameOver) return;

    setIsAnswered(true);
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;

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

    // Reset jumping after animation
    setTimeout(() => {
      setIsJumping({ player: false, bot1: false, bot2: false });
    }, 500);
  }, [selectedAnswer, isAnswered, gameOver, currentQuestion.correctIndex]);

  const handleContinue = useCallback(() => {
    const currentScore = score;

    if (currentQuestionIndex >= questions.length - 1 || currentScore >= 5) {
      setGameOver(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }

    // Reset for next question
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentQuestionIndex, score]);

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setPlayerPosition(0);
    setBot1Position(0);
    setBot2Position(0);
    setIsJumping({ player: false, bot1: false, bot2: false });
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameOver(false);
  };

  return (
    <div className="game-container flex flex-col" style={{ backgroundImage: `url(${background})` }}>
      {/* Score Display - Top */}
      <div className="pt-4 pb-2">
        <ScoreDisplay score={score} total={5} currentIndex={currentQuestionIndex} />
      </div>

      {/* Question Box */}
      <div className="px-2 py-0">
        <QuestionBox question={currentQuestion.question} questionNumber={currentQuestionIndex + 1} />
      </div>

      {/* Answer Buttons */}
      <div className="flex flex-col gap-1 px-4 py-0">
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

      {/* Answer/Continue Button - Same position, overlapping */}
      <div className="flex justify-center px-4 py-0">
        <div className="relative w-32 h-[35px]">
          {/* Answer Button (TRẢ LỜI) */}
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null || isAnswered}
            className={`absolute inset-0 transition-opacity duration-200 ${
              isAnswered ? "opacity-0 pointer-events-none" : "opacity-100"
            } ${selectedAnswer === null ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"}`}
          >
            <img src={submitButton} alt="Trả lời" className="w-full h-full object-contain" />
          </button>

          {/* Continue Button (TIẾP TỤC) */}
          <button
            onClick={handleContinue}
            className={`absolute inset-0 transition-opacity duration-200 ${
              isAnswered ? "opacity-100 cursor-pointer active:scale-95" : "opacity-0 pointer-events-none"
            }`}
          >
            <img src={continueButton} alt="Tiếp tục" className="w-full h-full object-contain" />
          </button>
        </div>
      </div>

      {/* Race Track - Bottom */}
      <RaceTrack
        playerPosition={playerPosition}
        bot1Position={bot1Position}
        bot2Position={bot2Position}
        isJumping={isJumping}
      />

      {/* Win/Lose Screen */}
      {gameOver && <WinScreen score={score} totalQuestions={questions.length} onRestart={handleRestart} />}
    </div>
  );
};

export default TetQuizGame;
