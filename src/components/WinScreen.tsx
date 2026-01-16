import mascotRed from "@/assets/mascot-red.png";
import { UI_CONFIG } from "@/config/uiConfig";

interface WinScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const WinScreen = ({ score, onRestart }: WinScreenProps) => {
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

  const scaledCardPadding = cardPadding * scale;
  const scaledCardMarginX = cardMarginX * scale;
  const scaledCardBorderRadius = cardBorderRadius * scale;
  const scaledCardBorderWidth = cardBorderWidth * scale;
  const scaledMascotWidth = mascotWidth * scale;
  const scaledMascotMarginBottom = mascotMarginBottom * scale;
  const scaledTitleMarginBottom = titleMarginBottom * scale;
  const scaledScoreMarginBottom = scoreMarginBottom * scale;
  const scaledButtonPaddingY = buttonPaddingY * scale;
  const scaledButtonPaddingX = buttonPaddingX * scale;
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
          style={{ fontSize: `${titleFontSize}px`, marginBottom: `${scaledTitleMarginBottom}px` }}
        >
          {isWinner ? "🎉 VỀ ĐÍCH!" : "🌊 CHƯA VỀ ĐÍCH"}
        </h2>

        <p
          className="text-tet-brown"
          style={{ fontSize: `${scoreFontSize * 0.6}px`, marginBottom: `${scaledScoreMarginBottom}px` }}
        >
          {isWinner 
            ? "Chúc mừng! Bạn đã về đích!" 
            : "Hành trình vạn dặm bắt đầu từ một bước chân. Hãy thử lại nhé!"}
        </p>

        <button
          onClick={onRestart}
          className="bg-tet-gold hover:bg-tet-gold/90 text-tet-brown font-bold shadow-lg transition-all hover:scale-105"
          style={{
            padding: `${scaledButtonPaddingY}px ${scaledButtonPaddingX}px`,
            fontSize: `${buttonFontSize}px`,
            borderRadius: `${scaledButtonBorderRadius}px`,
          }}
        >
          Chơi lại
        </button>
      </div>
    </div>
  );
};

export default WinScreen;