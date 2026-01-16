import mascotRed from "@/assets/mascot-red.png";
import { UI_CONFIG } from "@/config/uiConfig";

interface WinScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const WinScreen = ({ score, totalQuestions, onRestart }: WinScreenProps) => {
  const isWinner = score >= 5;
  const {
    scale,
    overlayOpacity,
    cardPadding,
    cardMarginX,
    cardBorderRadius,
    cardBorderWidth,
    mascotWidth,
    mascotMarginBottom,
    titleFontSize,
    titleMarginBottom,
    scoreFontSize,
    scoreMarginBottom,
    buttonPaddingY,
    buttonPaddingX,
    buttonFontSize,
    buttonBorderRadius,
  } = UI_CONFIG.winScreen;

  // Apply scale to pixel values
  const scaledCardPadding = cardPadding * scale;
  const scaledCardMarginX = cardMarginX * scale;
  const scaledCardBorderRadius = cardBorderRadius * scale;
  const scaledCardBorderWidth = cardBorderWidth * scale;
  const scaledMascotWidth = mascotWidth * scale;
  const scaledMascotMarginBottom = mascotMarginBottom * scale;
  const scaledTitleFontSize = titleFontSize * scale;
  const scaledTitleMarginBottom = titleMarginBottom * scale;
  const scaledScoreFontSize = scoreFontSize * scale;
  const scaledScoreMarginBottom = scoreMarginBottom * scale;
  const scaledButtonPaddingY = buttonPaddingY * scale;
  const scaledButtonPaddingX = buttonPaddingX * scale;
  const scaledButtonFontSize = buttonFontSize * scale;
  const scaledButtonBorderRadius = buttonBorderRadius * scale;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-[9999] animate-fade-in"
      style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
    >
      <div
        className="bg-tet-cream text-center shadow-2xl border-tet-red"
        style={{
          padding: `${scaledCardPadding}px`,
          margin: `0 ${scaledCardMarginX}px`,
          borderRadius: `${scaledCardBorderRadius}px`,
          borderWidth: `${scaledCardBorderWidth}px`,
          borderStyle: "solid",
        }}
      >
        <img
          src={mascotRed}
          alt="Mascot"
          className={`mx-auto ${isWinner ? "celebrating" : ""}`}
          style={{ width: `${scaledMascotWidth}px`, marginBottom: `${scaledMascotMarginBottom}px` }}
        />

        <h2
          className="font-bold text-tet-red"
          style={{ fontSize: `${scaledTitleFontSize}px`, marginBottom: `${scaledTitleMarginBottom}px` }}
        >
          Hoàn thành!
        </h2>

        <p
          className="text-tet-brown font-bold"
          style={{ fontSize: `${scaledScoreFontSize}px`, marginBottom: `${scaledScoreMarginBottom}px` }}
        >
          {score}/5 câu đúng
        </p>

        <button
          onClick={onRestart}
          className="bg-tet-gold hover:bg-tet-gold/90 text-tet-brown font-bold shadow-lg transition-all hover:scale-105"
          style={{
            padding: `${scaledButtonPaddingY}px ${scaledButtonPaddingX}px`,
            fontSize: `${scaledButtonFontSize}px`,
            borderRadius: `${scaledButtonBorderRadius}px`,
          }}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default WinScreen;