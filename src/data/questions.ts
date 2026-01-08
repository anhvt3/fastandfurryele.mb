export interface Question {
  id: number;
  question: string;
  answers: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Bánh chưng được gói bằng lá gì?",
    answers: ["Lá chuối", "Lá dong", "Lá sen", "Lá tre"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Hoa nào là biểu tượng của Tết miền Bắc?",
    answers: ["Hoa mai", "Hoa đào", "Hoa cúc", "Hoa hồng"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Tết Nguyên Đán thường rơi vào tháng mấy dương lịch?",
    answers: ["Tháng 12", "Tháng 1 hoặc 2", "Tháng 3", "Tháng 11"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "Mâm ngũ quả thường có mấy loại quả?",
    answers: ["3 loại", "4 loại", "5 loại", "6 loại"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "Người đầu tiên bước vào nhà năm mới gọi là gì?",
    answers: ["Xông đất", "Chúc Tết", "Lì xì", "Du xuân"],
    correctIndex: 0,
  },
  {
    id: 6,
    question: "Tiền mừng tuổi trong ngày Tết gọi là gì?",
    answers: ["Tiền lẻ", "Lì xì", "Tiền thưởng", "Tiền công"],
    correctIndex: 1,
  },
  {
    id: 7,
    question: "Hoa nào là biểu tượng của Tết miền Nam?",
    answers: ["Hoa đào", "Hoa mai", "Hoa lan", "Hoa tulip"],
    correctIndex: 1,
  },
  {
    id: 8,
    question: "Ngày cuối cùng của năm âm lịch gọi là gì?",
    answers: ["Mùng 1 Tết", "Đêm giao thừa", "Tất niên", "Rằm tháng Giêng"],
    correctIndex: 2,
  },
  {
    id: 9,
    question: "Bánh tét là đặc sản của vùng nào?",
    answers: ["Miền Bắc", "Miền Trung và Nam", "Miền núi", "Tây Nguyên"],
    correctIndex: 1,
  },
  {
    id: 10,
    question: "Câu đối Tết thường được viết trên giấy màu gì?",
    answers: ["Màu vàng", "Màu xanh", "Màu đỏ", "Màu trắng"],
    correctIndex: 2,
  },
];
