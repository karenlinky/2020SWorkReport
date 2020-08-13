//main.js
"use strict";

function isWhiteSpace(char) {
	if (char == "") {
		return false;
	}
	return char.trim()=="";
}

function isTabOrSpaces(char, numSpaces = 2) {
	if (char == "") {
		return numSpaces == 0;
	}

	if (char[0] == "\t") {
		return true;
	} else if (char.length < numSpaces) {
		return false;
	}

	for (let letterCount = 0; letterCount < numSpaces; letterCount++) {
		if (char[letterCount]=="\t") {
			return true;
		} else if (char[letterCount]!=" ") {
			return false;
		}
	}
	return true;
}

function isAlphabet(char) {
	let code = char.charCodeAt(0);
	if (char == "") {
		return false;
	}
	return (code >= 65 && code <= 90) || (code >= 97 && code <=122);
}

function isSymbol(char) {
	return !isWhiteSpace(char) && !isAlphabet(char) && isNaN(char);
}

function copyOutput() {
	Output.select();
	document.execCommand("copy");
}

function display(output) {
	let warnings = Warnings.getWarning();
	if (output == "") {
		return;
	}

	Output.value = output;

	if (warnings != "") {
		setTimeout(() => alert(warnings), 500);
	}
}

function getClient() {
	return DropDownClient.options[DropDownClient.selectedIndex].value;
}

function removeFrontEndSpacesLines(text) {
	let edited = "";
	let line = "";
	if (text == "") {
		return "";
	}
	for (let letterCount = 0; letterCount < text.length; letterCount++) {
		if (text[letterCount]=="\n") {
			edited += line.trim() + "\n";
			line = "";
		} else {
			line += text[letterCount];
		}
	}

	if (line != "") {
		edited += line.trim();
	}

	return edited;
}



function removeEmptyLines(text) {
	let edited = "";
	let line = "";
	let letterCount = 0;
	if (text == "") {
		return "";
	}

	// find first line
	while (letterCount < text.length) {
		if (text[letterCount]=="\n" && edited!="") {
			letterCount++;
			break;
		} else if (text[letterCount]!="\n") {
			edited += text[letterCount];
		}
		letterCount++;
	}

	if (letterCount==text.length) {
		return edited;
	}

	for (letterCount = letterCount; letterCount < text.length; letterCount++) {
		if (text[letterCount]=="\n") {
			if (line!="") {
				edited += "\n" + line;
				line = "";
			}
		} else {
			line += text[letterCount];
		}
	}

	if (line != "") {
		edited += "\n" + line;
	}

	return edited;
}

function formatGeneral(text) {
	let edited = text;
	edited = removeFrontEndSpacesLines(edited);
	edited = removeEmptyLines(edited);
	return edited;
}

function answerChange(text) {
	let output = "";
	let c = getClient();
	let Client = undefined;
	output = formatGeneral(text);
	// if (client==value.FM3) {
	// 	output = formatAnswerFM3(output);
	// } else if (client==value.ALG) {
	// 	output = formatAnswerALG(output);
	// }

	if (c==value.ALG) {
		Client = new ALGAnswer(output);
	} else if (c==value.Binder) {
		Client = new BinderAnswer(output);
	} else if (c==value.DFM) {
		Client = new DFMAnswer(output);
	} else if (c==value.EMC) {
		Client = new EMCAnswer(output);
	} else if (c==value.FM3) {
		Client = new FM3Answer(output);
	} else if (c==value.GSG) {
		Client = new GSGAnswer(output);
	} else if (c==value.Lake) {
		Client = new LakeAnswer(output);
	} else if (c==value.McL) {
		Client = new McLAnswer(output);
	} else if (c==value.Ragnar) {
		Client = new RagnarAnswer(output);
	} else if (c==value.Tarrance) {
		Client = new TarranceAnswer(output);
	}

	if (Client != undefined) {
		output = Client.getOutput();
	}

	display(output);
}

function makeBinderSubquestion(text) {
	let probe = TextArrayProbe.value;
	return new BinderSubquestion(text, probe);
}

function makeEMCSubquestion(text) {
	let probe = TextArrayProbe.value;
	let isFav = EMCFavorability.value=="Y";
	return new EMCSubquestion(text, probe, isFav);
}

function makeRagnarSubquestion(text) {
	let probe = TextArrayProbe.value;
	return new RagnarSubquestion(text, probe);
}

function subquestionChange(/*text*/) {
	let output = "";
	let text = TextSubquestion.value;
	let c = getClient();
	let Client = undefined;
	output = formatGeneral(text);

	if (c==value.ALG) {
		Client = new ALGSubquestion(output);
	} else if (c==value.Binder) {
		Client = makeBinderSubquestion(output);
	} else if (c==value.DFM) {
		Client = new DFMSubquestion(output);
	} else if (c==value.EMC) {
		// Client = new EMCSubquestion(output, TextArrayProbe.value, EMCFavorability.value=="Y");
		Client = makeEMCSubquestion(output);
	} else if (c==value.FM3) {
		Client = new FM3Subquestion(output);
	} else if (c==value.GSG) {
		Client = new GSGSubquestion(output);
	} else if (c==value.Lake) {
		Client = new LakeSubquestion(output);
	} else if (c==value.McL) {
		Client = new McLSubquestion(output);
	} else if (c==value.Ragnar) {
		Client = makeRagnarSubquestion(output);
	} else if (c==value.Tarrance) {
		Client = new TarranceSubquestion(output);
	}

	if (Client != undefined) {
		output = Client.getOutput();
	}

	display(output);
}


function arrayProbeChange(/*text*/) {
	/*let output = "";
	let c = getClient();
	let Client = undefined;
	output = formatGeneral(text);

	if (c==value.EMC) {
		// Client = new EMCSubquestion(TextSubquestion.value, output, EMCFavorability.value=="Y");
		Client = makeEMCSubquestion();
	}

	if (Client != undefined) {
		output = Client.getOutput();
	}

	display(output);*/

	let c = getClient();
	switch (c) {
		case value.Binder:
		case value.EMC:
		case value.Ragnar:
		subquestionChange();
	}
}

function EMCFavChange(/*value*/) {
	/*// let Client = new EMCSubquestion(TextSubquestion.value, TextArrayProbe.value, value=="Y");
	let Client = makeEMCSubquestion();
	let output = Client.getOutput();
	display(output);*/

	let c = getClient();
	switch (c) {
		case value.EMC:
		subquestionChange();
	}
}
