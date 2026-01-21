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
  const {
    scale: trackScale,
    startLineLeft,
    finishLineLeft,
    startLineWidth,
    finishLineWidth,
    playerBottom,
    bot1Bottom,
    bot2Bottom,
    bot1LeftOffset,
    bot2LeftOffset,
    playerLeftOffset,
    trackHeight,
  } = uiConfig.raceTrack;

  const { scale: mascotScale, playerWidth, bot1Width, bot2Width } = uiConfig.mascots;
  const {
    scale: labelScale,
    offsetTop,
    paddingX,
    paddingY,
    fontSize: labelFontSize,
    borderRadius: labelBorderRadius,
  } = uiConfig.playerLabel;

  // Apply scale to pixel values
  const scaledTrackHeight = trackHeight * trackScale;
  const scaledStartLineWidth = startLineWidth * trackScale;
  const scaledFinishLineWidth = finishLineWidth * trackScale;
  const scaledPlayerBottom = playerBottom * trackScale;
  const scaledBot1Bottom = bot1Bottom * trackScale;
  const scaledBot2Bottom = bot2Bottom * trackScale;

  const scaledPlayerWidth = playerWidth * mascotScale;
  const scaledBot1Width = bot1Width * mascotScale;
  const scaledBot2Width = bot2Width * mascotScale;

  const scaledOffsetTop = offsetTop * labelScale;
  const scaledPaddingX = paddingX * labelScale;
  const scaledPaddingY = paddingY * labelScale;

  const urlParams = new URLSearchParams(window.location.search);
  const playerName = urlParams.get('name') || 'Player';

  const calculatePosition = (progress: number) => {
    const range = finishLineLeft - startLineLeft;
    return startLineLeft + (progress / 5) * range;
  };

  return (
    <div
      className="relative w-full overflow-visible flex-shrink-0 pointer-events-none"
      style={{ height: `${scaledTrackHeight}px` }}
    >
      {/* Thêm thẻ style này hoặc copy vào file CSS của bạn */}
      <style>{`
        .mascot {
          position: absolute;
          transition: left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateX(-50%);
        }

        .mascot img {
          animation: mascotRocking 2s ease-in-out infinite;
        }
        
        @keyframes mascotRocking {
          0%, 100% {
            transform: rotate(-1deg) translateY(0);
          }
          25% {
            transform: rotate(1deg) translateY(-2px);
          }
          50% {
            transform: rotate(-1deg) translateY(0);
          }
          75% {
            transform: rotate(1deg) translateY(2px);
          }
        }
        
        .mascot.jumping img {
          animation: mascotPaddling 0.3s ease-in-out 3;
        }

        @keyframes mascotPaddling {
          0%, 100% {
            transform: rotate(0deg) translateX(0);
          }
          25% {
            transform: rotate(-3deg) translateX(5px);
          }
          50% {
            transform: rotate(0deg) translateX(0);
          }
          75% {
            transform: rotate(3deg) translateX(-5px);
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
          style={{ width: `${scaledStartLineWidth}px` }}
        />
      </div>

      {/* Finish Line */}
      <div
        className="absolute"
        style={{ left: `${finishLineLeft}%`, transform: "translateX(-50%)", bottom: "0px", zIndex: 25 }}
      >
        <img src={finishLineImg} alt="Finish Line" className="h-auto" style={{ width: `${scaledFinishLineWidth}px` }} />
      </div>

      {/* Player */}
      <div
        className={`mascot ${isJumping.player && playerPosition < 5 ? "jumping" : ""}`}
        style={{
          left: `${calculatePosition(playerPosition) + playerLeftOffset}%`,
          bottom: `${scaledPlayerBottom}px`,
          zIndex: 100,
        }}
      >
        {/* Player Name Label */}
        <div
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{ top: `${scaledOffsetTop}px`, zIndex: 31 }}
        >
          <span
            className="font-medium"
            style={{
              padding: `${scaledPaddingY}px ${scaledPaddingX}px`,
              borderRadius: `${labelBorderRadius}px`,
              backgroundColor: "rgba(255, 248, 235, 0.95)",
              color: "#5D4037",
              fontFamily: '"Comic Sans MS", "Fredoka", cursive, sans-serif',
              fontSize: `${labelFontSize}px`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {playerName}
          </span>
        </div>
        <img
          src={mascotRed}
          alt="Player"
          className="drop-shadow-lg"
          style={{ width: `${scaledPlayerWidth}px`, minWidth: `${scaledPlayerWidth}px` }}
        />
      </div>

      {/* Bot 1 */}
      <div
        className={`mascot ${isJumping.bot1 && bot1Position < 5 ? "jumping" : ""}`}
        style={{
          left: `${calculatePosition(bot1Position) + bot1LeftOffset}%`,
          bottom: `${scaledBot1Bottom}px`,
          zIndex: 200,
        }}
      >
        <img src={mascotGreen} alt="Bot 1" style={{ width: `${scaledBot1Width}px`, minWidth: `${scaledBot1Width}px` }} />
      </div>

      {/* Bot 2 */}
      <div
        className={`mascot ${isJumping.bot2 && bot2Position < 5 ? "jumping" : ""}`}
        style={{
          left: `${calculatePosition(bot2Position) + bot2LeftOffset}%`,
          bottom: `${scaledBot2Bottom}px`,
          zIndex: 300,
        }}
      >
        <img src={mascotBlue} alt="Bot 2" style={{ width: `${scaledBot2Width}px`, minWidth: `${scaledBot2Width}px` }} />
      </div>
    </div>
  );
};

export default RaceTrack;