// LakeAnswer.js

class LakeAnswer extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.removeEndBracket = function (content) {
			let textInBracket = "";
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

			textInBracket = textInBracket.toUpperCase();

			switch (textInBracket.substring(1, textInBracket.length-1)) {
				case "CALL BACK":
				case "TERMINATE":
				case "RESCHEDULE":
					return content.substring(0, content.length - textInBracket.length).trim();
			}

			return content;
		}

		this.findCode = function (code) {
			let editedCode = "";
			for (let letterCount = 0; letterCount < code.length; letterCount++) {
				if (isWhiteSpace(code[letterCount])) {
					return editedCode;
				}
				editedCode += code[letterCount];
			}

			return code;
		}

		this.setOptionListByLine = function (line, lineIndex) {
			let content = line.trim();
			let code = "";

			for (let letterCount = 0; letterCount < line.length - 1; letterCount++) {
				if (line[letterCount] == "\t") {
					content = line.substring(0, letterCount).trim();
					code = this.findCode(line.substring(letterCount + 1).trim());
					break;
				}
			}

			content = this.removeEndBracket(content);

			this.OL.addOption(content, code);
		}

		this.format = function (text) {
			this.setOptionList(text);
		}


		this.format(text);

	}
}
