const buttonColours=["red", "blue", "green","yellow"];
var gamePattern=[];
var userChosenPattern=[];
var level=0;
var click=0;
var gamestarted=false;

function playSound(name) {
  var audio =new Audio ("sounds/"+ name +".mp3");
  audio.play();
}

$(document).keypress(function(){
  if (level==0) {
      gameStarted=true;
      nextInSequence();
  }
});


$(".btn").click(function() {
  if (gameStarted){
      click++;
      var userChosenColour= $(this).attr("id");
      userChosenPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);

      if (userChosenPattern[click-1]==gamePattern[click-1]){
        if((click==level)){

            setTimeout(function(){
              nextInSequence();
            }, 1200);

            click=0;
        }
      }
      else {
        gameover();
      }
   }
});

function nextInSequence(){
  clearArray(userChosenPattern);
  level++;

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  $("#level-title").text("Level "+level);
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 500);
}

function clearArray(gameArray){
    click=0;
    var loop=gameArray.length;

    for(var i=0; i < loop; i++){
        gameArray.pop();
    }
}

function gameover() {
  gameStarted=0;
  clearArray(gamePattern);
  clearArray(userChosenPattern);
  playSound("wrong");
  $("#level-title").text("GAMEOVER !!!");

  $("body").addClass("game-over");
  setTimeout(function(){
      const finalScore = level-1;
      $("#level-title").text("Your score is " + finalScore);
      $("body").removeClass("game-over");
      level=0;
  }, 1500);
}
