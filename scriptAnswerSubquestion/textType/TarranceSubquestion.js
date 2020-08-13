//TarranceSubquestion.js

class TarranceSubquestion extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.setOptionListByLine = function (line, lineIndex) {
			let code = "";
			let content = "";
			let maxCodeIndex = 4;
			let isSubquestion = false;

			for (let letterCount = 1; letterCount < line.length - 1; letterCount++) {
				if (line.substring(letterCount, letterCount + 2) == ".\t") {
					code = line.substring(0, letterCount).trim();
					content = line.substring(letterCount + 2).trim();
					isSubquestion = true;
					break;
				} else if (line[0] == "(" && line[letterCount] == ")" && line[letterCount+1] == "\t") {
					isSubquestion = true;
					content = line.substring(letterCount + 2).trim();
					if (content.includes("(DNR)")) {
						return;
					}
					break;
				} else if (letterCount > maxCodeIndex - 1) {
					return;
				}
			}


			this.OL.addOption(content, code);
		}

		this.removeAnswerCode = function () {
			let content = "";
			for (let optionCount = 0; optionCount < this.OL.getLength(); optionCount++) {
				content = this.OL.getContent(optionCount);
				for (let letterCount = 1; letterCount < content.length - 3; letterCount++) {
					if (content[letterCount] == "\t" && !isNaN(content[letterCount+1]) &&
						content[letterCount+2] == "\t" && !isNaN(content[letterCount+3])) {
						content = content.substring(0, letterCount).trim();
						this.OL.setContent(optionCount, content);
						break;
					}
				}
			}
		}

		this.combineSubquestion = function() {
			let prevContent = "";
			let content = "";
			for (let optionCount = 1; optionCount < this.OL.getLength(); optionCount++) {
				content = this.OL.getContent(optionCount).trim();
				if (!this.OL.hasCode(optionCount) && content!="") {
					prevContent = this.OL.getContent(optionCount - 1);
					this.OL.setContent(optionCount - 1, prevContent.trim() + " " + content);
					this.OL.removeOption(optionCount);
					optionCount--;
				}
			}
		}

		this.format = function (text) {
			this.setOptionList(text);
			this.removeAnswerCode();
			this.combineSubquestion();
		}

		this.format(text);
	}
}
