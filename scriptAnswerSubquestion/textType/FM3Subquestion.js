// FM3Subquestion.js

class FM3Subquestion extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.setOptionListByLine = function (line, lineIndex) {
			let specialChar = "[ ]";
			let isSubquestion = false;
			let code = "";
			let content = "";

			if (line.substring(0, specialChar.length) == specialChar) {
				isSubquestion = true;
				line = line.substring(specialChar.length).trim();
			}

			for (let letterCount = 0; letterCount < line.length-3; letterCount++) {
				if (line[letterCount] == "\t" && line[letterCount+1] != "\t" && line[letterCount+2] == "\t" && line[letterCount+3] != "\t") {
					isSubquestion = true;
					line = line.substring(0, letterCount).trim();
					break;
				}
			}

			for (let letterCount = 1; letterCount < line.length-1; letterCount++) {
				if (line.substring(letterCount, letterCount+2)==".\t") {
					isSubquestion = true;
					code = line.substring(0,letterCount).trim();
					content = line.substring(letterCount+2).trim();
					break;
				} else if (line[letterCount]=="\t") {
					// isSubquestion = true;
					code = line.substring(0,letterCount).trim();
					content = line.substring(letterCount+1).trim();
					break;
				} else if (letterCount>=2) {
					break;
				}
			}

			if (!isSubquestion) {
				return;
			}

			if (content=="") {
				content = line;
			}

			this.OL.addOption(content, code);
		}

		// this.setSubquestionOptionList = function (text) {
		// 	let line = "";
		// 	for (let letterCount = 0; letterCount < text.length; letterCount++) {
		// 		if (text[letterCount] == "\n") {
		// 			this.setSubquestionOptionListByLine(line);
		// 			line = "";
		// 		} else {
		// 			line += text[letterCount];
		// 		}
		// 	}

		// 	if (line != "") {
		// 		this.setSubquestionOptionListByLine(line);
		// 	}
		// }

		// this.removeFirstBracketByLine = function (content) {
		// 	if (content[0]!="(") {
		// 		return content;
		// 	}

		// 	for (let letterCount = 1; letterCount < content.length - 1; letterCount++) {
		// 		if (content[letterCount]==")") {
		// 			return this.removeFirstBracketByLine(content.substring(letterCount + 1).trim());
		// 		}

		// 		// if (content[letterCount]=="(") {
		// 		// 	return content;
		// 		// }
		// 	}
		// 	return content;
		// }

		this.removeFirstBracket = function () {
			let content = "";
			for (let optionCount = 0; optionCount < this.OL.getLength(); optionCount++) {
				content = this.OL.getContent(optionCount);
				if (content=="" || content[0]!="(") {
					continue;
				}
				this.OL.setContent(optionCount, this.removeFirstRoundBracket(content));
			}
		}

		this.format = function (text) {
			this.setOptionList(text);
			this.removeFirstBracket();
		}

		this.format(text);

	}
}
