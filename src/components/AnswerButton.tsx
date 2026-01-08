import answerBg from "@/assets/answer-button.png";

interface AnswerButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  state: "normal" | "correct" | "incorrect";
  label: string;
}

const AnswerButton = ({ text, onClick, disabled, state, label }: AnswerButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`answer-btn w-full relative ${state}`}
    >
      <img
        src={answerBg}
        alt="Answer background"
        className="w-full h-auto"
        style={{ 
          filter: state === "correct" 
            ? "hue-rotate(80deg) saturate(1.2)" 
            : state === "incorrect" 
            ? "hue-rotate(-20deg) saturate(1.3)" 
            : "none" 
        }}
      />
      <div className="absolute inset-0 flex items-center px-4">
        <span className="font-bold text-tet-brown text-lg mr-3">{label}</span>
        <span className="font-medium text-foreground text-sm flex-1 text-left">
          {text}
        </span>
      </div>
    </button>
  );
};

export default AnswerButton;
