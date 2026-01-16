import banhChung from "@/assets/banh-chung.png";
import { UI_CONFIG } from "@/config/uiConfig";

interface ScoreDisplayProps {
  score: number;
  total: number;
  currentIndex: number;
  answerResults: (boolean | null)[];
}

const ScoreDisplay = ({ total, currentIndex, answerResults }: ScoreDisplayProps) => {
  const { scale, iconSize, iconGap } = UI_CONFIG.scoreDisplay;

  // Apply scale to pixel values
  const scaledIconSize = iconSize * scale;
  const scaledIconGap = iconGap * scale;

  return (
    <div className="relative">
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
              src={banhChung}
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