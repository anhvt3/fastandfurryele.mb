import questionFrame from "@/assets/question-frame.png";

interface QuestionBoxProps {
  question: string;
  questionNumber: number;
}

const QuestionBox = ({ question, questionNumber }: QuestionBoxProps) => {
  return (
    <div className="question-box w-full px-4">
      <div className="relative w-full">
        <img
          src={questionFrame}
          alt="Question frame"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pt-10 pb-4">
          <span className="text-tet-brown font-bold text-sm mb-2">
            Câu {questionNumber}/10
          </span>
          <p className="text-foreground font-semibold text-center text-base leading-relaxed">
            {question}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
