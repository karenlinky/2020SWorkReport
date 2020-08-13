// McLSubquestion.js

class McLSubquestion extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.setOptionListByLine = function (line, lineIndex) {
			// let content = line;
			let code = "";
			// let isSubquestion = lineIndex==0;
			let isSubquestion = false;
			const maxCodeIndex = 3;

			for (let letterCount = 1; letterCount < line.length - 2; letterCount++) {
				if (line[letterCount]=="." && isTabOrSpaces(line.substring(letterCount + 1), 2)) {
					code = line.substring(0, letterCount);
					line = line.substring(letterCount+2).trim();
					// content = line;
					isSubquestion = true;
					break;
				} else if (isTabOrSpaces(line.substring(letterCount + 1), 1) && letterCount < maxCodeIndex) {
					code = line.substring(0, letterCount);
					line = line.substring(letterCount+1).trim();
					// content = line;
					isSubquestion = true;
					break;
				} else if (isWhiteSpace(line[letterCount])) {
					break;
				} else if (letterCount > maxCodeIndex - 1) {
					break;
				}
			}

			if (!isSubquestion) {
				return;
			}

			for (let letterCount = 0; letterCount < line.length - 1; letterCount++) {
				if (line[letterCount] == "\t"/* && line[letterCount+1] == "("*/) {
					line = line.substring(0, letterCount).trim();
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
