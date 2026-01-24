import TetQuizGame from "@/components/TetQuizGame";
import { useEffect, useState } from "react";
import { DeviceProvider } from "@/context/DeviceContext";
import { DeviceType } from "@/hooks/useDeviceType";

interface IndexProps {
  forcedDeviceType?: DeviceType;
}

const Index = ({ forcedDeviceType }: IndexProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customQuestions, setCustomQuestions] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const learningObjectCode = urlParams.get('learning_object_code');

      if (learningObjectCode) {
        try {
          const response = await fetch(`https://ai-math.clevai.edu.vn/quiz/load-quizs?learning_object_code=${learningObjectCode}`);
          if (response.ok) {
            const data = await response.json();
             if (data.status && data.quizzes) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const fetchedQuestions = data.quizzes.map((quiz: any, index: number) => {
                    // Map options A,B,C,D to 1,2,3,4
                    const letterToId: {[key: string]: number} = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 };
                    
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const answers = quiz.quiz_possible_options
                        .sort((a: any, b: any) => a.option_code.localeCompare(b.option_code))
                        .map((opt: any) => ({
                            id: letterToId[opt.option_code] || 0,
                            content: opt.option_value
                        }));
                    
                    return {
                        id: quiz.quiz_code || `Q_${index}`,
                        text: quiz.content,
                        answers: answers, // Array of objects
                        correctAnswerId: letterToId[quiz.quiz_answers.option_code] || 0,
                        audioUrl: null
                    };
                });
                setCustomQuestions(fetchedQuestions);
            }
          }
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      }
    };

    fetchQuestions();
  }, []);

  return (
    <DeviceProvider key={forcedDeviceType ?? "auto"} forcedDeviceType={forcedDeviceType}>
      {/*
        IMPORTANT: Do NOT constrain the game container width here.
        TetQuizGame already handles responsive inner max-width, while the
        background needs to span the full viewport.
      */}
      <div className="h-full w-full">
        <TetQuizGame customQuestions={customQuestions} />
      </div>
    </DeviceProvider>
  );
};

export default Index;