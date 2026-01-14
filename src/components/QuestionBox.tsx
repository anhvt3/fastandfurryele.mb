import questionFrame from "@/assets/question-frame.png";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

interface QuestionBoxProps {
  question: string;
  questionNumber: number;
  type?: "text" | "image" | "latex";
  imageUrl?: string;
}

const QuestionBox = ({ 
  question, 
  questionNumber, 
  type = "text",
  imageUrl 
}: QuestionBoxProps) => {
  
  const renderQuestionContent = () => {
    switch (type) {
      case "image":
        return (
          <div className="flex flex-col items-center gap-2">
            <p 
              className="text-foreground font-semibold text-center leading-relaxed font-sf-compact"
              style={{ fontSize: "18px" }}
            >
              {question}
            </p>
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt="Question image" 
                className="max-w-[200px] h-auto object-contain rounded-lg"
              />
            )}
          </div>
        );
      
      case "latex":
        // Check if the question contains display math ($$...$$) or inline math ($...$)
        const hasDisplayMath = question.includes("$$");
        const hasInlineMath = question.includes("$") && !hasDisplayMath;
        
        if (hasDisplayMath) {
          // Split by $$ and render alternating text/math
          const parts = question.split(/\$\$/);
          return (
            <div 
              className="text-foreground font-semibold text-center leading-relaxed font-sf-compact"
              style={{ fontSize: "18px" }}
            >
              {parts.map((part, index) => 
                index % 2 === 0 ? (
                  <span key={index}>{part}</span>
                ) : (
                  <BlockMath key={index} math={part} />
                )
              )}
            </div>
          );
        } else if (hasInlineMath) {
          // Split by $ and render alternating text/math
          const parts = question.split(/\$/);
          return (
            <p 
              className="text-foreground font-semibold text-center leading-relaxed font-sf-compact"
              style={{ fontSize: "18px" }}
            >
              {parts.map((part, index) => 
                index % 2 === 0 ? (
                  <span key={index}>{part}</span>
                ) : (
                  <InlineMath key={index} math={part} />
                )
              )}
            </p>
          );
        } else {
          // No math delimiters, try to render entire content as LaTeX
          return (
            <div 
              className="text-foreground font-semibold text-center leading-relaxed font-sf-compact"
              style={{ fontSize: "18px" }}
            >
              <BlockMath math={question} />
            </div>
          );
        }
      
      case "text":
      default:
        return (
          <p 
            className="text-foreground font-semibold text-center leading-relaxed font-sf-compact whitespace-pre-line"
            style={{ fontSize: "18px" }}
          >
            {question}
          </p>
        );
    }
  };

  return (
    <div className="question-box w-full px-4">
      <div className="relative w-full">
        <img src={questionFrame} alt="Question frame" className="w-full h-auto" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 py-4">
          {renderQuestionContent()}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
