//DFMAnswer.js

class DFMAnswer extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.findCode = function (code) {
			for (let letterCount = 1; letterCount < code.length - 1; letterCount++) {
				if (code[letterCount] == "\t") {
					code = code.substring(0, letterCount);
					break;
				}
			}

			return code.replace(/%/gi, "");
		}

		this.setOptionListByLine = function (line, lineIndex) {
			let content = "";
			let code = "";
			for (let letterCount = 1; letterCount < line.length; letterCount++) {
				if (line[letterCount] == "\t") {
					content = line.substring(0, letterCount).trim();
					code = this.findCode(line.substring(letterCount + 1).trim());
					this.OL.addOption(content, code);
					return;
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
