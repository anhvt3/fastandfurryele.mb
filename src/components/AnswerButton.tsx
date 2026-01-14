import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

interface AnswerButtonProps {
  answer: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  isDisabled: boolean;
  isAnswered: boolean;
  correctIndex: number;
  onClick: () => void;
}

const AnswerButton = ({
  answer,
  index,
  isSelected,
  isCorrect,
  isDisabled,
  isAnswered,
  correctIndex,
  onClick,
}: AnswerButtonProps) => {
  const getButtonClass = (): string => {
    if (isAnswered) {
      // After submission
      if (index === correctIndex) {
        return "answer-btn-correct";
      }
      if (isSelected && !isCorrect) {
        return "answer-btn-wrong";
      }
      return "answer-btn-default opacity-70";
    }

    // Before submission
    if (isSelected) {
      return "answer-btn-selected";
    }
    return "answer-btn-default";
  };

  const labels = ["A", "B", "C", "D"];

  // Determine letter color based on answer state
  const getLetterColor = (): string => {
    if (isAnswered) {
      if (index === correctIndex) {
        return "#2acb42"; // Correct answer letter color
      }
      if (isSelected && !isCorrect) {
        return "#ff3b30"; // Wrong answer letter color
      }
    }
    return "#0a0a48"; // Default letter color
  };

  // Determine circle background color based on answer state
  const getCircleBackground = (): string => {
    if (isAnswered) {
      if (index === correctIndex) {
        return "#C8F7C5"; // Correct answer circle fill
      }
      if (isSelected && !isCorrect) {
        return "#FADBD8"; // Wrong answer circle fill
      }
    }
    return "hsl(var(--primary) / 0.2)"; // Default circle background
  };

  // Check if answer contains LaTeX ($ delimiters)
  const renderAnswerText = () => {
    const hasInlineMath = answer.includes("$");
    
    if (hasInlineMath) {
      const parts = answer.split(/\$/);
      return (
        <span 
          className="font-semibold text-left leading-tight font-sf-compact" 
          style={{ color: "#0a0a48", fontSize: "16px" }}
        >
          {parts.map((part, idx) => 
            idx % 2 === 0 ? (
              <span key={idx}>{part}</span>
            ) : (
              <InlineMath key={idx} math={part} />
            )
          )}
        </span>
      );
    }
    
    return (
      <span 
        className="font-semibold text-left leading-tight font-sf-compact" 
        style={{ color: "#0a0a48", fontSize: "16px" }}
      >
        {answer}
      </span>
    );
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        answer-btn rounded-2xl p-2.5 min-h-[60px]
        flex items-center gap-3
        ${getButtonClass()}
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer active:scale-95"}
        transition-all duration-200
      `}
    >
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 transition-colors duration-200 font-sf-compact"
        style={{ color: getLetterColor(), backgroundColor: getCircleBackground(), fontSize: "16px" }}
      >
        {labels[index]}
      </span>
      {renderAnswerText()}
    </button>
  );
};

export default AnswerButton;
