interface SubmitButtonUIConfig {
  scale: number;
  containerPaddingX: number;
  containerPaddingY: number;
  buttonWidth: number;
  buttonHeight: number;
  disabledOpacity: number;
  activeScale: number;
  transitionDuration: number;
}

interface SubmitButtonProps {
  isAnswered: boolean;
  isDisabled: boolean;
  onClick: () => void;
  submitButtonImage: string;
  continueButtonImage: string;
  uiConfig: SubmitButtonUIConfig;
}

const SubmitButton = ({ 
  isAnswered, 
  isDisabled, 
  onClick,
  submitButtonImage,
  continueButtonImage,
  uiConfig
}: SubmitButtonProps) => {
  const { scale, buttonHeight, disabledOpacity } = uiConfig;
  const scaledHeight = buttonHeight * scale;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative game-button
        transition-all duration-200
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer active:scale-95 hover:scale-105"}
      `}
      style={{
        opacity: isDisabled ? disabledOpacity : 1,
      }}
    >
      <img
        src={isAnswered ? continueButtonImage : submitButtonImage}
        alt={isAnswered ? "Tiếp tục" : "Trả lời"}
        className="w-auto object-contain"
        style={{ height: `${scaledHeight}px` }}
      />
    </button>
  );
};

export default SubmitButton;