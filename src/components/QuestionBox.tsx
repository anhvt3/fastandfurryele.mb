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
    scale,
    minHeight,
    height,
    useFixedHeight,
    fontSize, 
    fontFamily,
    textAlign,
    imageMaxWidth, 
    imageGap, 
    innerPaddingX, 
    framePaddingX, 
    innerPaddingTop,
    innerPaddingBottom,
    maxContentHeight,
    scrollbarColor,
    scrollbarTrackColor
  } = UI_CONFIG.questionBox;

  // Apply scale to container values only (not text)
  const scaledMinHeight = minHeight * scale;
  const scaledHeight = height * scale;
  const scaledImageMaxWidth = imageMaxWidth * scale;
  const scaledImageGap = imageGap * scale;
  const scaledInnerPaddingX = innerPaddingX * scale;
  const scaledFramePaddingX = framePaddingX * scale;
  const scaledInnerPaddingTop = innerPaddingTop * scale;
  const scaledInnerPaddingBottom = innerPaddingBottom * scale;
  const scaledMaxContentHeight = maxContentHeight * scale;

  const alignClass = textAlign === "left" ? "text-left" : 
                     textAlign === "right" ? "text-right" : "text-center";
  
  const renderQuestionContent = () => {
    switch (type) {
      case "image":
        return (
          <div 
            className="flex flex-col items-center"
            style={{ gap: `${scaledImageGap}px` }}
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
                style={{ maxWidth: `${scaledImageMaxWidth}px` }}
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
      style={{ padding: `0 ${scaledInnerPaddingX}px` }}
    >
      <div className="relative w-full" style={{ minHeight: `${scaledMinHeight}px` }}>
        <img 
          src={questionFrame} 
          alt="Question frame" 
          className="w-full"
          style={{ height: useFixedHeight ? `${scaledHeight}px` : 'auto' }}
        />
        <div 
          className="absolute inset-0 flex flex-col items-center justify-start"
          style={{ 
            paddingTop: `${scaledInnerPaddingTop}px`,
            paddingBottom: `${scaledInnerPaddingBottom}px`,
            paddingLeft: `${scaledFramePaddingX}px`,
            paddingRight: `${scaledFramePaddingX}px`
          }}
        >
          <div 
            className="overflow-y-auto w-full flex-1 min-h-0 custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: `${scrollbarColor} ${scrollbarTrackColor}`,
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