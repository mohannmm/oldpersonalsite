// buffer, word, wordList
// updateWord(), checkCorrectWord(), //correctWordFound()
// 1000 most common words in English language : https://gist.github.com/deekayen/4148741#file-1-1000-txt
//

// CONSTANTS
const GREETING = "Type start to begin";
//

var words = ["Apple", "Bob", "cat", "dog", "lactate", "incel", "super", "intermediate", "keyboard", "animalistic"];
var currentWords = ["", "", "", "",GREETING, "", "" , "", ""];
var wordsPercentArray = [0, 0, 0, 0, 100, 0, 0, 0, 0];
var lastWordInd = 0;
//source txt file of words. Defualt words above will be used if file not found
var source = "wordsList.txt";

//var wordString = GREETING;
var bufferString = "";
var score = 0.0;
var errors = 0;
var diff = 0.5

var idleMusic = new Howl({
	src:['./music/retroLoop1.wav', './music/Yeet.wav'],
	loop: true,
	autoplay: true,
	rate: 0.9,
	volume: 0.85
});

var mainMusic = new Howl({
	src:['./music/Yeet.wav'],
	loop: true,
	autoplay: false,
	rate: 1,
	volume: 0.8
});

// DOM elements
var wordElement = getWordElement(4); //initially middle
var bufferElement = document.getElementById("buffer");
var errorElement = document.getElementById("errorCount");
var scoreElement = document.getElementById("scoreCount");


// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera 	Mini|Mobile/i.test(navigator.userAgent)) {
// 	alert("Sorry, Mobile is unsupported :( ");
// }

var timer = setInterval(idle, 100);
var difficultyTimer;
/************************************************************************/

function init() {
	idleMusic.stop();
	mainMusic.rate(1);
	mainMusic.play();

	loadDoc(source);
	bufferString = "";
	currentWords[4] = getRandomWord();
	score = 0.0;
	errors = 0;
	updateElements();
}

function updateElements() {
	for (var i = 0; i < currentWords.length; i++) {
		getWordElement(i).innerHTML = currentWords[i];
		getWordElement(i).style.fontSize = "" + wordsPercentArray[i] + "%";
	}
	bufferElement.innerHTML = bufferString;
	scoreElement.innerHTML = score.toFixed(1);
	errorElement.innerHTML = errors;

	var color = "white";
	if (errors > 2) {
		color = "yellow";
		mainMusic.rate(1.2);
	}
	if (errors > 5) {
		color = "orange";
		mainMusic.rate(1.5);
	}
	if (errors > 7) {
		color = "red";
		mainMusic.rate(2);
	}
	errorElement.style.color = color;
}

// Main Game loop
function loop() {
	// percent-=0.5;
	// getWordElement(4).style.fontSize = ""+ (percent) + "%";
	checkCorrect();
	for (var i = 0; i < currentWords.length; i++) {
		if (currentWords[i] != "") {
			wordsPercentArray[i]-= diff;
			if (wordsPercentArray[i] <= 15) {
				errors++;
				currentWords[i] = ""
				wordsPercentArray[i] = 100;
			}
		}
		updateElements();
	}
	if (errors >= 10) {
		gameOver();
	}
	updateElements();
	diff = 0.5 + (score / 100)
}

// this loop gets faster as the score increases
function difficultyLoop() {
	populateRandomWordElement();
}

// Loop before and after main game
function idle() {
	updateElements();
	if (bufferString.toLowerCase() == "start") {
		//audio();
		init();
		clearInterval(timer);
		timer = setInterval(loop, 100);
		difficultyTimer = setInterval(difficultyLoop, 1000);
	}
}

function checkCorrect() {
	for (i = 0; i < currentWords.length; i++) {
		if (bufferString != "" && bufferString == currentWords[i]) {
			score += 1 + (score / 10.0 * diff);
			bufferString = "";
			//currentWords[i] = getRandomWord();
			currentWords[i] = "";
			wordsPercentArray[i] = 0;
			populateRandomWordElement();
			seconds = 10;
		}
	}
}

function gameOver() {
	mainMusic.stop()
	idleMusic.play();
	clearInterval(timer);
	clearInterval(difficultyTimer);
	timer = setInterval(idle, 100);
	currentWords = ["", "", "", "","GAME OVER " + GREETING, "", "" , "", ""];
	wordsPercentArray = [0, 0, 0, 0, 100, 0, 0, 0, 0];
}

function populateRandomWordElement() { //this should have random behavior
	var ind  = Math.floor(Math.random() * currentWords.length);
		// DO nothing if the random index is taken
		if (currentWords[ind] == "") {
			currentWords[ind] = getRandomWord();
			getWordElement(ind).innerHTML = currentWords[ind];
			wordsPercentArray[ind] = 100;
		}
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

function getWordElement(num) {
	return document.getElementById("word" + num);
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

//Allows us to load txt file in to read words
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
