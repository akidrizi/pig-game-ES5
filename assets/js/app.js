var winningScore = 100;

var scores = [0, 0];
var roundScores = 0;

var activePlayerID = 0;

var dice = 0;

window.addEventListener("DOMContentLoaded", startGame);
document.querySelector(".btn-roll").addEventListener("click", play);
document.querySelector(".dice").addEventListener("click", play);

document.body.onkeydown = function (e) {
  if (e.keyCode == 32) {
    e.preventDefault();
    play();
  }
};

document.querySelector(".btn-hold").addEventListener("click", function () {
  holdPoints();

  if (hasWon()) {
    finishGame();
    return;
  }

  switchUser();
});

document.querySelector(".btn-new").addEventListener("click", function () {
  startGame();
  console.log('Started new game');
});

function startGame() {
  scores = [0, 0];
  roundScores = 0;
  activePlayerID = 0;
  dice = 0;

  document.querySelector("#score-0").textContent = scores[0];
  document.querySelector("#score-1").textContent = scores[1];

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector("#name-0").textContent = 'Player 1!';
  document.querySelector("#name-1").textContent = 'Player 2!';

  document.querySelector(".dice").src = "assets/images/dice-1.png";
}

function play() {
  if (hasWon()) return;

  rollDice();
  roundScores += dice;

  if (hasRolledAce()) {
    roundScores = 0;
    switchUser();
    return;
  }

  document.querySelector("#current-" + activePlayerID).textContent = roundScores;
}

function finishGame() {
  document.querySelector(".player-" + activePlayerID + "-panel").classList.add("winner");
  document.querySelector("#name-" + activePlayerID).textContent = 'WINNER!';

  dice = 0;
  roundScores = 0;
}

function rollDice() {
  dice = Math.floor(Math.random() * 6) + 1;

  document.querySelector("#current-" + activePlayerID).textContent = dice;
  document.querySelector(".dice").src = "assets/images/dice-" + dice + ".png";
}

/**
 * Makes all the relevant changes to drop
 * active player by setting current points 
 * on DOM to 0 and removing 'active' CSS class.
 * 
 * @param {int} playerID 
 */
function dropUser(playerID) {
  document.querySelector("#current-" + playerID).textContent = 0;
  document.querySelector(".player-" + playerID + "-panel").classList.remove("active");
}

/**
 * Changes side to the DOM by setting 'active' CSS
 * class to active's player side.
 * 
 * @param {int} playerID 
 */
function setCurrentPlayer(playerID) {
  document.querySelector(".player-" + playerID + "-panel").classList.add("active");
}

/**
 * Drops active player, toggle active player ID
 * and sets current player based on the new ID.
 */
function switchUser() {
  dropUser(activePlayerID);
  activePlayerID === 0 ? (activePlayerID = 1) : (activePlayerID = 0);
  setCurrentPlayer(activePlayerID);
}

/**
 * Stores all the current points
 * of the active player to his
 * scoreboard and updates DOM score.
 * Resets round scores.
 */
function holdPoints() {
  scores[activePlayerID] += roundScores;
  document.querySelector("#score-" + activePlayerID).textContent = scores[activePlayerID];

  roundScores = 0;
}

/**
 * Whether active player managed
 * to hold more points that the
 * winning milestone.
 *
 * @return bool
 */
function hasWon() {
  if (scores[activePlayerID] >= winningScore) return true;

  return false;
}

/**
 * Whether player has rolled one(1)
 * during his turn.
 *
 * @return bool
 */
function hasRolledAce() {
  if (dice !== 1) return false;

  return true;
}