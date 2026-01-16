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

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center z-50 animate-fade-in"
      style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
    >
      <div 
        className="bg-tet-cream text-center shadow-2xl border-tet-red"
        style={{
          padding: `${cardPadding}px`,
          margin: `0 ${cardMarginX}px`,
          borderRadius: `${cardBorderRadius}px`,
          borderWidth: `${cardBorderWidth}px`,
          borderStyle: 'solid',
        }}
      >
        <img 
          src={mascotRed} 
          alt="Mascot" 
          className={`mx-auto ${isWinner ? "celebrating" : ""}`}
          style={{ width: `${mascotWidth}px`, marginBottom: `${mascotMarginBottom}px` }}
        />
        
        <h2 
          className="font-bold text-tet-red"
          style={{ fontSize: `${titleFontSize}px`, marginBottom: `${titleMarginBottom}px` }}
        >
          Hoàn thành!
        </h2>
        
        <p 
          className="text-tet-brown font-bold"
          style={{ fontSize: `${scoreFontSize}px`, marginBottom: `${scoreMarginBottom}px` }}
        >
          {score}/5 câu đúng
        </p>
        
        <button
          onClick={onRestart}
          className="bg-tet-gold hover:bg-tet-gold/90 text-tet-brown font-bold shadow-lg transition-all hover:scale-105"
          style={{
            padding: `${buttonPaddingY}px ${buttonPaddingX}px`,
            fontSize: `${buttonFontSize}px`,
            borderRadius: `${buttonBorderRadius}px`,
          }}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
