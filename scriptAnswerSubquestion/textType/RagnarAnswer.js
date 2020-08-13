// RagnarAnswer.js

class RagnarAnswer extends TextType {
	constructor(text) {
		super(OLType.basic);

		// this.findCode = function (code) {
		// 	let finalCode = "";
		// 	for (let letterCount = 0; letterCount < code.length; letterCount++) {
		// 		if (isWhiteSpace(code[letterCount])) {
		// 			if (finalCode!="") {
		// 				return isNaN(finalCode) ? "" : finalCode;
		// 			}
		// 		} else {
		// 			finalCode += code[letterCount];
		// 		}
		// 	}

		// 	return isNaN(finalCode) ? "" : finalCode;
		// }

		this.setOptionListByLine = function (line, lineIndex) {
			let content = line.trim();
			const maxCodeIndex = 3;
			for (let letterCount = 0; letterCount < line.length - 1; letterCount++) {
				if (line[letterCount] == "•" || line[letterCount] == "\t") {
					content = line.substring(letterCount+1).trim();
					break;
				} else if (letterCount > maxCodeIndex - 1) {
					break;
				}
			}

			for (let letterCount = 0; letterCount < content.length - 1; letterCount++) {
				if (content[letterCount] == "\t") {
					content = content.substring(0, letterCount).trim();
					break;
				}
			}

			this.OL.addOption(content, lineIndex+1);
		}

		this.removeNewLine = function(answer) {
			let editedAnswer = "";
			let line = "";
			for (let letterCount = 0; letterCount < answer.length; letterCount++) {
				if (answer[letterCount] == "\n") {
					// if (line.trim()[0] == "•") {
					// 	editedAnswer += "\n";
					// } else {
					// 	editedAnswer += "";
					// }
					editedAnswer += line.trim()[0] == "•" ? "\n" : line.trim()[0] == "(" ? " " : "";

					editedAnswer += line;
					line = "";
				} else {
					line += answer[letterCount];
				}
			}

			if (line!="") {
				editedAnswer += line.trim()[0] == "•" ? "\n" : line.trim()[0] == "(" ? " " : "";

				editedAnswer += line;
				line = "";
			}

			return editedAnswer;
		}

		this.putAnswerIntoLines = function(answer) {
			let editedAnswer = "";
			let secondAnswers = "";
			let bulletPointCount = 0;
			let newLineFound = true;

			for (let letterCount = 0; letterCount < answer.length; letterCount++) {
				if (answer[letterCount] == "•") {
					bulletPointCount++;
					if (bulletPointCount == 1) {
						editedAnswer += answer[letterCount];
					} else if (bulletPointCount >= 1) {
						secondAnswers += answer[letterCount];
					}
				} else if (answer[letterCount] == "\n") {
					editedAnswer += answer[letterCount];
					if (bulletPointCount > 1) {
						secondAnswers += answer[letterCount];
					}
					bulletPointCount = 0;
				} else {
					if (bulletPointCount == 1) {
						editedAnswer += answer[letterCount];
					} else if (bulletPointCount >= 1) {
						secondAnswers += answer[letterCount];
					}
				}
			}

			return editedAnswer.trim() + "\n" + secondAnswers;
		}

		this.format = function (text) {
			text = this.removeNewLine(text);
			text = this.putAnswerIntoLines(text);
			this.setOptionList(text);
		}


		this.format(text);

	}
}
