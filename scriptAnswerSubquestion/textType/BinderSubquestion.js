//BinderSubquestion.js

class BinderSubquestion extends TextType {
	constructor(text, probe) {
		super(probe=="" ? OLType.basic : OLType.arrayWithProbe);
		this.probe = probe;

		this.findContent = function (content) {
			for (let letterCount = 1; letterCount < content.length - 3; letterCount++) {
				if (content[letterCount]=="\t" && !isNaN(content[letterCount + 1]) &&
					content[letterCount + 2]=="\t" && !isNaN(content[letterCount + 3])) {
					content = content.substring(0, letterCount).trim();
					break;
				}
			}
			return content;
		}

		this.removeFrontCapLetters = function (content) {
			let frontCap = "";
			let currentWord = "";
			for (let letterCount = 0; letterCount < content.length - 1; letterCount++) {
				if (content.charCodeAt(letterCount)>=97 && content.charCodeAt(letterCount)<=122) {
					return content.substring(frontCap.length).trim();
				} else if (isWhiteSpace(content[letterCount])) {
					frontCap += currentWord + content[letterCount];
					currentWord = "";
				} else {
					currentWord += content[letterCount];
				}
			}

			return content;
		}

		this.setOptionListByLine = function (line, lineIndex) {
			let content = line.trim();
			let code = "";
			let maxCodeIndex = 3;

			for (let letterCount = 1; letterCount < line.length - 1; letterCount++) {
				if (line.substring(letterCount, letterCount + 2) == ".\t") {
					content = line.substring(letterCount + 2).trim();
					code = line.substring(0, letterCount).trim();
					break;
				} else if (letterCount > maxCodeIndex - 1) {
					break;
				}
			}

			content = this.removeFrontCapLetters(this.findContent (content));

			this.probe=="" ? this.OL.addOption(content, code) :  this.OL.addOption(content, this.probe, code);
		}

		this.format = function (text) {
			this.setOptionList(text);
		}


		this.format(text);

	}
}
