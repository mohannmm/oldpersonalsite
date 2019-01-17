// buffer, word, wordList
// updateWord(), checkCorrectWord(), //correctWordFound()
// 1000 most common words in English language : https://gist.github.com/deekayen/4148741#file-1-1000-txt
//

var words = ["Apple", "Bob", "cat", "dog", "lactate", "incel", "super", "intermediate", "keyboard", "animalistic"];
var lastWordInd = 0;
var source = "local"

var wordString = "Type 'start' to begin";
var bufferString = "";
var score = 0;
var seconds = 10;

var wordElement = document.getElementById("word");
var bufferElement = document.getElementById("buffer");
var timerElement = document.getElementById("timerCount");
var scoreElement = document.getElementById("scoreCount");

var timer = setInterval(idle, 100);

/************************************************************************/

function init() {
	bufferString = "";
	wordString = getRandomWord("local");
	score = 0.0;
	seconds = 10;

	wordElement.innerHTML = wordString;
	bufferElement.innerHTML = bufferString;
	scoreElement.innerHTML = score.toFixed(1);;
	timerElement.innerHTML = seconds.toFixed(1);
}

function updateElements() {
	wordElement.innerHTML = wordString;
	bufferElement.innerHTML = bufferString;
	scoreElement.innerHTML = score.toFixed(1);;
	timerElement.innerHTML = seconds.toFixed(1);
}

// Main Game loop
function loop() {
	checkCorrect();
	seconds = seconds - 0.1;
	if (seconds <= 0) {
		seconds = 0;
		gameOver();
	}
	updateElements();
}

// Loop before and after main game
function idle() {
	updateElements();
	if (bufferString.toLowerCase() == "start") {
		init();
		clearInterval(timer);
		timer = setInterval(loop, 100);
	}
}

function checkCorrect() {
	if (bufferString == wordString) {
		score += seconds;
		bufferString = "";
		wordString = getRandomWord(source);
		seconds = 10;
	}
}

function gameOver() {
	clearInterval(timer);
	timer = setInterval(idle, 100);
	wordString = "GAME OVER, type 'start' to play again";

}

function getRandomWord(source) {
	var word = "";

	if (source == "local") { // use local words
		//rnd num from (0 to wordsize), avoiding repeats
		var ind;
		do {
			ind = Math.floor(Math.random() * words.length);
		} while (ind == lastWordInd);
		word = words[ind];
		lastWordInd = ind;
	} else { //get words from text file (or api????)

	}

	return word;
}

// Handle Inputkkkk
document.addEventListener("keydown", function(key) {

	//Handle Backspace
	if (key.keyCode == 8) {
		//console.log("Backspace!!!");
		bufferString = bufferString.substring(0, bufferString.length-1);
	};

	//Handle letter input
	if (key.keyCode >= 65 && key.keyCode <= 90) {
		//console.log("Valid Key : " + key.key);
		bufferString += key.key;
	}
	//Update Buffer
	bufferElement.innerHTML = bufferString;
});




/*
setInterval(yes, 500);

function yes() {
	if (wordElement.innerHTML == "yeet") {
		wordElement.innerHTML = "yes";
	} else {
		wordElement.innerHTML = "yeet";
	}
}
*/
