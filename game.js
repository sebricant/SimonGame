// // $(()=>alert('hi man Im here'))
const buttonColours =["red", "blue", "green", "yellow"];
let userClickedPattern=[]

let gamePattern=[]
let level=0;
let started=false


$(".btn").on("click",function(){
  let userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  checkAnswer(userClickedPattern.length-1)
})

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level)
    nextSequence()
    started=true;
  }
})

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  console.log(level);
  const randomNum = Math.floor(Math.random()*4)
  let randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound("#" + randomChosenColour)
}

function playSound(name){
  var audio= new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed")
  setTimeout(()=>{
    $("#"+ currentColour).removeClass("pressed")
  },100)
}

function checkAnswer(currentLevel1){
  if(gamePattern[currentLevel1]===userClickedPattern[currentLevel1]){
    console.log("success",gamePattern[currentLevel1],userClickedPattern[currentLevel1]);
    
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence()
      },1000)
    }
  }else{
      console.log("wrong");
      setTimeout(()=>{
        playSound("wrong")
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
          $("body").removeClass("game-over")
        }, 300);
        startOver();
      },300)
    }
  }

  function startOver(){
    gamePattern=[]
    level=0;
    started=false;
  }

