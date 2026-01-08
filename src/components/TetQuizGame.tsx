import { useState, useCallback } from "react";
import background from "@/assets/background.png";
import ScoreDisplay from "./ScoreDisplay";
import QuestionBox from "./QuestionBox";
import AnswerButton from "./AnswerButton";
import RaceTrack from "./RaceTrack";
import WinScreen from "./WinScreen";
import { questions } from "@/data/questions";

type AnswerState = "normal" | "correct" | "incorrect";

const TetQuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [bot1Position, setBot1Position] = useState(0);
  const [bot2Position, setBot2Position] = useState(0);
  const [isJumping, setIsJumping] = useState({ player: false, bot1: false, bot2: false });
  const [answerStates, setAnswerStates] = useState<AnswerState[]>(["normal", "normal", "normal", "normal"]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      if (isAnswering || gameOver) return;

      setIsAnswering(true);
      const isCorrect = selectedIndex === currentQuestion.correctIndex;

      // Update answer states to show correct/incorrect
      const newStates: AnswerState[] = answerStates.map((_, idx) => {
        if (idx === currentQuestion.correctIndex) return "correct";
        if (idx === selectedIndex && !isCorrect) return "incorrect";
        return "normal";
      });
      setAnswerStates(newStates);

      // Trigger jumping animations
      if (isCorrect) {
        // Player always advances on correct answer
        setIsJumping({ player: true, bot1: true, bot2: true });

        const newScore = score + 1;
        setScore(newScore);
        // setPlayerPosition(newScore);
        setPlayerPosition(Math.min(newScore, 5));

        // Bots advance slower (random 0.3-0.7 of player step, but never exceed player)
        setBot1Position((prev) => Math.min(prev + Math.random() * 0.4 + 0.3, newScore - 0.3));
        setBot2Position((prev) => Math.min(prev + Math.random() * 0.4 + 0.2, newScore - 0.5));
      } else {
        // Player doesn't advance, bots advance slightly
        setIsJumping({ player: false, bot1: true, bot2: true });
        setBot1Position((prev) => Math.min(prev + Math.random() * 0.2 + 0.1, playerPosition - 0.2));
        setBot2Position((prev) => Math.min(prev + Math.random() * 0.15 + 0.05, playerPosition - 0.4));
      }

      // Reset jumping after animation
      setTimeout(() => {
        setIsJumping({ player: false, bot1: false, bot2: false });
      }, 500);

      // Move to next question or end game
      setTimeout(() => {
        setAnswerStates(["normal", "normal", "normal", "normal"]);

        if (currentQuestionIndex >= questions.length - 1 || score + (isCorrect ? 1 : 0) >= 5) {
          setGameOver(true);
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
        setIsAnswering(false);
      }, 1200);
    },
    [currentQuestionIndex, currentQuestion, score, isAnswering, gameOver, playerPosition, answerStates],
  );

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setPlayerPosition(0);
    setBot1Position(0);
    setBot2Position(0);
    setIsJumping({ player: false, bot1: false, bot2: false });
    setAnswerStates(["normal", "normal", "normal", "normal"]);
    setIsAnswering(false);
    setGameOver(false);
  };

  const answerLabels = ["A", "B", "C", "D"];

  return (
    <div className="game-container flex flex-col" style={{ backgroundImage: `url(${background})` }}>
      {/* Score Display - Top */}
      <div className="pt-4 pb-2">
        <ScoreDisplay score={score} total={5} />
      </div>

      {/* Question Box */}
      <div className="px-2 py-2">
        <QuestionBox question={currentQuestion.question} questionNumber={currentQuestionIndex + 1} />
      </div>

      {/* Answer Buttons */}
      <div className="flex flex-col gap-2 px-4 py-2 flex-1">
        {currentQuestion.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            text={answer}
            label={answerLabels[index]}
            onClick={() => handleAnswer(index)}
            disabled={isAnswering}
            state={answerStates[index]}
          />
        ))}
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
