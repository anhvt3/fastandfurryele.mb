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
  audioUrl?: string; // Added optional audioUrl
  questionFrame: string;
  uiConfig: QuestionBoxUIConfig;
}

const QuestionBox = ({ 
  question, 
  imageUrl,
  audioUrl,
  questionFrame,
  uiConfig 
}: QuestionBoxProps) => {


  return (
    <div 
      className="question-container" 
      style={{ borderImageSource: `url(${questionFrame})` }}
    >
      <div className="question-text">
        <HtmlContent html={question} />
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Question" 
          />
        )}
      </div>

      {audioUrl && (
        <div className="audio-control mt-2 mb-[1cqw] w-full flex justify-center relative z-10">
           <audio src={audioUrl} controls className="max-w-full" />
        </div>
      )}
    </div>
  );
};

export default QuestionBox;