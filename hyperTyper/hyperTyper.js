var word = "Apple"
var bufferString = "";
var correctString = "", wrongString = "";
var wordPos = 100;
var wordVel;
//var words[10];

$(document).ready(function() {
	worVel = $("screen").width();
	var interval = 1000.0 / 60.0;
	setInterval(loop, interval);

	//Key handling
	$(document).keydown(function(key) {
		key.preventDefault();

		// Handle special keys
		switch (key.keyCode) {
			case 13 : // Enter
				bufferString = "";
				break;
			case 8 : // Backspace
				bufferString = bufferString.slice(0, -1);
			default:
				// Handle normal character input
				if (!key.altKey && !key.ctrlKey) //prevents alt input like å©œ...
					if (key.keyCode >= 65 && key.keyCode <= 90)
						bufferString += key.key;
		}

		var ind = findWrongCharIndex(bufferString, getWord(0));
		updateBufferString(ind);
	})
})

// TODO: Add feature to check across array of all words
function checkIfCompletedWord(bufferString, word) {
	if (bufferString == word) {
		word = "";
	}
}

		/*** Functions ***/
function findWrongCharIndex(str, word) {
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) != word.charAt(i)) // return first incorrect index found
			return i;
	}
	return -1;
}

function updateBufferString(wrongCharIndex) {
	correctString = "", wrongString = "";

	// Determine correct & wrong string
	if (wrongCharIndex == -1) {
		correctString = bufferString;
	} else {
		correctString = bufferString.substr(0, wrongCharIndex);
		wrongString = bufferString.substr(wrongCharIndex);
	}

	//Update visual buffer
	$("#bufferString").empty().html("<span class='correct'>" + correctString + "</span>" +
		"<span class='wrong'>" + wrongString + "</span>");
}

function spawnWord(word) {
	getWord(0).html(word).css({left: 100});
	wordPos = 100;
}

// TODO: Finish game loop
function loop() {
	console.log("looping...");
	getWord(0).css({left: wordPos++});

	if (wordPos > 500 ) {
		spawnWord("Yes");
	}
}

//Jquery
function getWord(index) {
	return  $("#screen > .wordRow:eq(" + index + ") > .word");
}
