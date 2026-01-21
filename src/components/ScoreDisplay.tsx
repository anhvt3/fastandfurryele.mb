interface ScoreDisplayUIConfig {
  scale: number;
  iconSize: number;
  iconGap: number;
  paddingTop: number;
  paddingBottom: number;
}

interface ScoreDisplayProps {
  score: number;
  total: number;
  currentIndex: number;
  answerResults: (boolean | null)[];
  banhChungImage: string;
  uiConfig: ScoreDisplayUIConfig;
}

const ScoreDisplay = ({ total, currentIndex, answerResults, banhChungImage, uiConfig }: ScoreDisplayProps) => {
  const { scale, iconSize, iconGap, paddingTop, paddingBottom } = uiConfig;

  // Apply scale to pixel values
  const scaledIconSize = iconSize * scale;
  const scaledIconGap = iconGap * scale;
  const scaledPaddingTop = paddingTop * scale;
  const scaledPaddingBottom = paddingBottom * scale;

  return (
    <div 
      className="relative"
      style={{ paddingTop: `${scaledPaddingTop}px`, paddingBottom: `${scaledPaddingBottom}px` }}
    >
      {/* Định nghĩa animation nhấp nháy vàng */}
      <style>{`
        @keyframes yellow-pulse {
          0% {
            filter: drop-shadow(0 0 0px rgba(255, 215, 0, 0));
            transform: scale(1);
          }
          50% {
            /* Shadow vàng lan tỏa và icon to lên một chút */
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 1));
            transform: scale(1.1);
          }
          100% {
            filter: drop-shadow(0 0 0px rgba(255, 215, 0, 0));
            transform: scale(1);
          }
        }

        .current-active {
          animation: yellow-pulse 2s infinite ease-in-out;
          opacity: 1 !important;
        }
        
        .answer-correct {
          opacity: 1;
          filter: brightness(1.2) drop-shadow(0 0 4px rgba(255, 215, 0, 0.6));
        }

        .answer-wrong {
          opacity: 0.35;
          filter: grayscale(80%) brightness(0.7);
        }

        .future {
          opacity: 0.4;
          filter: grayscale(100%);
        }
      `}</style>

      <div 
        className="flex items-center justify-center"
        style={{ gap: `${scaledIconGap}px` }}
      >
        {Array.from({ length: total }).map((_, index) => {
          // Logic xác định trạng thái dựa trên kết quả trả lời
          let statusClass = "future";
          const result = answerResults[index];

          if (result === true) {
            statusClass = "answer-correct"; // Trả lời đúng -> sáng
          } else if (result === false) {
            statusClass = "answer-wrong"; // Trả lời sai -> tối
          } else if (index === currentIndex) {
            statusClass = "current-active"; // Đang ở câu này -> Nhấp nháy
          }

          return (
            <img
              key={index}
              src={banhChungImage}
              alt="Bánh chưng"
              className={`transition-all duration-300 ${statusClass}`}
              style={{ width: `${scaledIconSize}px`, height: `${scaledIconSize}px` }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScoreDisplay;