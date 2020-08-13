//EMCAnswer.js

class EMCAnswer extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.setOptionListByLine = function (line, lineIndex) {
			let code = "";
			let content = "";

			for (let letterCount = 0; letterCount < line.length; letterCount++) {
				if (line[letterCount] == "") {
					line = line.substring(0, letterCount).trim();
					break;
				}
			}

			content = line;

			for (let letterCount = 0; letterCount < line.length - 2; letterCount++) {
				if (line.substring(letterCount, letterCount+2) == ".\t") {
					code = line.substring(0, letterCount).trim();
					content = line.substring(letterCount + 2).trim();
					this.OL.addOption(content, code);
					return;
				} else if (letterCount == 4) {
					break;
				}
			}

			for (let letterCount = 0; letterCount < line.length - 1; letterCount++) {
				if (line[letterCount] == "\t") {
					code = line.substring(0, letterCount).trim();
					content = line.substring(letterCount + 1).trim();
					this.OL.addOption(content, code);
					return;
				} else if (letterCount == 3) {
					break;
				}
			}

			// answer options of array
			for (let letterCount = 0; letterCount < line.length - 2; letterCount++) {
				if (line.substring(letterCount, letterCount+2) == ". ") {
					code = line.substring(0, letterCount).trim();
					content = line.substring(letterCount + 2).trim();
					this.OL.addOption(content, code);
					return;
				} else if (letterCount == 1) {
					break;
				}
			}


			this.OL.addOption(content, code);
		}

		this.format = function (text) {
			this.setOptionList(text);
		}

		this.format(text);
	}
}
