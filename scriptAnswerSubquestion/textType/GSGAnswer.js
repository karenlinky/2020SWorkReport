//GSGAnswer.js

class GSGAnswer extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.setOptionListByLine = function (line, lineIndex) {
			let code = "";
			let prompt = "";
			const maxCodeIndex = 3;

			for (let letterCount = 1; letterCount < line.length - 2; letterCount++) {
				if (line[letterCount]=="." && isTabOrSpaces(line.substring(letterCount+1),2)) {
					code = line.substring(0, letterCount);
					line = line.substring(letterCount+2).trim();
					break;
				} else if (isTabOrSpaces(line.substring(letterCount),2) && letterCount < maxCodeIndex) {
					code = line.substring(0, letterCount);
					line = line.substring(letterCount+1).trim();
					break;
				} else if (isWhiteSpace(line[letterCount])) {
					break;
				} else if (letterCount > maxCodeIndex - 1) {
					break;
				}
			}
			for (let letterCount = 0; letterCount < line.length - 1; letterCount++) {
				if (line[letterCount] == "\t") {
					if (line.substring(letterCount+1).toUpperCase().includes("DO NOT READ")) {
						prompt = " (DO NOT READ)";
					}
					if (line.substring(letterCount+1).toUpperCase().includes("SPECIFY")) {
						prompt = prompt=="" ? "(SPECIFY)" : " (SPECIFY)" + prompt
					}
					line = line.substring(0, letterCount).trim() + prompt;
					this.OL.addOption(line, code);
					return;
				}
			}
			this.OL.addOption(line, code);
		}

		this.format = function (text) {
			this.setOptionList(text);
		}


		this.format(text);

	}
}
