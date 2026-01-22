import { UIConfigType } from "@/config/uiConfig";

interface RaceTrackProps {
  playerPosition: number;
  bot1Position: number;
  bot2Position: number;
  isJumping: { player: boolean; bot1: boolean; bot2: boolean };
  mascotRed: string;
  mascotGreen: string;
  mascotBlue: string;
  startLine: string;
  finishLine: string;
  uiConfig: UIConfigType;
}

const RaceTrack = ({ 
  playerPosition, 
  bot1Position, 
  bot2Position, 
  isJumping,
  mascotRed,
  mascotGreen,
  mascotBlue,
  startLine: startLineImg,
  finishLine: finishLineImg,
  uiConfig
}: RaceTrackProps) => {
  const { startLineLeft, finishLineLeft } = uiConfig.raceTrack;
  const urlParams = new URLSearchParams(window.location.search);
  const playerName = urlParams.get('name') || 'User';
  const calculatePosition = (progress: number) => {
    const range = finishLineLeft - (startLineLeft + 12);
    return (startLineLeft + 7.5) + (progress / 5) * range;
  };

  return (
    <div className="race-section">
      <div className="race-track">
        {/* Start Line */}
        <div 
          className="absolute bottom-0 z-10 opacity-80 w-[8%] translate-x-[50%]" 
          style={{ left: `${startLineLeft + 10}%` }}
        >
           <img src={startLineImg} alt="Start" className="w-full h-auto" />
        </div>

        {/* Finish Line */}
        <div 
          className="absolute bottom-0 z-10 w-[7%] -translate-x-[50%]" 
          style={{ left: `${finishLineLeft}%` }}
        >
           <img src={finishLineImg} alt="Finish" className="w-full h-auto" />
        </div>

        {/* Player */}
        <div
          className={`player bottom-[9cqw] ${isJumping.player && playerPosition < 5 ? "moving" : ""}`}
          style={{
            left: `${calculatePosition(playerPosition) + 6}%`,
            zIndex: 101 // Top lane, lowest z-index
          }}
        >
          <span className="player-name" id="playerName">{playerName}</span>
          <img src={mascotRed} alt="Player" />
        </div>

        {/* Bot 1 */}
        <div
          className={`player bottom-[5cqw] ${isJumping.bot1 && bot1Position < 5 ? "moving" : ""}`}
          style={{
            left: `${calculatePosition(bot1Position) + 3}%`,
            zIndex: 102
          }}
        >
          <img src={mascotGreen} alt="Bot 1" />
        </div>

        {/* Bot 2 */}
        <div
          className={`player bottom-[1cqw] ${isJumping.bot2 && bot2Position < 5 ? "moving" : ""}`}
          style={{
            left: `${calculatePosition(bot2Position)}%`,
            zIndex: 103
          }}
        >
          <img src={mascotBlue} alt="Bot 2" />
        </div>
      </div>
    </div>
  );
};

export default RaceTrack;