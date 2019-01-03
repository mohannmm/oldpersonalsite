var word = "Apple"
var bufferString = "";
var correctString = "", wrongString = "";
//var words[10];

$(document).ready(function() {
	var interval = 1000.0 / 60.0;
	setInterval(loop, 2000);

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

		var ind = findWrongCharIndex(bufferString, word);
		updateBufferString(ind);
	})
})


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

}

var x = 50;
function loop() {
	console.log("looping...");
	getWord(0).
}

//Jquery
function getWord(index) {
	return  $("#screen > .wordRow:eq(" + index + ") > .word");
}
