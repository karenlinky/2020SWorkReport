//main.js
"use strict";

const TextInput = document.getElementById("input");

const Output = document.getElementById("output");

function display(output) {
	if (output == "") {
		return;
	}

	Output.value = output;
}

function copyOutput() {
	Output.select();
	document.execCommand("copy");
}

// function formattextInBracket(text, OutBracket) {
// 	let editedText = text[0];
// 	let ignoreWhiteSpace = false;
// 	for (let letterCount = 1; letterCount < text.length; letterCount++) {
// 		if (text[letterCount] == "}") {
// 			if (OutBracket) {
// 				return editedText + formatTextOutBracket(text.substring(letterCount));
// 			} else {
// 				return editedText + formattextInBracket(text.substring(letterCount));
// 			}
// 		} else if (text[letterCount] == "{") {
// 			return editedText + formattextInBracket(text.substring(letterCount), true);
// 		} else if (text[letterCount] == "\n") {
// 			editedText = editedText.trim();
// 			ignoreWhiteSpace = true;
// 		} else if (text[letterCount].trim() != "") {
// 			editedText += text[letterCount];
// 			ignoreWhiteSpace = false;
// 		} else if (!ignoreWhiteSpace) {
// 			editedText += text[letterCount];
// 		}
// 	}

// 	return text;
// }

// function formatTextOutBracket(text, OutBracket) {
// 	let editedText = "";
// 	for (let letterCount = 0; letterCount < text.length; letterCount++) {
// 		if (text[letterCount] == "{") {
// 			editedText += formattextInBracket(text.substring(letterCount), true);
// 			break;
// 		} else {
// 			editedText += text[letterCount];
// 		}
// 	}
// 	return editedText;
// }

function removeNewLine (text) {
	let editedText = "";
	let ignoreWhiteSpace = false;
	for (let letterCount = 0; letterCount < text.length; letterCount++) {
		if (text[letterCount] == "\n") {
			editedText = editedText.trim();
			ignoreWhiteSpace = true;
		} else if (text[letterCount].trim() != "") {
			ignoreWhiteSpace = false;
			editedText += text[letterCount];
		} else if (!ignoreWhiteSpace) {
			editedText += text[letterCount];
		}
	}
	return editedText;
}


function formatText (text) {
	let editedText = "";
	let textInBracket = "";
	let bracketFound = false;
	for (let letterCount = 0; letterCount < text.length; letterCount++) {
		if (text[letterCount] == "{") {
			bracketFound = true;
			textInBracket += text[letterCount];
		} else if (text[letterCount] == "}" && bracketFound) {
			bracketFound = false;
			textInBracket += text[letterCount];
			editedText += removeNewLine(textInBracket);
			textInBracket = "";
		} else if (bracketFound) {
			textInBracket += text[letterCount];
		} else {
			editedText += text[letterCount];
		}
	}
	return editedText;
}


function inputChange() {
	let text = TextInput.value;
	text = formatText(text, true);

	display(text);
}
