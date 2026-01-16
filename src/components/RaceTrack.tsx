import mascotRed from "@/assets/mascot-red.png";
import mascotGreen from "@/assets/mascot-green.png";
import mascotBlue from "@/assets/mascot-blue.png";
import startLineImg from "@/assets/start-line.png";
import finishLineImg from "@/assets/finish-line.png";
import { UI_CONFIG } from "@/config/uiConfig";

interface RaceTrackProps {
  playerPosition: number;
  bot1Position: number;
  bot2Position: number;
  isJumping: { player: boolean; bot1: boolean; bot2: boolean };
}

const RaceTrack = ({ playerPosition, bot1Position, bot2Position, isJumping }: RaceTrackProps) => {
  const {
    startLineLeft,
    finishLineLeft,
    startLineWidth,
    finishLineWidth,
    playerBottom,
    bot1Bottom,
    bot2Bottom,
    bot1LeftOffset,
    bot2LeftOffset,
    trackHeight,
  } = UI_CONFIG.raceTrack;

  const { playerWidth, bot1Width, bot2Width } = UI_CONFIG.mascots;
  const {
    offsetTop,
    paddingX,
    paddingY,
    fontSize: labelFontSize,
    borderRadius: labelBorderRadius,
  } = UI_CONFIG.playerLabel;

  const calculatePosition = (progress: number) => {
    // Progress is 0-5 (5 correct answers to win)
    const range = finishLineLeft - startLineLeft;
    return startLineLeft + (progress / 5) * range;
  };

  return (
    <div
      className="relative w-full overflow-hidden flex-shrink-0 pointer-events-none"
      style={{ height: `${trackHeight}px` }}
    >
      {/* Thêm thẻ style này hoặc copy vào file CSS của bạn */}
      <style>{`
        .mascot {
          position: absolute;
          /* Dòng này QUAN TRỌNG: nó giúp nhân vật trượt ngang mượt mà */
          transition: left 0.5s ease-in-out; 
          /* Đảm bảo nhân vật luôn được căn giữa dựa trên điểm neo left */
          transform: translateX(-50%); 
        }
        
        .mascot.jumping {
          /* Khi có class jumping, áp dụng animation hop */
          animation: hop 0.5s ease-in-out;
        }

        /* Định nghĩa keyframes hop CHỈ NHẢY LÊN XUỐNG */
        @keyframes hop {
          0% { 
            /* Bắt đầu ở vị trí bình thường (đang căn giữa -50%) */
            transform: translate(-50%, 0) scale(1); 
          }
          50% { 
            /* Nhảy lên cao (Y = -70px) và phóng to một chút. 
               QUAN TRỌNG: Vẫn giữ translateX(-50%) để không bị lệch ngang */
            transform: translate(-50%, -70px) scale(1.1); 
          }
          100% { 
            /* Đáp xuống lại vị trí cũ */
            transform: translate(-50%, 0) scale(1); 
          }
        }
        
        .jumping {
          /* Khi có class này, animation sẽ chiếm quyền điều khiển transform */
          animation: jump-forward 0.5s ease-in-out;
        }
      
        @keyframes jump-forward {
          0% {
            /* BẮT BUỘC PHẢI CÓ -50% ĐỂ KHỚP VỚI TRẠNG THÁI CŨ */
            transform: translate(-50%, 0) scale(1);
          }
          50% {
            /* Nhảy lên nhưng vẫn giữ trục X là -50% */
            transform: translate(-50%, -20px) scale(1);
          }
          100% {
            /* Đáp xuống và vẫn giữ trục X là -50% */
            transform: translate(-50%, 0) scale(1);
          }
        }
      `}</style>

      {/* Start Line */}
      <div
        className="absolute"
        style={{
          left: `${startLineLeft}%`,
          transform: "translateX(50%) rotate(-10deg)",
          bottom: "0px",
          zIndex: 5,
        }}
      >
        <img
          src={startLineImg}
          alt="Start Line"
          className="h-auto opacity-80"
          style={{ width: `${startLineWidth}px` }}
        />
      </div>

      {/* Finish Line */}
      <div
        className="absolute"
        style={{ left: `${finishLineLeft}%`, transform: "translateX(-50%)", bottom: "0px", zIndex: 25 }}
      >
        <img src={finishLineImg} alt="Finish Line" className="h-auto" style={{ width: `${finishLineWidth}px` }} />
      </div>

      {/* Player */}
      <div
        className={`mascot ${isJumping.player && playerPosition < 5 ? "jumping" : ""}`}
        style={{
          left: `${calculatePosition(playerPosition)}%`,
          bottom: `${playerBottom}px`,
          zIndex: 300,
        }}
      >
        {/* Player Name Label */}
        <div
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{ top: `${offsetTop}px`, zIndex: 31 }}
        >
          <span
            className="font-medium"
            style={{
              padding: `${paddingY}px ${paddingX}px`,
              borderRadius: `${labelBorderRadius}px`,
              backgroundColor: "rgba(255, 248, 235, 0.95)",
              color: "#5D4037",
              fontFamily: '"Comic Sans MS", "Fredoka", cursive, sans-serif',
              fontSize: `${labelFontSize}px`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            Player
          </span>
        </div>
        <img
          src={mascotRed}
          alt="Player"
          className="drop-shadow-lg"
          style={{ width: `${playerWidth}px`, minWidth: `${playerWidth}px` }}
        />
      </div>

      {/* Bot 1 */}
      <div
        className={`mascot ${isJumping.bot1 && bot1Position < 5 ? "jumping" : ""}`}
        style={{
          left: `${calculatePosition(bot1Position) + bot1LeftOffset}%`,
          bottom: `${bot1Bottom}px`,
          zIndex: 200,
        }}
      >
        <img src={mascotGreen} alt="Bot 1" style={{ width: `${bot1Width}px`, minWidth: `${bot1Width}px` }} />
      </div>

      {/* Bot 2 */}
      <div
        className={`mascot ${isJumping.bot2 && bot2Position < 5 ? "jumping" : ""}`}
        style={{
          left: `${calculatePosition(bot2Position) + bot2LeftOffset}%`,
          bottom: `${bot2Bottom}px`,
          zIndex: 100,
        }}
      >
        <img src={mascotBlue} alt="Bot 2" style={{ width: `${bot2Width}px`, minWidth: `${bot2Width}px` }} />
      </div>
    </div>
  );
};

export default RaceTrack;
