const API_BASE_URL = 'https://ai-math.clevai.edu.vn/quiz/load-quizs';

export interface Question {
  id: number;
  question: string;
  type: "text" | "image" | "latex";
  imageUrl?: string;
  answers: string[];
  correctIndex: number;
}

function getLearningObjectCode(): string | null {
  const url = window.location.href;
  const match = url.match(/learning_object_code=([^&\/]+)/);
  return match ? match[1] : null;
}

interface ApiQuiz {
  content: string;
  quiz_code: string;
  quiz_possible_options: {
    option_code: string;
    option_value: string;
  }[];
  quiz_answers: {
    option_code: string;
  };
}

interface ApiResponse {
  status: boolean;
  quizzes: ApiQuiz[];
}

function convertApiResponseToQuestions(apiResponse: ApiResponse): Question[] {
  if (!apiResponse.status || !apiResponse.quizzes) {
    throw new Error('Invalid API response');
  }

  return apiResponse.quizzes.map((quiz, index) => {
    const options = quiz.quiz_possible_options
      .sort((a, b) => a.option_code.localeCompare(b.option_code));

    const answers = options.map(opt => opt.option_value);
    const correctIndex = options.findIndex(opt => opt.option_code === quiz.quiz_answers.option_code);

    return {
      id: index + 1,
      question: quiz.content,
      type: "text" as const,
      answers: answers,
      correctIndex: correctIndex,
    };
  });
}

export const fetchQuestions = async (): Promise<Question[]> => {
  const learningObjectCode = getLearningObjectCode();

  if (!learningObjectCode) {
    throw new Error('learning_object_code not found in URL. URL format: ?learning_object_code=XXX');
  }

  const apiUrl = `${API_BASE_URL}?learning_object_code=${encodeURIComponent(learningObjectCode)}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: ApiResponse = await response.json();
  return convertApiResponseToQuestions(data);
};
