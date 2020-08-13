//ALGAnswer.js

class ALGAnswer extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.findCode = function (code) {
			let finalCode = "";
			for (let letterCount = 0; letterCount < code.length; letterCount++) {
				if (isWhiteSpace(code[letterCount])) {
					if (finalCode!="") {
						return isNaN(finalCode) ? "" : finalCode;
					}
				} else {
					finalCode += code[letterCount];
				}
			}

			return isNaN(finalCode) ? "" : finalCode;
		}

		this.setOptionListByLine = function (line, lineIndex) {
			let content = "";
			let code = "";
			for (let letterCount = 1; letterCount < line.length; letterCount++) {
				if (line[letterCount] == "") {
					content = line.substring(0, letterCount - 1).trim();
					code = this.findCode(line.substring(letterCount + 1).trim());
					this.OL.addOption(content, code);
					return;
				}
			}
			this.OL.addOption(line.trim(), "");
		}

		// this.setAnswerOptionList = function (text) {
		// 	// let line = "";
		// 	// for (let letterCount = 0; letterCount < text.length; letterCount++) {
		// 	// 	if (text[letterCount] == "\n") {
		// 	// 		this.setAnswerOptionListByLine(line);
		// 	// 		line = "";
		// 	// 	} else {
		// 	// 		line += text[letterCount];
		// 	// 	}
		// 	// }
		// 	// if (line != "") {
		// 	// 	this.setAnswerOptionListByLine(line);
		// 	// }
		// }

		this.format = function (text) {
			this.setOptionList(text);
		}


		this.format(text);

	}
}
