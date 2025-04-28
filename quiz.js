const quizData = [
  {
    question: "Find the diameter of a circle whose perimeter is 149.8cm",
    options: ["45.31cm", "47.68cm", "55.41cm", "40.33cm"],
    answer: 1
  },
  {
    question: "convert 0.749rad to degree and minute",
    options: ["42°55'", "45°20'", "30°40'", "60°20'"],
    answer: 0
  },
  {
      question: "Express 150° in radians in terms of π", 
      options:["6π/7", "5π/7", "6π/5", "5π/6"], 
      answer:3
  }, 
  {
      question: "The sum of three consecutive numbers is 36. Find the first number.", 
      options:["14", "11", "8", "5"], 
      answer:1
  }, 
  {
      question:"Evaluate log₃9.",
      options:["2", "4", "6", "8"],
      answer:0
  },
  {
      question: "Solve the equation log₂x = 5",
      options:["23", "32", "24", "42"],
      answer:1
  },
  {
      question: "Evaluate sec302°29' correct to 4 decimal places",
      options: ["1.1453", "1.4563", "2.4536", "1.8620"],
      answer:3
  }
  

];

let currentQuestion = 0;
let score = 0;
let time = 120; // 60 seconds
let timerInterval;

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  questionElement.textContent = quizData[currentQuestion].question;
  optionsElement.innerHTML = "";
  quizData[currentQuestion].options.forEach((option, index) => {
    const liElement = document.createElement("li");
    const inputElement = document.createElement("input");
    inputElement.type = "radio";
    inputElement.name = "option";
    inputElement.value = index;
    liElement.appendChild(inputElement);
    liElement.appendChild(document.createTextNode(option));
    optionsElement.appendChild(liElement);
  });
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  const feedbackElement = document.getElementById("feedback");
  if (selectedOption.value == quizData[currentQuestion].answer) {
    score++;
    document.getElementById("score-value").textContent = score;
    feedbackElement.textContent = "Correct!";
    feedbackElement.classList.add("correct");
    feedbackElement.classList.remove("incorrect");
  } else {
    feedbackElement.textContent = `Incorrect! The correct answer was ${quizData[currentQuestion].options[quizData[currentQuestion].answer]}`;
    feedbackElement.classList.add("incorrect");
    feedbackElement.classList.remove("correct");
  }
  setTimeout(() => {
    feedbackElement.textContent = "";
    feedbackElement.classList.remove("correct", "incorrect");
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 3000);
}

function showResult() {
  clearInterval(timerInterval);
  const resultElement = document.getElementById("result");
  resultElement.textContent = `Quiz completed! Your final score is ${score} out of ${quizData.length}`;
  document.getElementById("submit").disabled = true;
}

function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    document.getElementById("time").textContent = time;
    if (time <= 0) {
      clearInterval(timerInterval);
      showResult();
    }
  }, 2000);
}

document.getElementById("submit").addEventListener("click", checkAnswer);

startTimer();
loadQuestion();
