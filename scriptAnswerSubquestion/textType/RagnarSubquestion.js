// RagnarSubquestion.js

class RagnarSubquestion extends TextType {
	constructor(text, probe) {
		super(probe=="" ? OLType.basic : OLType.arrayWithProbe);

		this.findContent = function(line) {
			let content = line;
			const maxCodeIndex = 3;

			for (let letterCount = 0; letterCount < line.length - 2; letterCount++) {
				if (line.substring(letterCount, letterCount+2) == ".\t") {
					content = line.substring(letterCount + 2).trim();
					break;
				} else if (line[letterCount]=="\t" && letterCount < maxCodeIndex) {
					content = line.substring(letterCount + 1).trim();
					break;
				} else if (isWhiteSpace(line[letterCount])) {
					break;
				} else if (letterCount > maxCodeIndex - 1) {
					break;
				}
			}
			return content;
		}

		this.findCodeByInitial = function(content) {
			let code = "";
			let prevIsSpace = true;
			let enteredBracket = false;
			if (content.substring(0,4).toUpperCase()=="THE ") {
				content = content.substring(4);
			}
			for (let letterCount = 0; letterCount < content.length; letterCount++) {
				if (content[letterCount]=="(" || content[letterCount]=="[") {
					prevIsSpace = false;
					enteredBracket = true;
				} else if (content[letterCount]==")" || content[letterCount]=="]") {
					prevIsSpace = false;
					enteredBracket = false;
				} else if (prevIsSpace && !isWhiteSpace(content[letterCount])) {
					prevIsSpace = false;
					if (!enteredBracket && content[letterCount]!="<") {
						code += content[letterCount];
					}
				} else if (isWhiteSpace(content[letterCount])) {
					prevIsSpace = true;
				}
			}
			return code.toUpperCase();
		}

		this.setOptionListByLineArray = function(line, lineIndex) {
			let code = "";
			let content = this.findContent(line);
			// const maxCodeIndex = 3;

			// for (let letterCount = 0; letterCount < line.length - 2; letterCount++) {
			// 	if (line.substring(letterCount, letterCount+2) == ".\t") {
			// 		content = line.substring(letterCount + 2).trim();
			// 		break;
			// 	} else if (line[letterCount]=="\t" && letterCount < maxCodeIndex) {
			// 		content = line.substring(letterCount + 1).trim();
			// 		break;
			// 	} else if (isWhiteSpace(line[letterCount])) {
			// 		break;
			// 	} else if (letterCount > maxCodeIndex - 1) {
			// 		break;
			// 	}
			// }

			code = this.findCodeByInitial(content.trim());

			this.OL.addOption(content, code);
		}

		this.findCode = function(line, content) {
			let code = line.substring(0,line.length - content.length);
			return code.replace(/\./gi, "").trim();
		}

		this.setOptionListByLineRadios = function(line, lineIndex) {
			let probe = this.probe;
			let content = this.findContent(line);
			let code = content == line ? "" : this.findCode(line, content);

			this.OL.addOption(content, probe, code);
		}



		this.setOptionListByLine = function (line, lineIndex) {
			if (this.type == OLType.basic) {
				this.setOptionListByLineArray (line, lineIndex);
			} else if (this.type == OLType.arrayWithProbe) {
				this.setOptionListByLineRadios (line, lineIndex);
			}
		}

		this.format = function (text) {
			this.setOptionList(text);
		}

		this.probe = probe;
		this.type = probe=="" ? OLType.basic : OLType.arrayWithProbe;
		this.format(text);

	}
}
