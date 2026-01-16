import questionFrame from "@/assets/question-frame.png";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { UI_CONFIG } from "@/config/uiConfig";

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
  const { 
    fontSize, 
    fontFamily,
    textAlign,
    imageMaxWidth, 
    imageGap, 
    innerPaddingX, 
    framePaddingX, 
    innerPaddingY,
    maxContentHeight,
    scrollbarColor,
    scrollbarTrackColor
  } = UI_CONFIG.questionBox;

  const alignClass = textAlign === "left" ? "text-left" : 
                     textAlign === "right" ? "text-right" : "text-center";
  
  const renderQuestionContent = () => {
    switch (type) {
      case "image":
        return (
          <div 
            className="flex flex-col items-center"
            style={{ gap: `${imageGap}px` }}
          >
          <p 
            className={`text-black ${alignClass}`}
            style={{ fontSize: `${fontSize}px`, fontFamily }}
          >
            {question}
          </p>
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt="Question image" 
                className="h-auto object-contain rounded-lg"
                style={{ maxWidth: `${imageMaxWidth}px` }}
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
              className={`text-black ${alignClass}`}
              style={{ fontSize: `${fontSize}px`, fontFamily }}
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
              className={`text-black ${alignClass}`}
              style={{ fontSize: `${fontSize}px`, fontFamily }}
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
              className={`text-black ${alignClass}`}
              style={{ fontSize: `${fontSize}px`, fontFamily }}
            >
              <BlockMath math={question} />
            </div>
          );
        }
      
      case "text":
      default:
        return (
          <p 
            className={`text-black ${alignClass} whitespace-pre-line`}
            style={{ fontSize: `${fontSize}px`, fontFamily }}
          >
            {question}
          </p>
        );
    }
  };

  return (
    <div 
      className="question-box w-full"
      style={{ padding: `0 ${innerPaddingX}px` }}
    >
      <div className="relative w-full">
        <img src={questionFrame} alt="Question frame" className="w-full h-auto" />
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ padding: `${innerPaddingY}px ${framePaddingX}px` }}
        >
          <div 
            className="overflow-y-auto w-full custom-scrollbar flex items-center justify-center"
            style={{ 
              maxHeight: `${maxContentHeight}px`,
              scrollbarWidth: 'thin',
              scrollbarColor: `${scrollbarColor} ${scrollbarTrackColor}`
            }}
          >
            {renderQuestionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
