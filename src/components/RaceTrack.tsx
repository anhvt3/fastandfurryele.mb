import React from 'react';
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

  // Set player name like dragonboat
  const setPlayerName = React.useCallback(() => {
    const playerNameEl = document.getElementById('playerName');
    if (playerNameEl) {
      playerNameEl.textContent = playerName;
    }
  }, [playerName]);

  // Call setPlayerName on mount
  React.useEffect(() => {
    setPlayerName();
  }, [playerName, setPlayerName]);

  const calculatePosition = (progress: number) => {
    const range = finishLineLeft - (startLineLeft + 5);
    return (startLineLeft + 5) + (progress / 5) * range;
  };

  return (
    <div className="race-section">
      <div className="race-track">
        {/* Start Line */}
        <div 
          className="absolute bottom-0 z-50 opacity-80" 
          style={{ left: `${startLineLeft + 10}%`, width: '8%', transform: 'translateX(50%)' }}
        >
           <img src={startLineImg} alt="Start" className="w-full h-auto" />
        </div>

        {/* Finish Line */}
        <div 
          className="absolute bottom-0 z-50" 
          style={{ left: `${finishLineLeft}%`, width: '7%', transform: 'translateX(-50%)' }}
        >
           <img src={finishLineImg} alt="Finish" className="w-full h-auto" />
        </div>

        {/* Player */}
        <div
          className={`player ${isJumping.player && playerPosition < 5 ? "moving" : ""}`}
          style={{
            left: `${calculatePosition(playerPosition) + 6}%`,
            bottom: "70%",  // Approximate lane position
          }}
        >
          <div className="player-name">{playerName}</div>
          <img src={mascotRed} alt="Player" />
        </div>

        {/* Bot 1 */}
        <div
          className={`player ${isJumping.bot1 && bot1Position < 5 ? "moving" : ""}`}
          style={{
            left: `${calculatePosition(bot1Position) + 3}%`,
            bottom: "35%", // Approximate lane position
            zIndex: 101 // Lower z-index than player if needed, or higher?
          }}
        >
          <img src={mascotGreen} alt="Bot 1" />
        </div>

        {/* Bot 2 */}
        <div
          className={`player ${isJumping.bot2 && bot2Position < 5 ? "moving" : ""}`}
          style={{
            left: `${calculatePosition(bot2Position)}%`,
            bottom: "0%", // Approximate lane position
            zIndex: 102
          }}
        >
          <img src={mascotBlue} alt="Bot 2" />
        </div>
      </div>
    </div>
  );
};

export default RaceTrack;