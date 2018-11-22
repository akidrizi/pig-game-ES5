// Points that a player has to collect in order to win
const winningScore = 100;
// Current Player ID
let activePlayerID = 0;
// Scoreboard
let scores = [0, 0];
// Current rounds scores
let roundScore = 0;
// Previous roll
let previousRoll = 0;
// Current roll - Dice current value
let currentRoll = 0;

// [Start new game]: by reloading the page.
window.addEventListener('DOMContentLoaded', startGame);
// [Start new game]: by clicking the relevant button.
document.querySelector('.btn-new').addEventListener('click', startGame);

// [Roll]: by clicking the "roll dice" button.
document.querySelector('.btn-roll').addEventListener('click', roll);
// [Roll]: by clicking on the dice figure.
document.querySelector('.dice').addEventListener('click', roll);
// [Roll]: by holding down the Space on keyboard.
document.body.onkeydown = (e) => {
	if (e.keyCode === 32) {
		e.preventDefault();
		roll();
	}
};

// [Hold]: by clicking the "hold points" button.
document.querySelector('.btn-hold').addEventListener('click', hold);

/**
 * Stars a new game by resetting everything to default.
 */
function startGame() {
	resetGame();

	const [scorePlayer1, scorePlayer2] = scores;

	document.querySelector('#score-0').textContent = scorePlayer1;
	document.querySelector('#score-1').textContent = scorePlayer2;

	document.querySelector('#current-0').textContent = 0;
	document.querySelector('#current-1').textContent = 0;

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	document.querySelector('#name-0').textContent = 'Player 1!';
	document.querySelector('#name-1').textContent = 'Player 2!';

	document.querySelector('.dice').src = 'assets/images/dice-1.png';
}

/**
 * Roll the dice and add the current roll
 * to the total score for this round.
 * Will pass round or not roll, based on rules.
 *
 * Complies to the following rules:
 * ? Cannot Play if already someone won.
 * ? Switches Side when rolling Ace.
 * ? Switches Side when rolling twice in a row Six.
 */
function roll() {
	if (hasWon()) return;

	rollDice();

	if (hasRolledAce() || hasRolledSixTwice()) {
		switchPlayer();
		return;
	}

	document.querySelector(`#current-${activePlayerID}`).textContent = roundScore;
}

/**
 * Holds all the points that the user has gathered on
 * his round on the scoreboard and then switches player.
 *
 * Will finish the game if the player has gathered the
 * required points in order to win.
 */
function hold() {
	holdPoints();

	if (hasWon()) {
		finishGame();
		return;
	}

	switchPlayer();
}

/**
 * Assigns the winner by adding 'winner' CSS class
 * on the active player.
 *
 * Finally set the dice and the round score to zero(0).
 */
function finishGame() {
	document.querySelector(`.player-${activePlayerID}-panel`).classList.add('winner');
	document.querySelector(`#name-${activePlayerID}`).textContent = 'WINNER!';

	resetRound();
}

/**
 * Generates a random integer form one(1) to six(6) and
 * adds up to the roundsScore. Saves the previous roll
 * and changes dice figure based on outcome.
 */
function rollDice() {
	previousRoll = currentRoll;

	currentRoll = Math.floor(Math.random() * 6) + 1;
	roundScore += currentRoll;

	document.querySelector('.dice').src = `assets/images/dice-${currentRoll}.png`;
}

/**
 * Drops the DOM scoreboard to zero(0) and deactivate player
 * side on the DOM by removing 'active' CSS class on the
 * given playerID.
 *
 * @param {int} playerID
 */
function dropPlayer(playerID) {
	document.querySelector(`#current-${playerID}`).textContent = 0;
	document.querySelector(`.player-${playerID}-panel`).classList.remove('active');
}

/**
 * Sets active player side on the DOM by adding 'active' CSS
 * class on the given playerID.
 *
 * @param {int} playerID
 */
function setCurrentPlayer(playerID) {
	document.querySelector(`.player-${playerID}-panel`).classList.add('active');
}

/**
 * Drops active player and resets round.
 * Toggles active player ID and sets
 * new player based by the new ID.
 */
function switchPlayer() {
	dropPlayer(activePlayerID);
	resetRound();
	(activePlayerID === 0) ? (activePlayerID = 1) : (activePlayerID = 0);
	setCurrentPlayer(activePlayerID);
}

/**
 * Stores all the current points
 * of the active player to his
 * scoreboard and updates DOM score.
 *
 * Resets round scores.
 */
function holdPoints() {
	scores[activePlayerID] += roundScore;
	document.querySelector(`#score-${activePlayerID}`).textContent = scores[activePlayerID];
}

/**
 * Resets all global variables that store points
 * of an entire game.
 * Then sets current player ID to zero(0).
 */
function resetGame() {
	scores = [0, 0];
	roundScore = 0;
	previousRoll = 0;
	currentRoll = 0;

	activePlayerID = 0;
}

/**
 * Resets all global variables that store current
 * round points.
 */
function resetRound() {
	roundScore = 0;
	previousRoll = 0;
	currentRoll = 0;
}

/**
 * Whether active player managed
 * to hold more points that the
 * winning milestone.
 *
 * @return {bool}
 */
function hasWon() {
	if (scores[activePlayerID] >= winningScore) return true;

	return false;
}

/**
 * Whether player has rolled one(1)
 * during his turn.
 *
 * @return {bool}
 */
function hasRolledAce() {
	if (currentRoll !== 1) return false;

	return true;
}

/**
 * Whether player has rolled six(6)
 * twice in a row.
 *
 * @return {bool}
 */
function hasRolledSixTwice() {
	if ((previousRoll === 6) && (currentRoll === 6)) return true;

	return false;
}
