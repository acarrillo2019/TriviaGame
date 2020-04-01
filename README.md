# DEAD SPACE TriviaGame
5: Trivia Game - University of Arizona Full Stack Flex Web Developer Coding Bootcamp assignment. In this assignment, we create a Trivia game using JavaScript for the logic and jQuery to manipulate HTML.

![](/screenshots/ds_1.PNG)

# Description
The DEAD SPACE Trivia game is based off the legendary video game series, DEAD SPACE. There is a ticking countdown clock per question. A user has thirty seconds to answer the question, when the count down clock turns red and changes sound. When a user hovers on possible answer, the answer plays a sound. Whether a question is answered correctly or not, there is a brief explanation of the true answer.


![](/screenshots/ds_2.PNG)


There are differing sounds based on whether the user guessed right OR wrong. There are also differing sounds for when a user runs out of time, starts the game or finishes a game. 


![](/screenshots/ds_3.PNG)


All sounds are taken directly from the DEAD SPACE video game.

Sorry about the spoilers.


![](/screenshots/ds_4.PNG)


Changes since last version:
- Countdown turns red when reaches 10
- Added sound for game over, game start, game restart, correct answer, incorrect answer, 10 second countdown and out of time alert
- Added sounds for timer countdown 1 & timer countdown 2
- Added sounds for on Hover of answer buttons
- After an hour of trying to figure out why sounds not sounding on Hover, I realized that the code was correct but Google Autoplay policy was not letting the sounds initiate until user actually clicked or interacted with HTML objects, so...
- Added "start game" button to HTML and wrote code that stops game from starting until player clicks "start" button. Start button forces users to interact with HTML object thus circumventing Google Autoplay policy. All sounds now working.
- Added code to remove start button during gameplay
- Adjusted some CSS styling
