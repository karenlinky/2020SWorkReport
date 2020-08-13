//main.js
"use strict";

const TextInput1 = document.getElementById("textInput1");
const TextInput2 = document.getElementById("textInput2");
const TextInput3 = document.getElementById("textInput3");

const Tag1 = document.getElementById("tag1");
const Tag2 = document.getElementById("tag2");
const Tag3 = document.getElementById("tag3");

const Output = document.getElementById("textOutput");

const value = {
	phone: "p-o",
	emailText: "e-t",
	email: "e-o",
	text: "t-o",
	none: "none"
}

let input3Active = false;

function showHideInput3() {
	document.getElementById("input3Active").classList.toggle("hide");
	document.getElementById("input3Inactive").classList.toggle("hide");
	document.getElementById("input3").classList.toggle("sectionContainerinactive");
	TextInput3.value = "";
	input3Active = !input3Active;
	inputChange();
}

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


function combineText(text1, text2, text3) {
	let arrText = [text1, text2, text3];
	let arrTag = [Tag1, Tag2, Tag3];
	let arrMode = [];
	let CM = new CombinedMode();
	let output = "";

	for (let textCount = 0; textCount < arrText.length; textCount++) {
		// if (arrText[textCount] == "") {
		// 	arrText.splice (textCount, 1);
		// 	textCount--;
		// }

		if (arrText[textCount] != "") {
			arrMode.push(new ModeText (arrTag[textCount].options[arrTag[textCount].selectedIndex].value, arrText[textCount]));
		}
	}

	if (arrMode.length == 0) {
		return;
	}

	for (let modeCount = 0; modeCount < arrMode.length; modeCount++) {
		CM.addModeToList(arrMode[modeCount]);
	}

	output = CM.getOutput();

	display(output);
}

function inputChange() {
	let text1 = TextInput1.value;
	let text2 = TextInput2.value;
	let text3 = input3Active ? TextInput3.value : "";

	combineText (text1, text2, text3);
}
