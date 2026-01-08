import mascotRed from "@/assets/mascot-red.png";
import mascotGreen from "@/assets/mascot-green.png";
import mascotBlue from "@/assets/mascot-blue.png";

interface RaceTrackProps {
  playerPosition: number;
  bot1Position: number;
  bot2Position: number;
  isJumping: { player: boolean; bot1: boolean; bot2: boolean };
}

const RaceTrack = ({ playerPosition, bot1Position, bot2Position, isJumping }: RaceTrackProps) => {
  const finishLine = 85; // percentage from left where finish line is
  const startLine = 5; // percentage from left where start is

  const calculatePosition = (progress: number) => {
    // Progress is 0-5 (5 correct answers to win)
    const range = finishLine - startLine;
    return startLine + (progress / 5) * range;
  };

  console.log("bot1Position", bot1Position);

  return (
    <div className="relative w-full h-40 mt-auto overflow-hidden flex-shrink-0">
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

      {/* Finish flag giữ nguyên */}
      <div
        className="absolute text-3xl z-30"
        style={{ left: `${finishLine}%`, transform: "translateX(-50%)", bottom: "90px" }}
      >
        🏁
      </div>

      {/* Player */}
      <div
        className={`mascot ${isJumping.player && playerPosition < 5 ? "jumping" : ""}`}
        style={{
          left: `${calculatePosition(playerPosition)}%`,
          // transform: "translateX(-50%)",  <-- XÓA dòng này ở style inline vì đã đưa vào keyframes/class
          bottom: "0px",
          zIndex: 30,
          // transform: "translateX(-50%)", // Vẫn cần cái này để căn giữa, nhưng keyframes sẽ override khi nhảy
        }}
      >
        <img src={mascotRed} alt="Player" className="min-w-24 w-24 drop-shadow-lg" />
      </div>

      {/* Bot 1 */}
      <div
        className={`mascot ${isJumping.bot1 && bot1Position < 5 ? "jumping" : ""}`}
        style={{
          left: `${calculatePosition(bot1Position) + 6}%`,
          bottom: "20px",
          zIndex: 20,
          // transform: "translateX(-50%)",
        }}
      >
        <img src={mascotGreen} alt="Bot 1" className="min-w-20 w-20" />
      </div>

      {/* Bot 2 */}
      <div
        className={`mascot ${isJumping.bot2 && bot2Position < 5 ? "jumping" : ""}`}
        style={{
          left: `${calculatePosition(bot2Position) + 12}%`,
          bottom: "40px",
          zIndex: 10,
          // transform: "translateX(-50%)",
        }}
      >
        <img src={mascotBlue} alt="Bot 2" className="min-w-16 w-16" />
      </div>
      {/* <div 
        className="absolute text-3xl z-30"
        style={{ left: `${finishLine}%`, transform: "translateX(-50%)", bottom: "90px" }}
      >
        🏁
      </div>

      <div
        className={`mascot ${isJumping.player ? "jumping" : ""}`}
        style={{ 
          left: `${calculatePosition(playerPosition)}%`,
          transform: "translateX(-50%)",
          bottom: "0px",
          zIndex: 30
        }}
      >
        <img src={mascotRed} alt="Player" className="w-24 h-auto drop-shadow-lg" />
      </div>

      <div
        className={`mascot ${isJumping.bot1 ? "jumping" : ""}`}
        style={{ 
          left: `${calculatePosition(bot1Position) + 6}%`,
          transform: "translateX(-50%)",
          bottom: "20px",
          zIndex: 20
        }}
      >
        <img src={mascotGreen} alt="Bot 1" className="w-20 h-auto" />
      </div>

      <div
        className={`mascot ${isJumping.bot2 ? "jumping" : ""}`}
        style={{ 
          left: `${calculatePosition(bot2Position) + 12}%`,
          transform: "translateX(-50%)",
          bottom: "40px",
          zIndex: 10
        }}
      >
        <img src={mascotBlue} alt="Bot 2" className="w-16 h-auto" />
      </div> */}
    </div>
  );
};

export default RaceTrack;
