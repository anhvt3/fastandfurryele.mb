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

  const playerOffset = uiConfig.raceTrack.playerLeftOffset ?? 6;
  const bot1Offset = uiConfig.raceTrack.bot1LeftOffset ?? 3;
  const bot2Offset = uiConfig.raceTrack.bot2LeftOffset ?? 0;

  const start = startLineLeft + 7.5;
  const end = finishLineLeft;
  const step = (end - start) / 5;
  const maxOffset = Math.max(playerOffset, bot1Offset, bot2Offset);

  const calculatePosition = (progress: number, offset: number) => {
    if (progress === 0) {
      return start + offset;
    }
    if (progress === 5) {
      return end + (maxOffset - offset);
    }
    return start + step * progress;
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
          className="player bottom-[9cqw]"
          style={{
            left: `${calculatePosition(playerPosition, playerOffset)}%`,
            zIndex: 101
          }}
        >
          <span className="player-name" id="playerName">{playerName}</span>
          <img src={mascotRed} alt="Player" />
        </div>

        {/* Bot 1 */}
        <div
          className="player bottom-[5cqw]"
          style={{
            left: `${calculatePosition(bot1Position, bot1Offset)}%`,
            zIndex: 102
          }}
        >
          <img src={mascotGreen} alt="Bot 1" />
        </div>

        {/* Bot 2 */}
        <div
          className="player bottom-[1cqw]"
          style={{
            left: `${calculatePosition(bot2Position, bot2Offset)}%`,
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