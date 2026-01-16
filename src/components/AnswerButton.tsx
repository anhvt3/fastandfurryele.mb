import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { UI_CONFIG } from "@/config/uiConfig";

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
  const config = UI_CONFIG.answerButtons;
  const { 
    scale,
    buttonPadding, 
    buttonMinHeight, 
    buttonBorderRadius, 
    borderWidth,
    fontSize, 
    fontFamily,
    textAlign,
    textColor,
    letterCircleSize, 
    letterFontSize,
    letterGap,
    // Colors
    defaultBackgroundColor,
    defaultBorderColor,
    defaultLetterColor,
    defaultLetterBgColor,
    selectedBackgroundColor,
    selectedBorderColor,
    selectedShadowColor,
    selectedShadowBlur,
    correctBackgroundColor,
    correctBorderColor,
    correctLetterColor,
    correctLetterBgColor,
    wrongBackgroundColor,
    wrongBorderColor,
    wrongLetterColor,
    wrongLetterBgColor,
    // Animation
    disabledOpacity,
    activeScale,
    transitionDuration,
  } = config;

  // Apply scale to container values only (not text)
  const scaledButtonPadding = buttonPadding * scale;
  const scaledButtonMinHeight = buttonMinHeight * scale;
  const scaledButtonBorderRadius = buttonBorderRadius * scale;
  const scaledBorderWidth = borderWidth * scale;
  const scaledLetterCircleSize = letterCircleSize * scale;
  const scaledLetterGap = letterGap * scale;
  const scaledSelectedShadowBlur = selectedShadowBlur * scale;

  const alignClass = textAlign === "left" ? "text-left" : 
                     textAlign === "center" ? "text-center" : "text-right";

  // Get button styles based on state
  const getButtonStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      padding: `${scaledButtonPadding}px`,
      minHeight: `${scaledButtonMinHeight}px`,
      borderRadius: `${scaledButtonBorderRadius}px`,
      gap: `${scaledLetterGap}px`,
      borderWidth: `${scaledBorderWidth}px`,
      borderStyle: 'solid',
      transition: `all ${transitionDuration}ms`,
    };

    if (isAnswered) {
      // After submission
      if (index === correctIndex) {
        return {
          ...baseStyles,
          backgroundColor: correctBackgroundColor,
          borderColor: correctBorderColor,
        };
      }
      if (isSelected && !isCorrect) {
        return {
          ...baseStyles,
          backgroundColor: wrongBackgroundColor,
          borderColor: wrongBorderColor,
        };
      }
      return {
        ...baseStyles,
        backgroundColor: defaultBackgroundColor,
        borderColor: defaultBorderColor,
        opacity: disabledOpacity,
      };
    }

    // Before submission
    if (isSelected) {
      return {
        ...baseStyles,
        backgroundColor: selectedBackgroundColor,
        borderColor: selectedBorderColor,
        boxShadow: `0 0 ${scaledSelectedShadowBlur}px ${selectedShadowColor}`,
      };
    }

    return {
      ...baseStyles,
      backgroundColor: defaultBackgroundColor,
      borderColor: defaultBorderColor,
    };
  };

  const labels = ["A", "B", "C", "D"];

  // Determine letter color based on answer state
  const getLetterColor = (): string => {
    if (isAnswered) {
      if (index === correctIndex) {
        return correctLetterColor;
      }
      if (isSelected && !isCorrect) {
        return wrongLetterColor;
      }
    }
    return defaultLetterColor;
  };

  // Determine circle background color based on answer state
  const getCircleBackground = (): string => {
    if (isAnswered) {
      if (index === correctIndex) {
        return correctLetterBgColor;
      }
      if (isSelected && !isCorrect) {
        return wrongLetterBgColor;
      }
    }
    return defaultLetterBgColor;
  };

  // Check if answer contains LaTeX ($ delimiters)
  const renderAnswerText = () => {
    const hasInlineMath = answer.includes("$");
    
    if (hasInlineMath) {
      const parts = answer.split(/\$/);
      return (
        <span 
          className={alignClass}
          style={{ fontSize: `${fontSize}px`, fontFamily, color: textColor }}
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
        className={alignClass}
        style={{ fontSize: `${fontSize}px`, fontFamily, color: textColor }}
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
        flex items-center relative overflow-hidden
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      style={{
        ...getButtonStyles(),
        transform: !isDisabled ? undefined : undefined,
      }}
      onMouseDown={(e) => {
        if (!isDisabled) {
          (e.currentTarget as HTMLElement).style.transform = `scale(${activeScale})`;
        }
      }}
      onMouseUp={(e) => {
        if (!isDisabled) {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
      }}
    >
      <span
        className="rounded-full flex items-center justify-center font-bold shrink-0 font-sf-compact"
        style={{ 
          color: getLetterColor(), 
          backgroundColor: getCircleBackground(), 
          fontSize: `${letterFontSize}px`,
          width: `${scaledLetterCircleSize}px`,
          height: `${scaledLetterCircleSize}px`,
          transition: `all ${transitionDuration}ms`,
        }}
      >
        {labels[index]}
      </span>
      {renderAnswerText()}
    </button>
  );
};

export default AnswerButton;