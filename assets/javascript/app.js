/*
You'll create a trivia game that shows only one question until the player answers it or their time runs out.


If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.


The scenario is similar for wrong answers and time-outs.

If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.



On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

*/


$(document).ready(function() {

    var startSound = document.createElement("audio");
        startSound.setAttribute("src","assets/sounds/port.mp3");
        startSound.play();

    restartQuiz();

    $("button").on("click", function() {
    
        // If Restart Quiz button pressed, then restart the quiz
        if ($(this).attr("id") === "restartQuiz") {
            restartQuiz();
        }
        // Quiz answer button pressed, check answer
        else {
            var answer = checkAnswer($(this).attr("data-btnVal"),questions[questionIndex]);
            displayAnswer (answer, 0, questions[questionIndex])
        }
    
      });


});

// Global Variables & Constants

// Question timer and second time variables/constants
const answerQuestionTime = 30000; // 30 seconds
const displayAnswerTime = 5000; // 15 seconds
const second = 1000;

var questionTimer;
var answerTimer;
var secondTimer;
var timeRemaining;

var questionIndex = 0;
var numCorrect = 0;
var numWrong = 0;

//Trivia questions
var q1 = new TriviaQuestion("Issac's girlfriend is:","Amanda","Rose","Nicole","Karen","Nicole","Nicole Brennan is Isaac's girlfriend and a medical specialist assigned to the USG Ishimura.","assets/images/nicole.jpg");
var q2 = new TriviaQuestion("The ship Issac is piloting at the beginning of Dead Space:","USG Merkin","USG Kellion","USG Ishimura","USG Marrion","USG Kellion","After a guidance system malfunction USG Kellion crashes into the Ishimura dock.","assets/images/ishimura.jpg");
   
var questions = [q1,q2];


// Functions & Objects

 
$("#btn1").mouseover (function (){  
    var btn1Sound = document.createElement("audio");
    btn1Sound.setAttribute("src", "assets/sounds/sound1.mp3");
    btn1Sound.play();
});
$("#btn2").mouseover (function (){  
    var btn2Sound = document.createElement("audio");
    btn2Sound.setAttribute("src", "assets/sounds/choose1.mp3");
    btn2Sound.play();
});
$("#btn3").mouseover (function (){  
    var btn3Sound = document.createElement("audio");
    btn3Sound.setAttribute("src", "assets/sounds/choose1.mp3");
    btn3Sound.play();
});
$("#btn4").mouseover (function (){  
    var btn4Sound = document.createElement("audio");
    btn4Sound.setAttribute("src", "assets/sounds/choose2.mp3");
    btn4Sound.play();
});


// The following code loads the code above,the 'new' TriviaQuestion variables, and pairs the info with values stored in the TriviaQuestion function in sequential order
function TriviaQuestion (question,ans1,ans2,ans3,ans4,correctAns,ansInfo,ansImg) {
    this.question = question;
    this.ans1 = ans1;
    this.ans2 = ans2;
    this.ans3 = ans3;
    this.ans4 = ans4;
    this.correctAns = correctAns;
    this.ansInfo = ansInfo;
    this.ansImg = ansImg;
}

// Gets & Displays the next trivia question
function nextQuestion(){
    clearAnswer();
    questionIndex++;

    if (questionIndex < questions.length) {
        displayQuestion(questions[questionIndex]);
    } else {
        gameOver();
    }
}

// Display a triva question
function displayQuestion(q) {
    var questionNum = questionIndex+1; // Used to display the question number
    var answerArray = [q.ans1,q.ans2,q.ans3,q.ans4] // Temporary array used to randomize the answer order

    shuffleArray(answerArray); // Shuffle the order of the answers

    clearTimeout(answerTimer); // Stop the question timer
    clearInterval(secondTimer); // Stop the second timer

    questionTimer = setTimeout(function(){displayAnswer(false, 1, questions[questionIndex])}, answerQuestionTime); // Set time allowed to answer question
    secondTimer = setInterval(secondCountdown, second); // Set interval time to count down seconds
    timeRemaining = answerQuestionTime/1000; //convert to seconds the time allowed to answer the question

    $("#nextQuestionTime").hide(); // Hide the next question timer
    $("#timeRemaining").html("Time Remaining: "+timeRemaining+" seconds").show().css("color","black"); // Display the time remaining to answer question

    $("#questionNumber").html(questionNum+". ").show();; // Display question number
    $("#triviaQuestion").html(q.question).show(); // Display the trivia question with possible answers
    $("#btn1").html(answerArray[0]).attr("data-btnVal",answerArray[0]).show();
    $("#btn2").html(answerArray[1]).attr("data-btnVal",answerArray[1]).show();
    $("#btn3").html(answerArray[2]).attr("data-btnVal",answerArray[2]).show();
    $("#btn4").html(answerArray[3]).attr("data-btnVal",answerArray[3]).show();
    enableButtons();
}

