// LakeSubquestion.js

class LakeSubquestion extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.removeSplitText = function(content) {
			const maxColonIndex = 4;

			if (content.substring(0,2) != "SS") {
				return content;
			}

			for (let letterCount = 3; letterCount < content.length; letterCount++) {
				if (content[letterCount] == ":") {
					return content.substring(letterCount + 1).trim();
				} else if (letterCount > maxCodeIndex - 1) {
					break;
				}
			}

			return content;
		}

		this.removeEndBracket = function (content) {
			let textInBracket = "";
			let textBeforeComma = "";
			let textAfterComma = "";
			let charNum = 0;
			if (content[content.length - 1] != "]") {
				return content;
			}

			for (let letterCount = content.length - 1; letterCount >= 1; letterCount--) {
				textInBracket = content[letterCount] + textInBracket;
				if (content[letterCount] == "[") {
					break;
				} else if (letterCount <= 1) {
					return content;
				}
			}

			if (!textInBracket.includes(",")) {
				return content;
			}

			for (let letterCount = textInBracket.length - 2; letterCount >= 1; letterCount--) {
				if (textInBracket[letterCount] == ",") {
					textBeforeComma = textInBracket.substring(1, letterCount).trim();
					textAfterComma = textInBracket.substring(letterCount + 1, textInBracket.length - 1).trim();
					break;
				}
			}

			if (isNaN(textAfterComma)) {
				return content;
			}

			for (let letterCount = 0; letterCount < textBeforeComma.length; letterCount++) {
				charNum = textBeforeComma.charCodeAt(letterCount);
				if (charNum >= 97 && charNum <= 122) {
					return content;
				}
			}

			return content.substring(0, content.length - textInBracket.length).trim();
		}

		this.removeEndBracketWordCount = function (content) {
			let specialString = "words)";
			if (content.length <= specialString.length) {
				return content;
			}

			if (content.substring(content.length - specialString.length)!=specialString) {
				return content;
			}

			for (let letterCount = content.length - specialString.length - 1; letterCount >= 0; letterCount--) {
				if (content[letterCount] == "(") {
					return content.substring(0, letterCount).trim();
				} else if (letterCount == content.length - specialString.length - 4) {
					return content;
				} else if (isAlphabet(content[letterCount])) {
					console.log(content[letterCount]);
					return content;
				}
			}

			return content;
		}

		this.setOptionListByLine = function (line, lineIndex) {
			let code = "";
			let content = line;
			const maxCodeIndex = 3;

			for (let letterCount = 1; letterCount < line.length - 1; letterCount++) {
				if (line.substring(letterCount, letterCount+2) == ".\t") {
					code = line.substring(0, letterCount).trim();
					content = line.substring(letterCount + 2).trim();
					break;
				} else if (line.substring[letterCount] == "\t") {
					code = line.substring(0, letterCount).trim();
					content = line.substring(letterCount + 1).trim();
				} else if (letterCount > maxCodeIndex - 1) {
					break;
				}
			}

			content = this.removeSplitText(content);
			content = this.removeFirstBracket(content);
			content = this.removeEndBracket(content);
			content = this.removeEndBracketWordCount(content);

			this.OL.addOption(content, code);
		}

		this.format = function (text) {
			this.setOptionList(text);
		}

		this.format(text);

	}
}
