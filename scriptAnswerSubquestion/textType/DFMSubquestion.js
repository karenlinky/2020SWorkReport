//DFMSubquestion.js

class DFMSubquestion extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.findContent = function(content) {
			for (let letterCount = 0; letterCount < content.length - 1; letterCount++) {
				if (!isSymbol(content[letterCount])) {
					content = content.substring(letterCount).trim()
					break;
				}
			}

			for (let letterCount = 1; letterCount < content.length - 1; letterCount++) {
				if (content[letterCount] == "\t") {
					return content.substring(0,letterCount).trim();
				}
			}
			return content;
		}


		this.setOptionListByLine = function (line, lineIndex) {
			let code = "";
			let content = "";
			let maxCodeIndex = 4;

			for (let letterCount = 1; letterCount < line.length - 1; letterCount++) {
				if (isSymbol(line[letterCount])) {
					code = line.substring(0, letterCount).trim();
					content = this.findContent(line.substring(letterCount + 1).trim());
					this.OL.addOption(content, code);
					return;
				} else if (letterCount > maxCodeIndex - 1) {
					break;
				}
			}
			this.OL.addOption(line.trim(), "");
		}

		this.format = function (text) {
			this.setOptionList(text);
		}

		this.format(text);
	}
}
