import banhChung from "@/assets/banh-chung.png";

interface ScoreDisplayProps {
  score: number;
  total: number;
  currentIndex: number;
}

const ScoreDisplay = ({ score, total, currentIndex }: ScoreDisplayProps) => {
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
          animation: yellow-pulse 2s infinite ease-in-out; /* 2s là tốc độ chậm */
          opacity: 1 !important; /* Đảm bảo hiện rõ */
        }
        
        .completed {
          opacity: 1;
          filter: none;
        }

        .future {
          opacity: 0.4; /* Mờ đi */
          filter: grayscale(100%); /* Trắng đen */
        }
      `}</style>

      <div className="flex items-center justify-center gap-2">
        {" "}
        {/* Tăng gap lên xíu cho thoáng nếu icon to ra */}
        {Array.from({ length: total }).map((_, index) => {
          // Logic xác định trạng thái
          let statusClass = "future";

          if (index < score) {
            statusClass = "completed"; // Đã ăn được điểm
          } else if (index === currentIndex) {
            statusClass = "current-active"; // Đang ở câu này -> Nhấp nháy
          }

          return (
            <img
              key={index}
              src={banhChung}
              alt="Bánh chưng"
              className={`w-8 h-8 transition-all duration-300 ${statusClass}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScoreDisplay;
