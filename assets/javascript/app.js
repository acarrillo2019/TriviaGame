/*
You'll create a trivia game that shows only one question until the player answers it or their time runs out.


If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.


The scenario is similar for wrong answers and time-outs.

If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.



On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

*/


$(document).ready(function() {

});

const answerQuestionTime = 30000; // 30 seconds
const displayAnswerTime = 15000; // 15 seconds
const second = 1000;

var questionTimer;
var answerTimer;
var secondTimer;
var timeRemaining;

var questionIndex = 0;
var numCorrect = 0;
var numWrong = 0;

//Trivia questions
var q1 = new TriviaQuestion("What is Issac's girlfriend's name:","Amanda","Rose","Nicole","Karen","Nicole","","assets/images/moon.jpg");
var q2 = new TriviaQuestion("What is the name of the ship Issac is piloting in the beginning of Dead Space?","USG Merkin","USG Kellion","USG Ishimura","USG Marrion","USG Kellion","After a guidance system malfunction USG Kellion crashes into the Ishimura dock.","assets/images/mango.jpg");
   

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

/* Durstenfeld shuffle
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
} */

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



