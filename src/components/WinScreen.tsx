import mascotRed from "@/assets/mascot-red.png";

interface WinScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const WinScreen = ({ score, totalQuestions, onRestart }: WinScreenProps) => {
  const isWinner = score >= 5;

  return (
    <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-tet-cream rounded-3xl p-8 mx-4 text-center shadow-2xl border-4 border-tet-red">
        <img 
          src={mascotRed} 
          alt="Mascot" 
          className={`w-32 h-auto mx-auto mb-4 ${isWinner ? "celebrating" : ""}`} 
        />
        
        <h2 className="text-3xl font-bold text-tet-red mb-4">
          🎉 Hoàn thành! 🎉
        </h2>
        
        <p className="text-tet-brown font-bold text-4xl mb-6">
          {score}/5 câu đúng
        </p>
        
        <button
          onClick={onRestart}
          className="bg-tet-red hover:bg-tet-red/90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all hover:scale-105"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
