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
  correctIndex = -1,
  onClick,
}: AnswerButtonProps) => {
  /**
   * Button state logic mapping to CSS classes:
   * - default: .answer-container
   * - selected: .selected
   * - correct: .correct
   * - wrong: .wrong
   */
  const getContainerClass = (): string => {
    let classes = "answer-container";

    if (isAnswered) {
      if (isSelected) {
        if (isCorrect) {
          classes += " correct";
        } else {
          classes += " wrong selected";
        }
      } 
      else if ((correctIndex >= 0 && index === correctIndex) || (isCorrect === false && index === correctIndex)) {
        classes += " correct";
      }
      else {
         classes += " wrong";
      }
    } else {
      if (isSelected) {
        classes += " selected";
      }
    }

    if (isDisabled) {
        // Ensure pointer events are off if disabled (CSS handles .correct/.wrong pointer-events)
        // classes += " disabled"; // If we had a disabled class
    }

    return classes;
  };

  const labels = ["A", "B", "C", "D"];

  return (
    <div
      onClick={() => !isDisabled && onClick()}
      className={getContainerClass()}
      // Selectively disable pointer events via inline style if generic disabled state 
      // that isn't covered by .correct/.wrong class pointer-events: none
      style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
    >
      <div className="answer-label">
        {labels[index] ?? index + 1}
      </div>
      <div className="answer-text">
        <HtmlContent html={answer} className="font-semibold" />
      </div>
    </div>
  );
};

export default AnswerButton;
