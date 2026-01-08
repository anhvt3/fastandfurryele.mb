// import answerBg from "@/assets/answer-button.png";

// interface AnswerButtonProps {
//   text: string;
//   onClick: () => void;
//   disabled: boolean;
//   state: "normal" | "correct" | "incorrect";
//   label: string;
// }

// const AnswerButton = ({ text, onClick, disabled, state, label }: AnswerButtonProps) => {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`answer-btn w-full relative ${state}`}
//     >
//       <img
//         src={answerBg}
//         alt="Answer background"
//         className="w-full h-auto"
//         style={{
//           filter: state === "correct"
//             ? "hue-rotate(80deg) saturate(1.2)"
//             : state === "incorrect"
//             ? "hue-rotate(-20deg) saturate(1.3)"
//             : "none"
//         }}
//       />
//       <div className="absolute inset-0 flex items-center px-4">
//         <span className="font-bold text-tet-brown text-lg mr-3">{label}</span>
//         <span className="font-medium text-foreground text-sm flex-1 text-left">
//           {text}
//         </span>
//       </div>
//     </button>
//   );
// };

// export default AnswerButton;

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
        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] lg:text-[16px] shrink-0 transition-colors duration-200"
        style={{ color: getLetterColor(), backgroundColor: getCircleBackground() }}
      >
        {labels[index]}
      </span>
      <span className="font-semibold text-left text-[12px] lg:text-[16px] leading-tight" style={{ color: "#0a0a48" }}>
        {answer}
      </span>
    </button>
  );
};

export default AnswerButton;
