let playerArray = [];
let computerArray = [];
let level = 0;
let started = false;
let canClick = false;

$("body").keypress(function () {
  if (!started) newRound();
  started = true;
});

$(".btn").click(function () {
  if (!canClick) return;

  const currentPad = $(this).attr("id");
  playerArray.push(Number(currentPad.slice(-1)));
  buttonAnimation(currentPad);
  arrayCheck(playerArray.length - 1);
});

function arrayCheck(arrayPosition) {
  if (computerArray[arrayPosition] === playerArray[arrayPosition]) {
    if (computerArray.length === playerArray.length) {
      setTimeout(function () {
        newRound();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function newRound() {
  canClick = false;
  level++;
  $("h3").text("Level " + level);
  playerArray = [];
  computerArray.push(Math.floor(Math.random() * 9) + 1);
  arrayPlayback(computerArray);
  setTimeout(() => {
    canClick = true;
  }, computerArray.length * 1000);
}

function buttonAnimation(currentPad) {
  $("#" + currentPad).addClass("pressed");
  setTimeout(function () {
    $("#" + currentPad).removeClass("pressed");
  }, 200);
}

function arrayPlayback(array) {
  array.forEach((item, i) => {
    setTimeout(function () {
      buttonAnimation("pad" + item.toString());
    }, 1000 + i * 1000);
  });
}

function gameOver() {
  $("h3").text("Game Over, Press any key to restart");
  $("body").addClass("gameOver");
  setTimeout(function () {
    $("body").removeClass("gameOver");
  }, 300);
  computerArray = [];
  started = false;
  canClick = false;
  level = 0;
}
