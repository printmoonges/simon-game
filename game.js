const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

//Check for game is started
$(document).keydown(function(){
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//User button clicks
$(".btn").click(function(){

  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatedPress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});
//Check user answer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

}

//Main function
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

//Function of game restart
function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}

//Playing sound function
function playSound(name){

  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//Animation of pressed button function
function animatedPress(currentColour){

  $("#" + currentColour).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}
