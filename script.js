// dependencies (DOM elements)
var quizHeaderEl = document.querySelector("#quiz-header");
var viewScoresButton = document.querySelector("#view-highscores");
var timerEl = document.querySelector("#quiz-timer");
var quizWelcomeEl = document.querySelector("#quiz-welcome");
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

// initial data
var quizTime = 75;

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
        choices: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parentheses",
        ],
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

// function startQuiz to start the quiz for the user
// time starts at 75 seconds and counts down each second
function startQuiz() {
    // reset the timer to 75 seconds
    var timer = quizTime;
    // remove the welcome screen
    // show the quiz
    quizWelcomeEl.classList.add("hide");
    quizContainerEl.classList.remove("hide");
    // start the timer
    var timerInterval = setInterval(function () {
        timer--;
        timerEl.textContent = timer;
        // if the timer reaches 0 or the player finishes the quiz
        // clear the interval
        if (timer === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
    renderQuestions();
}

// function renderQuestions to show and update the questions on the screen for the user
function renderQuestions() {
    // show the question and the choices
    // when a button in the quiz list element is pressed
    // check if correct or wrong answer
    // if wrong, then subtract 10 seconds from the timer
    // check the question number
    // if at the last question, then go to quiz end
    // if not at the last question, then go to next question
}

// function endQuiz to end the quiz and allow the user to enter their initials and highscore
function endQuiz() {
    // stop the timer and record the time left (score)
    // switch to the submit score screen
    // when submit button is pressed,
    // store user input in the form in local storage
    // key value pair: initials, score
    // switch to high scores screen
    // if play again button is pressed, start the game again
    // hide the high scores screen, show the quiz welcome screen
}
