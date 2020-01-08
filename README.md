# TriviaGame
5: Trivia Game - University of Arizona Full Stack Flex Web Developer Coding Bootcamp assignment. In this assignment, we create a Trivia game using JavaScript for the logic and jQuery to manipulate HTML.

Changes since last version:
- Countdown turns red when reaches 10
- Added sound for game over, game start, game restart, correct answer, incorrect answer, 10 second countdown and out of time alert
- Added sounds for timer countdown 1 & timer countdown 2
- Added sounds for on Hover of answer buttons
- After an hour of trying to figure out why sounds not sounding on Hover, I realized that the code was correct but Google Autoplay policy was not letting the sounds initiate until user actually clicked or interacted with HTML objects, so...
- Added "start game" button to HTML and wrote code that stops game from starting until player clicks "start" button. Start button forces users to interact with HTML object thus circumventing Google Autoplay policy. All sounds now working.
- Added code to remove start button during gameplay
- Adjusted some CSS styling