// Clears the question
function clearQuestion() {
    $("#questionNumber").hide();
    $("#triviaQuestion").hide();
    $("#btn1").hide();
    $("#btn2").hide();
    $("#btn3").hide();
    $("#btn4").hide();
}

// Displays the triva answer, info and image
// Parameters: a: answer (true/false), r: reason (0 = wrong answer/1 = time's up), q: current question
function displayAnswer(a,r,q) {
    if (a) {            // Correct answer selected
        $("#result").html("Correct!").css("color","green");
        $("#nextQuestionTime").hide();
        $("#timeRemaining").hide();
        $("#restartQuiz").hide();
        var correctSound = document.createElement("audio");
        correctSound.setAttribute("src", "assets/sounds/light.mp3");
        correctSound.play()
    }
    else if(r === 0) {      // Wrong Answer selected
        $("#result").html("Wrong!").css("color","red");
        var incorrectSound = document.createElement("audio");
        incorrectSound.setAttribute("src","assets/sounds/discover.mp3");
        incorrectSound.play();
    }
    else {          // Answer not selected in time allowed
        $("#result").html("Times's Up!").css("color","red");
        var outSound = document.createElement("audio");
        outSound.setAttribute("src","assets/sounds/alarm3.mp3");
        outSound.play();
        numWrong++;
    }
    
    clearTimeout(questionTimer); // Stop the question timer
    clearInterval(secondTimer); // Stop the second timer

    answerTimer = setTimeout(nextQuestion, displayAnswerTime); // Set the display answer timer   
    secondTimer = setInterval(secondCountdown, second); // Reset the second timer 

    timeRemaining = displayAnswerTime/1000; // Time for answer to be displayed

    $("#timeRemaining").hide(); // hide the question remaining time counter
    $("#info").html(q.ansInfo);
    $("#nextQuestionTime").html("Next Question in: "+timeRemaining+" seconds").css("color","green").show();
    $("#answerImg").html("<img src='"+q.ansImg+"'>");
}

// Clears the displayed answer
function clearAnswer() {
    $("#result").empty();
    $("#info").empty();
    $("#answerImg").empty();
    $("#nextQuestionTime").hide();
}

// Display the game statistics, display button to restart quiz
function displayStats() {
    $("#correctAns").html("Correct Answers: "+numCorrect).css("color","green");
    $("#wrongAns").html("Wrong Answers: "+numWrong).css("color","red");
    $("#restartQuiz").show();
}

// Clear the game statistics
function clearStats() {
    $("#correctAns").empty();
    $("#wrongAns").empty();
    $("#restartQuiz").hide();
    numCorrect = 0;
    numWrong = 0;
}

// Returns True if the correct answer selected, else returns False
// btnVal: value of the button clicked, question: current question object
function checkAnswer(btnVal,question){
    disableButtons();
    if (btnVal === question.correctAns) {
        numCorrect++;
        return true;
        
    }
    else {
        numWrong++;
        return false;
    }
}

function restartQuiz() {
    clearStats();   // Clear the correct/wrong answer stats
    questionIndex = 0; // reset the question index for new quiz
    shuffleArray(questions); // Shuffle the questions so its not the same quiz
    displayQuestion(questions[questionIndex]); // display the first question
    var startSound = document.createElement("audio");
        startSound.setAttribute("src","assets/sounds/port.mp3");
        startSound.play();
}

// Game Over, displays the correct/wrong answer percentages, option to restart the game
function gameOver() {
    clearQuestion(); // Clear the question
    displayStats(); // Show the correct/wrong answer stats
    clearTimeout(secondTimer); // Stop the second timer
    var endSound = document.createElement("audio");
        endSound.setAttribute("src","assets/sounds/reading.mp3");
        endSound.play();
}

function secondCountdown() {
    timeRemaining--;
    var tickSound = document.createElement("audio");
        tickSound.setAttribute("src","assets/sounds/beep2.mp3");
        tickSound.play();
    if (timeRemaining <= 10) {       // Warn user time is running out
        $("#timeRemaining").html("Time Remaining: "+timeRemaining+" seconds").css("color","red");
        var outSound = document.createElement("audio");
        outSound.setAttribute("src","assets/sounds/beep1.mp3");
        outSound.play();
        tickSound.pause();
    } else {
        $("#timeRemaining").html("Time Remaining: "+timeRemaining+" seconds").css("color","white");  
    }
    $("#nextQuestionTime").html("Next Question in: "+timeRemaining+" seconds");
    
}

function disableButtons() {
    $("#btn1").prop("disabled",true);
    $("#btn2").prop("disabled",true);
    $("#btn3").prop("disabled",true);
    $("#btn4").prop("disabled",true);
}

function enableButtons() {
    $("#btn1").prop("disabled",false);
    $("#btn2").prop("disabled",false);
    $("#btn3").prop("disabled",false);
    $("#btn4").prop("disabled",false);
}

// Fisher-Yates shuffle algorithm
function shuffleArray (array) {
    var i = 0, j = 0, temp = null
  
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

