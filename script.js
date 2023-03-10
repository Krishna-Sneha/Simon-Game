
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var count = 1;
var flag = 0;
var colorClicked;


function nextSequence(){
    
    userClickedPattern = [];
    var randNum = Math.floor(Math.random()*(3-0+1))+0;
    var color = buttonColors[randNum];
    gamePattern.push(color);

    $("h1").html("Level "+level);
    level++;

    $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
    
}

function playSound(color)
{
    var audio = new Audio(color+".mp3");
    audio.play();
}


function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")},
    100);
}

function Validate(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length == userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence()
            }, 1000);
         }
        
    }

    else
    {
        playSound("wrong");
        $("h1").html("Game Over, Press any key to restart")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        level = 0;
        started = false;

    }

}

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
    colorClicked = $(this).attr("id");
    userClickedPattern.push(colorClicked);

    playSound(colorClicked);
    animatePress(colorClicked);

    Validate(userClickedPattern.length-1);
});
