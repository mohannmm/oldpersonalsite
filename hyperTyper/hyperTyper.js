// buffer, word, wordList
// updateWord(), checkCorrectWord(), //correctWordFound()
// 1000 most common words in English language : https://gist.github.com/deekayen/4148741#file-1-1000-txt
//

// CONSTANTS
const GREETING = "Type start to begin";
//

var words = ["Apple", "Bob", "cat", "dog", "lactate", "incel", "super", "intermediate", "keyboard", "animalistic"];

var lastWordInd = 0;
//source txt file of words. Defualt words above will be used if file not found
var source = "wordsList.txt";

var wordString = GREETING;
var bufferString = "";
var score = 0.0;
var seconds = 10.0;


// DOM elements
var wordElement = document.getElementById("word");
var bufferElement = document.getElementById("buffer");
var timerElement = document.getElementById("timerCount");
var scoreElement = document.getElementById("scoreCount");


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera 	Mini|Mobile/i.test(navigator.userAgent)) {
	alert("Sorry, Mobile is unsupported :( ");
}
var timer = setInterval(idle, 100);
/************************************************************************/

function init() {
	loadDoc(source);
	bufferString = "";
	wordString = getRandomWord();
	score = 0.0;
	seconds = 10.0;

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
	wordString = "GAME OVER, " + GREETING;
}

function getRandomWord() {
	var word = "";
		//rnd num from (0 to wordsize), avoiding repeats
		var ind;
		do {
			ind = Math.floor(Math.random() * words.length);
		} while (ind == lastWordInd);
		word = words[ind];
		lastWordInd = ind;
	return word;
}

// Handle Input
document.addEventListener("keydown", function(key) {

	//Handle Backspace
	if (key.keyCode == 8) {
		//console.log("Backspace!!!");
		bufferString = bufferString.substring(0, bufferString.length-1);
	};

	//Handle letter and "'" input
	if (key.keyCode >= 65 && key.keyCode <= 90 || key.keyCode == 222) {
		//console.log("Valid Key : " + key.key);
		bufferString += key.key;
	}
	//Update Buffer
	bufferElement.innerHTML = bufferString;
});

function loadDoc(source) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      words = parseDocToArray(this.responseText);
    }
  };
  xhttp.open("GET", source, true);
  xhttp.send();
}

// For now, assumes text is delimited by '\n'
function parseDocToArray(srcStr) {
	var obj = srcStr.split("\n");
	return obj;
}
