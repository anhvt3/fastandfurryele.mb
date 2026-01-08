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
        
        <h2 className="text-3xl font-bold text-tet-red mb-2">
          {isWinner ? "🎉 Chúc Mừng! 🎉" : "Kết Thúc!"}
        </h2>
        
        <p className="text-foreground text-lg mb-2">
          {isWinner 
            ? "Bạn đã về đích thành công!" 
            : "Cố gắng hơn lần sau nhé!"}
        </p>
        
        <p className="text-tet-brown font-semibold mb-6">
          Điểm số: {score}/{totalQuestions} câu đúng
        </p>

        <button
          onClick={onRestart}
          className="bg-tet-red text-primary-foreground font-bold py-3 px-8 rounded-full text-lg shadow-button hover:brightness-110 transition-all active:translate-y-1 active:shadow-none"
        >
          Chơi Lại
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
