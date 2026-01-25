interface WinScreenUIConfig {
  scale: number;
  overlayOpacity: number;
  cardPadding: number;
  cardMarginX: number;
  cardBorderRadius: number;
  cardBorderWidth: number;
  mascotWidth: number;
  mascotMarginBottom: number;
  titleFontSize: number;
  titleMarginBottom: number;
  scoreFontSize: number;
  scoreMarginBottom: number;
  buttonPaddingY: number;
  buttonPaddingX: number;
  buttonFontSize: number;
  buttonBorderRadius: number;
}

interface WinScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  mascotImage: string;
  continueButton: string;
  uiConfig: WinScreenUIConfig;
}

const WinScreen = ({ score, onRestart, mascotImage, continueButton }: Omit<WinScreenProps, 'totalQuestions' | 'uiConfig'>) => {
  const isWinner = score >= 5;

  return (
    <div className="game-overlay">
      <div className="overlay-content">
        <img
          src={mascotImage}
          alt="Mascot"
          className={`mx-auto ${isWinner ? "celebrating" : ""}`}
          style={{ width: '40cqw', marginBottom: '2cqw' }}
        />

        <h2>
          {isWinner ? "VỀ ĐÍCH!" : "HOÀN THÀNH"}
        </h2>

        <p>
          {isWinner
            ? "Chúc mừng! Bạn đã về đích!"
            : `${score}/5 câu đúng`}
        </p>

        <button
          onClick={onRestart}
          className="restart-btn"
        >
          <img src={continueButton} alt="Tiếp tục" />
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
