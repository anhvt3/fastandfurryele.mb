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

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="submit-btn"
    >
      <img
        src={isAnswered ? continueButtonImage : submitButtonImage}
        alt={isAnswered ? "Tiếp tục" : "Trả lời"}
      />
    </button>
  );
};

export default SubmitButton;