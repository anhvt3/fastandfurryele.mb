import banhChung from "@/assets/banh-chung.png";

interface ScoreDisplayProps {
  score: number;
  total: number;
}

const ScoreDisplay = ({ score, total }: ScoreDisplayProps) => {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <img
          key={index}
          src={banhChung}
          alt="Bánh chưng"
          className={`w-8 h-8 banh-chung ${
            index < score ? "lit" : "dim"
          }`}
        />
      ))}
    </div>
  );
};

export default ScoreDisplay;
