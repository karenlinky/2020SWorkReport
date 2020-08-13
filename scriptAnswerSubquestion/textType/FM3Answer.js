// FM3Answer.js

class FM3Answer extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.setOptionListByLine = function (line, lineIndex) {
			for (let letterCount = 0; letterCount < line.length; letterCount++) {
				if (line[letterCount] == "\t") {
					this.OL.addOption(line.substring(0, letterCount).trim(), line.substring(letterCount).trim());
					return;
				}
			}
			this.OL.addOption(line.trim(), "");
		}

		// this.setAnswerOptionList = function (text) {
		// 	let line = "";
		// 	for (let letterCount = 0; letterCount < text.length; letterCount++) {
		// 		if (text[letterCount] == "\n") {
		// 			this.setAnswerOptionListByLine(line);
		// 			line = "";
		// 		} else {
		// 			line += text[letterCount];
		// 		}
		// 	}

		// 	if (line != "") {
		// 		this.setAnswerOptionListByLine(line);
		// 	}
		// }

		this.replaceTerminateAnswerCode = function () {
			let length = this.OL.getLength();
			let answerCode = 99;
			for (let optionCount = length - 1; optionCount >= 0; optionCount--) {
				if (this.OL.getCode(optionCount)!="" && isNaN(this.OL.getCode(optionCount))) {
					if(this.OL.getCode(optionCount).toUpperCase().includes("TERM")) {
						this.OL.setCode(optionCount, answerCode);
						answerCode--;
					}
				}
			}
		}

		this.replaceContentSpecialChars = function () {
			let specialChar = "[ ]";
			let content = "";
			for (let optionCount = 0; optionCount < this.OL.getLength(); optionCount++) {
				content = this.OL.getContent(optionCount);
				if (content.length > specialChar.length) {
					if (content.substring(0,specialChar.length) == specialChar) {
						this.OL.setContent(optionCount, content.substring(specialChar.length).trim());
					}
				}
			}
		}

		this.getIndexNextCode = function (index) {
			for (let optionCount = index; optionCount < this.OL.getLength(); optionCount++) {
				if (this.OL.hasCode(optionCount)) {
					return optionCount;
				}
			}
			return "";
		}

		this.combineRows = function () {
			let needCombine = false;
			let content = "";
			let prevCode = 0;
			let indexNextCode = "";
			let nextCode = 0;
			for (let optionCount = 0; optionCount < this.OL.getLength()-1; optionCount++) {
				if (this.OL.hasCode(optionCount)) {
					continue;
				}

				if (optionCount==0) {
					indexNextCode = this.getIndexNextCode(optionCount);
					if (indexNextCode=="") {
						continue;
					}

					nextCode = this.OL.getCode(indexNextCode);
					if (nextCode == "1") {
						needCombine = true;
					}
				} else {
					prevCode = this.OL.getCode(optionCount - 1);
					indexNextCode = this.getIndexNextCode(optionCount);
					if (indexNextCode=="") {
						continue;
					}

					nextCode = this.OL.getCode(indexNextCode);
					if (isNaN(prevCode) || isNaN(nextCode)) {
						continue;
					}
					prevCode = parseInt(prevCode, 10);
					nextCode = parseInt(nextCode, 10);

					if (prevCode + 1 == nextCode) {
						needCombine = true;
					}
				}

				if (needCombine) {
					content = this.OL.getContent(optionCount);
					for (let optionRemoveCount = optionCount + 1; optionRemoveCount <= indexNextCode; optionRemoveCount++) {
						this.OL.removeOption(optionCount);
						content += " " + this.OL.getContent(optionCount);
					}
					this.OL.setContent(optionCount, content.trim());
					needCombine = false;
				}
			}
		}

		this.format = function (text) {
			this.setOptionList(text);
			this.replaceTerminateAnswerCode();
			this.replaceContentSpecialChars();
			this.combineRows();
		}

		this.format(text);

	}
}
