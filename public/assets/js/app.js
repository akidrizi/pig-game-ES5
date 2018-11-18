const winningScore = 100;

let scores = [0, 0];
let roundScores = 0;

let activePlayerID = 0;

let dice = 0;

// [Start new game]: by reloading the page.
window.addEventListener('DOMContentLoaded', startGame);
// [Start new game]: by clicking the relevant button.
document.querySelector('.btn-new').addEventListener('click', startGame);

// [Play]: by clicking the "roll dice" button.
document.querySelector('.btn-roll').addEventListener('click', play);
// [Play]: by clicking on the dice figure.
document.querySelector('.dice').addEventListener('click', play);
// [Play]: by holding down the Space on keyboard.
document.body.onkeydown = (e) => {
	if (e.keyCode === 32) {
		e.preventDefault();
		play();
	}
};

// [Hold points]: by clicking the "hold points" button.
document.querySelector('.btn-hold').addEventListener('click', () => {
	holdPoints();

	if (hasWon()) {
		finishGame();
		return;
	}

	switchUser();
});

/**
 * Resets all the global variables and DOM elements
 * to default for a new game to start.
 */
function startGame() {
	scores = [0, 0];
	const [scorePlayer1, scorePlayer2] = scores;

	roundScores = 0;
	activePlayerID = 0;
	dice = 0;

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
 * Generates a random integer form one(1) to six(6)
 * and changes dice figure based on outcome.
 */
function rollDice() {
	dice = Math.floor(Math.random() * 6) + 1;

	document.querySelector('.dice').src = `assets/images/dice-${dice}.png`;
}

/**
 * Drops the scoreboard to zero(0) and drop player
 * side on the DOM by removing 'active' CSS class
 * on the given playerID.
 *
 * @param {int} playerID
 */
function dropUser(playerID) {
	document.querySelector(`#current-${playerID}`).textContent = 0;
	document.querySelector(`.player-${playerID}-panel`).classList.remove('active');
}

/**
 * Sets player side on the DOM by adding 'active' CSS
 * class on the given playerID.
 *
 * @param {int} playerID
 */
function setCurrentPlayer(playerID) {
	document.querySelector(`.player-${playerID}-panel`).classList.add('active');
}

/**
 * Drops active player, toggles active player ID
 * and sets current player based on the new ID.
 */
function switchUser() {
	dropUser(activePlayerID);
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
	scores[activePlayerID] += roundScores;
	document.querySelector(`#score-${activePlayerID}`).textContent = scores[activePlayerID];

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

/**
 * Rolls the dice if a player has not won yet.
 * Adds the outcome to the round score and updates
 * the current score on DOM.
 *
 * When player rolls ace the turn is passed to
 * the other player.
 */
function play() {
	if (hasWon()) return;

	rollDice();
	roundScores += dice;

	if (hasRolledAce()) {
		roundScores = 0;
		switchUser();
		return;
	}

	document.querySelector(`#current-${activePlayerID}`).textContent = roundScores;
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

	dice = 0;
	roundScores = 0;
}
