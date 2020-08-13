//textType.js

class TextType {
	constructor(dataType) {
		switch (dataType) {
			case OLType.EMCFav:
				this.OL = new ArrayWithProbeList(true);
				break;
			case OLType.arrayWithProbe:
				this.OL = new ArrayWithProbeList(false);
				break;
			default:
				this.OL = new OptionList();
				break;
		}

		this.setOptionList = function (text) {
			let line = "";
			let lineIndex = 0;
			for (let letterCount = 0; letterCount < text.length; letterCount++) {
				if (text[letterCount] == "\n") {
					this.setOptionListByLine(line.trim(), lineIndex);
					line = "";
					lineIndex++;
				} else {
					line += text[letterCount];
				}
			}
			if (line != "") {
				this.setOptionListByLine(line.trim(), lineIndex);
			}
		}

		this.removeFirstBracket = function (content) {
			let removed = "";
			if (content[0]!="(" && content[0]!="[") {
				return content;
			} else if (content[0]=="(") {
				removed = this.removeFirstRoundBracket(content);
			} else if (content[0]=="[") {
				removed = this.removeFirstSquareBracket(content);
			}

			return content == removed ? content : this.removeFirstBracket(removed);
		}

		this.removeFirstRoundBracket = function (content) {
			if (content[0]!="(") {
				return content;
			}

			for (let letterCount = 1; letterCount < content.length - 1; letterCount++) {
				if (content[letterCount] == ")") {
					return this.removeFirstRoundBracket(content.substring(letterCount + 1).trim());
				}
			}
			return content.trim();
		}

		this.removeFirstSquareBracket = function (content) {
			if (content[0] != "[") {
				return content;
			}

			for (let letterCount = 1; letterCount < content.length - 1; letterCount++) {
				if (content[letterCount] == "]") {
					return this.removeFirstSquareBracket (content.substring(letterCount + 1).trim());
				}
			}
			return content.trim();
		}

	}

	getOutput() {
		return this.OL.getOutputString();
	}

}
