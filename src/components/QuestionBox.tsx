import questionFrame from "@/assets/question-frame.png";
import HtmlContent from "./HtmlContent";

interface QuestionBoxProps {
  question: string;
  questionNumber: number;
  type?: "text" | "image" | "latex";
  imageUrl?: string;
}

const QuestionBox = ({ 
  question, 
  imageUrl 
}: QuestionBoxProps) => {
  
  return (
    <div className="relative w-full px-4" style={{ marginBottom: '0.25rem', marginTop: '-0.5rem' }}>
      <div className="question-container" style={{ backgroundImage: `url(${questionFrame})` }}>
        <HtmlContent html={question} className="question-text" />
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Question image" 
            className="max-w-full max-h-[150px] object-contain mx-auto mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default QuestionBox;