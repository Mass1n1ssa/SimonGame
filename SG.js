let buttonColours = ["red", "blue", "green", "yellow"];

let gameArea = [];

let userClickedArea = [];

let started = false;

let level = 0;





$(".start-button").click(function (event) {

    if (!started) {
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".b").click(function () {

    var userChosenColour = $(this).attr("id");

    userClickedArea.push(userChosenColour);

    playSound(userChosenColour);
    animation(userChosenColour);

    checkAnswer(userClickedArea.length - 1);

});

function checkAnswer(currentLevel) {

    if (userClickedArea[currentLevel] === gameArea[currentLevel]) {

        if (userClickedArea.length === gameArea.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        gameOver();
        startOver();
    }
}

function startOver() {

    level = 0;
    gameArea = [];
    started = false;
}

function gameOver() {

    playSound("wrong");

    $("#level-title").html("Game Over!! Your score is " + (level - 1));

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

}

function nextSequence() {

    userClickedArea = [];

    level++;

    $("#level-title").html("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let ChosenC = buttonColours[randomNumber];

    gameArea.push(ChosenC);

    $("#" + ChosenC).fadeOut(100).fadeIn(100);

    playSound(ChosenC);

}

function playSound(name) {

    let audio = new Audio(`${name}.mp3`);
    audio.play();

}



function animation(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
