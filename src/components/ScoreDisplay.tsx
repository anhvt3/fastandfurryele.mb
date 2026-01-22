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

const ScoreDisplay = ({ total, currentIndex, answerResults, banhChungImage }: Omit<ScoreDisplayProps, 'uiConfig'>) => {
  return (
    <div className="score-container">
      {Array.from({ length: total }).map((_, index) => {
        let statusClass = "";
        const result = answerResults[index]; // true, false, or null (not answered)

        if (index === currentIndex) {
           statusClass = "active";
        } else if (result === true) {
           statusClass = "completed-correct";
        } else if (result === false) {
           statusClass = "completed-wrong";
        }

        return (
          <div 
             key={index} 
             className={`score-item ${statusClass}`}
          >
             <img src={banhChungImage} alt="Score" />
          </div>
        );
      })}
    </div>
  );
};

export default ScoreDisplay;