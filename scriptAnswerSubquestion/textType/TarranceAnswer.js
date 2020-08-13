//TarranceAnswer.js

class TarranceAnswer extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.findContentAndCodeTwoParts = function (firstPart, secondPart) {
			if (secondPart.includes("\t")) {
				for (let letterCount = 1; letterCount < secondPart.length - 1; letterCount++) {
					if (secondPart[letterCount]=="\t") {
						return this.findContentAndCodeTwoParts(
							secondPart.substring(0, letterCount).trim(),
							secondPart.substring(letterCount + 1).trim());
					}
				}
			}

			if (!isNaN(secondPart)) {
				return {content: firstPart, code: secondPart};
			}

			return {content: secondPart, code: ""};
		}

		this.setOptionListByLine = function (line, lineIndex) {
			let contentAndCode = undefined;
			let firstPart = "";
			let secondPart = "";
			let content = "";
			let code = "";

			if (!line.includes("\t")) {
				content = line.trim();
			} else {
				for (let letterCount = 1; letterCount < line.length; letterCount++) {
					if (line[letterCount] == "\t") {
						firstPart = line.substring(0, letterCount).trim();
						secondPart = line.substring(letterCount + 1).trim();
						contentAndCode = this.findContentAndCodeTwoParts(firstPart, secondPart);
						content = contentAndCode.content;
						code = contentAndCode.code;
						break;
					}
				}
			}
			this.OL.addOption(content, code);
		}

		this.removeProbe = function() {
			let prevCode = "";
			let nextCode = "";
			// if (this.OL.getLength() > 0) {
			// 	prevCode = this.OL.getCode(0);
			// } else {
			// 	return;
			// }
			for (let optionCount = 1; optionCount < this.OL.getLength() - 1; optionCount++) {
				if (!this.OL.hasCode(optionCount)) {
					if (this.OL.hasCode(optionCount - 1) && (this.OL.hasCode(optionCount + 1))) {
						prevCode = this.OL.getCode(optionCount - 1);
						nextCode = this.OL.getCode(optionCount + 1);
						if (!isNaN(prevCode) && !isNaN(nextCode)) {
							if (parseInt(prevCode, 10) + 1 == parseInt(nextCode, 10)) {
								this.OL.removeOption(optionCount);
								optionCount--;
							}
						}
					}
				}
			}
		}

		this.removePrompt = function() {
			let content = "";
			for (let optionCount = 0; optionCount < this.OL.getLength(); optionCount++) {
				content = this.OL.getContent(optionCount);
				content = content.replace(/\(CONTINUE\)|\(THANK AND TERMINATE\)|\(SCHEDULE CALL BACK\)/gi, "");
				this.OL.setContent(optionCount, content);
			}
		}

		this.format = function (text) {
			this.setOptionList(text);
			this.removeProbe();
			this.removePrompt();
		}


		this.format(text);

	}
}
