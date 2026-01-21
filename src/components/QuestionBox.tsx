import HtmlContent from "./HtmlContent";

interface QuestionBoxUIConfig {
  scale: number;
  minHeight: number;
  height: number;
  useFixedHeight: boolean;
  containerPaddingX: number;
  containerPaddingY: number;
  marginBottom: number;
  innerPaddingX: number;
  innerPaddingTop: number;
  innerPaddingBottom: number;
  framePaddingX: number;
  fontSize: number;
  fontSizeUnit: "px" | "rem";
  fontFamily: string;
  textAlign: "left" | "center" | "right" | "justify";
  textColor: string;
  imageMaxWidth: number;
  imageGap: number;
  maxContentHeight: number;
  scrollbarWidth: number;
  scrollbarColor: string;
  scrollbarTrackColor: string;
}

interface QuestionBoxProps {
  question: string;
  questionNumber: number;
  type?: "text" | "image" | "latex";
  imageUrl?: string;
  questionFrame: string;
  uiConfig: QuestionBoxUIConfig;
}

const QuestionBox = ({ 
  question, 
  imageUrl,
  questionFrame,
  uiConfig 
}: QuestionBoxProps) => {
  const { scale } = uiConfig;
  
  // Apply scale to values that need it
  const scaledMarginBottom = uiConfig.marginBottom * scale;

  return (
    <div 
      className="relative w-full px-4" 
      style={{ marginBottom: `${scaledMarginBottom * 0.0625}rem`, marginTop: '-0.5rem' }}
    >
      <div 
        className="question-container" 
        style={{ backgroundImage: `url(${questionFrame})` }}
      >
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