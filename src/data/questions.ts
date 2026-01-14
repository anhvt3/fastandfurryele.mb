export interface Question {
  id: number;
  question: string;
  type: "text" | "image" | "latex";
  imageUrl?: string;
  answers: string[];
  correctIndex: number;
}

// Sample questions (first 5) - used when USE_SAMPLE_DATA is true
export const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "I like to ___ a book before sleeping.",
    type: "text",
    answers: ["kick", "clap", "read", "run"],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "The boy wants to ___ the ball into the net.",
    type: "text",
    answers: ["kick", "count", "write", "clap"],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "A: Can you jump?\nB: __________",
    type: "text",
    answers: ["Yes, I do.", "Yes, I am.", "Yes, I can.", "Yes, I like."],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "A: Do you like to skate?\nB: No, I __________.",
    type: "text",
    answers: ["don't", "not", "can't", "am not"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "Ha Noi is a big ________ in Viet Nam.",
    type: "text",
    answers: ["class", "city", "grade", "address"],
    correctIndex: 1,
  },
];

// Legacy export for backward compatibility
export const questions = sampleQuestions;
