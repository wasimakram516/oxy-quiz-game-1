const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Function to shuffle both questions and their options
const shuffleQuestionsAndOptions = (questions) => {
  const shuffledQuestions = shuffleArray([...questions]); // Shuffle the questions array
  return shuffledQuestions.map((question) => {
    const correctAnswerText = question.options[question.answer]; // Get the correct answer text
    const shuffledOptions = shuffleArray([...question.options]); // Shuffle options
    const newAnswerIndex = shuffledOptions.indexOf(correctAnswerText); // Find new index of the correct answer

    return {
      ...question,
      options: shuffledOptions,
      answer: newAnswerIndex,
    };
  });
};

const questions = [
  {
    question: "What are the three parts of an Individual Development Plan (IDP)?",
    options: [
      "Goals, tasks, and tools",
      "Knowledge, skills, and abilities",
      "Strengths, habits, and goals",
      "Actions, feedback, and goals",
    ],
    answer: 1,
  },
  {
    question: "Why is it important to find development areas?",
    options: [
      "To make more workshops for employees",
      "To help employees grow in ways that fit company goals",
      "To create new job roles",
      "To focus only on technical skills",
    ],
    answer: 1,
  },
  {
    question: "What are the main parts of performance goals?",
    options: [
      "Knowledge and tasks",
      "Objectives and behaviors",
      "Feedback and growth",
      "Development plans",
    ],
    answer: 1,
  },
  {
    question: "What does a leader do in performance rating calibration?",
    options: [
      "Provide system training",
      "Make sure evaluations are fair and consistent",
      "Run team-building workshops",
      "Create new goals for employees",
    ],
    answer: 1,
  },
  {
    question: "Why align personal development with company goals?",
    options: [
      "To reduce mistakes",
      "To help employees grow while helping the company succeed",
      "To lower costs",
      "To make performance reviews faster",
    ],
    answer: 1,
  },
];

// Export questions with shuffled questions and options
export default shuffleQuestionsAndOptions(questions);
