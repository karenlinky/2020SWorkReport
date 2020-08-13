//GSGSubquestions.js

class GSGSubquestion extends TextType {
	constructor(text) {
		super(OLType.basic);

		this.findCodeWithSplit = function () {
			let prevCode = this.OL.getCode(this.OL.getLength()-1);
			let length = prevCode.length;
			if (isNaN(prevCode[length-1]) && !isNaN(prevCode.substring(0,length-1))) {
				return prevCode.substring(0,length-1);
			}
			return "";
		}

		this.setOptionListByLine = function (line, lineIndex) {
			let code = "";
			let content = "";
			const maxCodeIndex = 5;

			for (let letterCount = 0; letterCount < line.length - 1; letterCount++) {
				if (line[letterCount]=="\t") {
					code = line.substring(0,letterCount).trim().replace(/\./g,"");
					if (code.length==1 && isNaN(code)) {
						code = this.findCodeWithSplit() + code;
					}
					content = this.removeFirstBracket(line.substring(letterCount+1).trim());
					this.OL.addOption(content, code);
					return;
				} else if (letterCount > maxCodeIndex - 1) {
					break;
				}
			}


			this.OL.addOption(line, code);
		}

		this.addQToCode = function () {
			let code = "";
			for (let optionCount = 0; optionCount < this.OL.getLength(); optionCount++) {
				code = this.OL.getCode(optionCount);
				if (code!="") {
					this.OL.setCode(optionCount, "Q" + this.OL.getCode(optionCount));
				}
			}
		}

		this.format = function (text) {
			this.setOptionList(text);
			this.addQToCode();
		}


		this.format(text);

	}
}

