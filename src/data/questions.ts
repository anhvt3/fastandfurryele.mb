export interface Question {
  id: number;
  question: string;
  answers: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "I like to ___ a book before sleeping.",
    answers: ["kick", "clap", "read", "run"],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "The boy wants to ___ the ball into the net.",
    answers: ["kick", "count", "write", "clap"],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "A: Can you jump?\nB: __________",
    answers: ["Yes, I do.", "Yes, I am.", "Yes, I can.", "Yes, I like."],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "A: Do you like to skate?\nB: No, I __________.",
    answers: ["don't", "not", "can't", "am not"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "Ha Noi is a big ________ in Viet Nam.",
    answers: ["class", "city", "grade", "address"],
    correctIndex: 1,
  },
  {
    id: 6,
    question: "5 / am / grade / in / I / .",
    answers: ["I am 5 in grade.", "I am in grade 5.", "Grade 5 I am in.", "I in am grade 5."],
    correctIndex: 1,
  },
  {
    id: 7,
    question: "How many ______ are there on the table?",
    answers: ["pen", "a pen", "pens", "pencil"],
    correctIndex: 2,
  },
  {
    id: 8,
    question: "How do you spell your name?",
    answers: ["My name is Mary.", "M-A-R-Y.", "It is Mary.", "I am Mary."],
    correctIndex: 1,
  },
  {
    id: 9,
    question: "Mr. Nam works at a TV station. He tells people about daily events. He is a ______.",
    answers: ["firefighter", "reporter", "gardener", "writer"],
    correctIndex: 1,
  },
  {
    id: 10,
    question: "children / like / I'd / to / teach / .",
    answers: ["I'd like teach to children.", "I'd like to teach children.", "I'd to like teach children.", "Teach children I'd like to."],
    correctIndex: 1,
  },
];
