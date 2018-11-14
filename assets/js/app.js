const winningScore = 100;

let scores = [0, 0];
let roundScores = 0;

let activePlayerID = 0;

let dice = 0;

window.addEventListener("DOMContentLoaded", function() {
	startGame();
});


document.querySelector(".btn-roll").addEventListener("click", function () {
	if (hasWon())
		return;

	rollDice();
	roundScores += dice;
	
	if (hasRolledAce()) {
		roundScores = 0;
		switchUser();
		return;
	}
	
	document.querySelector("#current-" + activePlayerID).textContent = roundScores;
});

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
	
	document.querySelector(".dice").src = "assets/images/dice-1.png";
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

function dropUser(playerID) {
	document.querySelector("#current-" + playerID).textContent = 0;
	document.querySelector(".player-" + playerID + "-panel").classList.remove("active");
}

function setCurrentPlayer(playerID) {
	document.querySelector(".player-" + playerID + "-panel").classList.add("active");
}

function switchUser() {
	dropUser(activePlayerID);
    activePlayerID === 0 ? (activePlayerID = 1) : (activePlayerID = 0);
	setCurrentPlayer(activePlayerID);    
}

function holdPoints() {
	scores[activePlayerID] += roundScores;
	document.querySelector("#score-" + activePlayerID).textContent = scores[activePlayerID];

	roundScores = 0;
}

function hasWon() {
	if (scores[activePlayerID] >= winningScore)
		return true;
	
	return false;
}

function hasRolledAce() {
	if (dice !== 1)
		return false;
	
	return true;
}
