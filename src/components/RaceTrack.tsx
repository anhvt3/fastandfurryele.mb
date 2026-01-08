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

  return (
    <div className="relative w-full h-40 mt-auto">
      {/* Finish flag */}
      <div 
        className="absolute text-3xl z-30"
        style={{ left: `${finishLine}%`, transform: "translateX(-50%)", bottom: "90px" }}
      >
        🏁
      </div>

      {/* Player - Red (front row - largest, positioned at bottom-left of the group) */}
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

      {/* Bot 1 - Green (middle row - behind and to the right) */}
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

      {/* Bot 2 - Blue (back row - further behind and to the right) */}
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
      </div>
    </div>
  );
};

export default RaceTrack;
