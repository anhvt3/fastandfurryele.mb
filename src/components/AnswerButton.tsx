import HtmlContent from "./HtmlContent";

interface AnswerButtonProps {
  answer: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null; // null = not answered yet, true/false = result after submission
  isDisabled: boolean;
  isAnswered: boolean;
  correctIndex?: number; // Optional - only available in sample mode
  onClick: () => void;
}

const AnswerButton = ({
  answer,
  index,
  isSelected,
  isCorrect,
  isDisabled,
  isAnswered,
  correctIndex = -1, // Default to -1 (unknown) for API mode
  onClick,
}: AnswerButtonProps) => {
  /**
   * Button state logic:
   * - Before answer: default or selected state
   * - After answer:
   *   - If this is selected AND correct: show correct (green)
   *   - If this is selected AND wrong: show wrong (red)
   *   - If this is the correct answer (known via correctIndex): show correct (green)
   *   - Otherwise: show default with reduced opacity
   */
  const getButtonClass = (): string => {
    if (isAnswered) {
      // Selected answer - show result
      if (isSelected) {
        return isCorrect ? "answer-btn-correct" : "answer-btn-wrong";
      }
      // Known correct answer (sample mode)
      if (correctIndex >= 0 && index === correctIndex) {
        return "answer-btn-correct";
      }
      // Other answers - fade out
      return "answer-btn-default opacity-70";
    }

    // Before submission
    if (isSelected) {
      return "answer-btn-selected";
    }
    return "answer-btn-default";
  };

  const labels = ["A", "B", "C", "D"];

  const getLetterColor = (): string => {
    if (isAnswered) {
      // Selected answer
      if (isSelected) {
        return isCorrect ? "#2acb42" : "#ff3b30";
      }
      // Known correct answer (sample mode)
      if (correctIndex >= 0 && index === correctIndex) {
        return "#2acb42";
      }
    }
    return "#4a2c00";
  };

  const getCircleBackground = (): string => {
    if (isAnswered) {
      // Selected answer
      if (isSelected) {
        return isCorrect ? "#C8F7C5" : "#FADBD8";
      }
      // Known correct answer (sample mode)
      if (correctIndex >= 0 && index === correctIndex) {
        return "#C8F7C5";
      }
    }
    return "rgba(139, 69, 19, 0.2)";
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        answer-btn rounded-2xl p-2.5 min-h-[3.75rem]
        flex items-center gap-3
        ${getButtonClass()}
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer active:scale-95"}
        transition-all duration-200
      `}
    >
      <span 
        className="answer-label w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
        style={{ color: getLetterColor(), backgroundColor: getCircleBackground() }}
      >
        {labels[index] ?? (index + 1)}
      </span>
      <span className="answer-text">
        <HtmlContent 
          html={answer}
          className="font-semibold text-left leading-tight min-w-0 break-all"
        />
      </span>
    </button>
  );
};

export default AnswerButton;
