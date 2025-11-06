const quizData = [
  {
    question: "1️⃣ What does HTML stand for?",
    a: "Hyper Trainer Marking Language",
    b: "Hyper Text Marketing Language",
    c: "Hyper Text Markup Language",
    d: "Hyper Tool Multi Language",
    correct: "c"
  },
  {
    question: "2️⃣ What is CSS used for?",
    a: "Styling web pages",
    b: "Programming logic",
    c: "Database management",
    d: "Server communication",
    correct: "a"
  },
  {
    question: "3️⃣ Which language runs in a web browser?",
    a: "Python",
    b: "JavaScript",
    c: "C++",
    d: "Java",
    correct: "b"
  },
  {
    question: "4️⃣ What does JS stand for?",
    a: "Java Style",
    b: "Just Script",
    c: "JavaScript",
    d: "JSON Script",
    correct: "c"
  }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const nextBtn = document.getElementById("nextBtn");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer;
  answerEls.forEach(ansEl => {
    if (ansEl.checked) {
      answer = ansEl.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answerEls.forEach(ansEl => ansEl.checked = false);
}

nextBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
        <h2>You answered ${score} / ${quizData.length} correctly 🎉</h2>
        <button onclick="location.reload()">Restart Quiz</button>
      `;
    }
  } else {
    alert("Please select an answer before proceeding!");
  }
});
