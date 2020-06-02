// dependencies (DOM elements)
var quizHeaderEl = document.querySelector("#quiz-header");
var viewScoresButton = document.querySelector("#view-highscores");
var timerEl = document.querySelector("#quiz-timer");
var quizWelcomeEl = document.querySelector("#quiz-welcome");
var startButton = document.querySelector("#start-button");
var quizContainerEl = document.querySelector("#quiz-container");
var quizQuestionEl = document.querySelector("#quiz-question");
var quizChoicesEl = document.querySelector("#quiz-choices");
var quizGradingEl = document.querySelector("#quiz-grading");
var quizEndEl = document.querySelector("#quiz-end");
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submit-initials");
var quizScoresEl = document.querySelector("#quiz-highscores-container");
var quizScoresList = document.querySelector("#highscores-list");
var backButton = document.querySelector("#back-button");
var clearButton = document.querySelector("#clear-button");

// global variables
var quizTime;
var questionNum;

// array of quiz questions
// includes the question, 4 choices, and its answer (index of choices array)
var quizQuestions = [
  {
    question: "Commonly used data types DO NOT include: ",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "2",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ______.",
    choices: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    answer: "2",
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    choices: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "3",
  },
  {
    question:
      "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "2",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      "1. Javascript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "3",
  },
];

// function init
// initializes global variables
function init() {
  quizTime = 75;
  questionNum = 0;
  timerEl.classList.remove("hide");
}

// function startQuiz to start the quiz for the user
// time starts at 75 seconds and counts down each second
function startQuiz(event) {
  // do not reload on button click
  event.preventDefault();
  // start timer at 75, start at first question
  init();

  // remove the welcome screen
  // show the quiz
  quizWelcomeEl.classList.add("hide");
  quizContainerEl.classList.remove("hide");
  // start the timer
  var timerInterval = setInterval(function () {
    quizTime--;
    timerEl.textContent = quizTime;
    // if the timer reaches 0 or the player finishes the quiz
    // clear the interval
    if (quizTime <= 0) {
      // prevent negative timer number
      quizTime = 0;
      endQuiz();
      clearInterval(timerInterval);
    }
  }, 1000);
  renderQuestions(questionNum);
}

// function renderQuestions to show and update the questions on the screen for the user
function renderQuestions(currentQuestionNum) {
  console.log("questionnum", questionNum);
  console.log("currentquestionnum", currentQuestionNum);
  // check the question number
  if (currentQuestionNum === quizQuestions.length) {
    // if at the last question, then go to quiz end
    endQuiz();
    // if not at the last question, then go to next question
  } else {
    // show the question and the choices
    var currentQuizQuestion = quizQuestions[currentQuestionNum];
    quizQuestionEl.textContent = currentQuizQuestion.question;

    for (var i = 0; i < currentQuizQuestion.choices.length; i++) {
      var choiceListEl = document.createElement("button");
      choiceListEl.setAttribute("data-index", i);
      choiceListEl.textContent = currentQuizQuestion.choices[i];
      quizChoicesEl.appendChild(choiceListEl);
      // }
      // when a button in the quiz list element is pressed
      choiceListEl.addEventListener("click", function (event) {
        // do not reload page
        event.preventDefault();
        // if (event.target.matches("button")) {
        // check if correct or wrong answer
        // if wrong, then subtract 10 seconds from the timer
        if (
          event.target.getAttribute("data-index") === currentQuizQuestion.answer
        ) {
          quizGradingEl.textContent = "Correct!";
        } else {
          quizGradingEl.textContent = "Wrong!";
          quizTime -= 10;
        }
        // show correct or wrong for 3 seconds only
        var timerTimeout = setTimeout(function () {
          quizGradingEl.textContent = "";
        }, 3000);

        // remove all the current question choices
        quizChoicesEl.innerHTML = "";

        // increment question number
        currentQuestionNum++;

        renderQuestions(currentQuestionNum);
        // }
      });
    }
  }
}

function renderHighScores() {
  quizScoresEl.classList.remove("hide");
  // get all the scores from localStorage
  var highScores = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    var initials = keys[i];
    var score = localStorage.getItem(initials);
    highScores.push({ initials: initials, score: score });
  }
  // sort array, descending order
  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores.forEach((quizScore) => {
    var highScoreListItem = document.createElement("li");
    highScoreListItem.textContent = `${quizScore.initials}, ${quizScore.score}`;
    quizScoresList.append(highScoreListItem);
  });
}
// function endQuiz to end the quiz and allow the user to enter their initials and highscore
function endQuiz() {
  // stop the timer and record the time left (score)
  timerEl.classList.add("hide");
  var score = quizTime;
  timerEl.textContent = score;
  // switch to the submit score screen
  quizContainerEl.classList.add("hide");
  quizEndEl.classList.remove("hide");
  // when submit button is pressed,
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var userInitials = initialsInput.value;
    localStorage.setItem(userInitials, score);
    quizEndEl.classList.add("hide");
    renderHighScores();
  });
  // store user input in the form in local storage
  // key value pair: initials, score
  // switch to high scores screen
  // if play again button is pressed, start the game again
  // hide the high scores screen, show the quiz welcome screen
}

// when start quiz button is pressed
// start the quiz
startButton.addEventListener("click", startQuiz);
