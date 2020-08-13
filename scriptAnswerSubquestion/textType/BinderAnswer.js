//BinderAnswer.js

class BinderAnswer extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.isScale = false;

		this.addScale = function (start, end) {
			for (let optionCount = start; optionCount <= end; optionCount++) {
				this.OL.addOption (optionCount.toString(), optionCount);
			}
		}

		this.setOptionListScale = function (line) {
			let index = [];
			let possibleIndex = "";
			line = line.substring(4).trim();
			for (let letterCount = 0; letterCount < line.length - 4; letterCount++) {
				if (line.substring(letterCount, letterCount + 5) == "SCALE") {
					line = line.substring(0, letterCount).trim();
					break;
				} else if (letterCount == line.length - 5) {
					return;
				}
			}

			for (let letterCount = 1; letterCount < line.length - 4; letterCount++) {
				possibleIndex = line.substring(0, letterCount).trim();
				if (line[letterCount] == " " && !isNaN(possibleIndex)) {
					index.push(parseInt(possibleIndex, 10));
					line = line.substring(letterCount + 1).trim();
					break;
				} else if (letterCount = line.length - 5) {
					return;
				}
			}

			if (line.substring(0,3) != "TO ") {
				return;
			}

			line = line.substring(3).trim();

			if (isNaN(line)) {
				return;
			}

			index.push(parseInt(line, 10));

			if(index.length != 2) {
				return;
			}

			this.addScale(index[0], index[1]);

			this.isScale = true;
		}

		this.findCode = function (code) {
			for (let letterCount = 0; letterCount < code.length; letterCount++) {
				if (code[letterCount] == "" || code[letterCount] == "à") {
					return code.substring(0, letterCount).trim();
				}
			}
			return code;
		}

		this.setOptionListByLine = function (line, lineIndex) {
			let content = "";
			let code = "";
			let lineCap = line.toUpperCase();

			// if (!this.isScale && lineCap.substring(0,4).includes("SHOW") && lineCap.substring(12).includes("SCALE")) {
			// 	this.setOptionListScale (lineCap);
			// 	if (this.isScale) {
			// 		return;
			// 	}
			// }

			if (!this.isScale && lineCap.includes("SHOW")) {
				for (let letterCount = 0; letterCount < lineCap.length - 3; letterCount++) {
					if (lineCap.substring(letterCount, letterCount + 4) == "SHOW") {
						lineCap = lineCap.substring(letterCount);
						break;
					}
				}
				if (lineCap.substring(12).includes("SCALE")) {
					this.setOptionListScale (lineCap);
					if (this.isScale) {
						return;
					}
				}
			}

			if (line.includes("RECORD") && this.isScale) {
				return;
			}

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
