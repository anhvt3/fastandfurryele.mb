export interface Question {
  id: number;
  question: string;
  type: "text" | "image" | "latex";
  imageUrl?: string;
  answers: string[];
  correctIndex: number;
}

// Sample questions (5 questions to match FIXED_TOTAL_QUESTIONS)
// Includes HTML and LaTeX examples for testing rich text rendering
export const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Đọc và hiểu ngữ cảnh của đoạn văn xung quanh câu hỏi số 5\n\nĐoạn văn nói về phương tiện công cộng, ưu điểm và nhược điểm. Câu trước câu hỏi 5: \"During rush hour, buses and trains can become extremely crowded, making the commute uncomfortable.\" Câu hỏi 5 tiếp tục nói về một vấn đề khác: sự chậm trễ. Hãy xác định ngữ cảnh của đoạn văn xung quanh câu hỏi số 5.",
    type: "text",
    answers: [
      "Đoạn văn nói về phương tiện công cộng, ưu điểm và nhược điểm. Câu trước câu hỏi 5: 'During rush hour, buses and trains can become extremely crowded,'",
      "Delays and waiting",
      "Expensive tickets",
      "Long disng rush hour, buses and trains can become extremely crtances"
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Tính giá trị của biểu thức: $\\sqrt{16} + \\frac{8}{4}$",
    type: "latex",
    answers: [
      "$4$",
      "$6$",
      "$8$",
      "$10$"
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Phương trình bậc hai $x^2 - 5x + 6 = 0$ có nghiệm là:",
    type: "latex",
    answers: [
      "$x = 1$ và $x = 6$",
      "$x = 2$ và $x = 3$",
      "$x = -2$ và $x = -3$",
      "$x = 0$ và $x = 5$"
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "A: Can you jump?\nB: __________",
    type: "text",
    answers: ["Yes, I do.", "Yes, I am.", "Yes, I can.", "Yes, I like."],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "Đạo hàm của hàm số $f(x) = x^3 + 2x^2 - x + 1$ là:",
    type: "latex",
    answers: [
      "$f'(x) = 3x^2 + 4x - 1$",
      "$f'(x) = 3x^2 + 2x - 1$",
      "$f'(x) = x^2 + 4x - 1$",
      "$f'(x) = 3x^3 + 4x^2 - 1$"
    ],
    correctIndex: 0,
  },
];

// Legacy export for backward compatibility
export const questions = sampleQuestions;
