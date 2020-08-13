//ALGSubquestion.js

class ALGSubquestion extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.removeSubquestionSpecialChar = function (text) {
			let specialChar = "at ";
			let editedText = "";
			let ignoreLine = false;
			for (let letterCount = 0; letterCount < text.length; letterCount++) {
				if (text[letterCount] == "\n") {
					if (text.substring(letterCount + 1, letterCount + specialChar.length + 1) == specialChar) {
						ignoreLine = true;
					} else {
						editedText += text[letterCount];
						ignoreLine = false;
					}
				} else if (!ignoreLine) {
					editedText += text[letterCount];
				}
			}

			return editedText;
		}

		this.findContent = function (line) {
			if (line == "") {
				return line;
			}
			if (line[0] != "Q" || isNaN(line[1])) {
				return line;
			}

			for (let letterCount = 2; letterCount < line.length - 2; letterCount++) {
				if (isAlphabet(line[letterCount]) && line[letterCount + 1] == "\t") {
					return line.substring(letterCount+2).trim();
				} else if (letterCount > 4) {
					return line;
				}
			}

			return line;
		}

		this.findCode = function (line) {
			if (line == "") {
				return "";
			}
			if (line[0] != "Q" || isNaN(line[1])) {
				return "";
			}

			let firstCodeIndex = 0;

			for (let letterCount = 2; letterCount < line.length - 1; letterCount++) {
				if (isAlphabet(line[letterCount]) && firstCodeIndex == 0) {
					firstCodeIndex = letterCount;
				} else if (line[letterCount] == "\t" && firstCodeIndex != 0) {
					return line.substring(firstCodeIndex, letterCount).trim();
				}
			}
			return "";
		}

		// this.removeFirstSquareBracket = function (line) {
		// 	if (line[0] != "[") {
		// 		return line;
		// 	}
		// 	for (let letterCount = 1; letterCount < line.length - 1; letterCount++) {
		// 		if (line[letterCount] == "]") {
		// 			line = line.substring(letterCount + 1).trim();
		// 			return this.removeFirstSquareBracket (line);
		// 		}
		// 	}
		// 	return line;
		// }

		this.setOptionListByLine = function (line, lineIndex) {
			let code = "";
			let content = "";
			let withoutCode = "";
			for (let letterCount = 2; letterCount < line.length - 1; letterCount++) {
				if (line[letterCount] == "") {
					withoutCode = line.substring(0, letterCount).trim();
					content = this.findContent(withoutCode);
					if (content != withoutCode) {
						code = this.findCode(withoutCode);
					}
					content = this.removeFirstSquareBracket(content);
					this.OL.addOption(content, code);
					return;
				}
			}
		}

		this.format = function (text) {
			text = this.removeSubquestionSpecialChar(text);
			this.setOptionList(text);
		}

		this.format(text);
	}
}
