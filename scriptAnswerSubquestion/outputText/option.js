// option.js

class Option {
	constructor(content, code) {
		this.removePeriod = function(text) {
			return text.replace(/\./g, "");
		}

		this.removeDoubleSpace = function(text) {
			let editedText = "";
			let previousIsSpace = false;

			text = text.replace(/\t/g," ");
			for (let letterCount = 0; letterCount < text.length; letterCount++) {
				if (text[letterCount] == " ") {
					if (!previousIsSpace) {
						editedText += text[letterCount];
					}
					previousIsSpace = true;
				} else {
					editedText += text[letterCount];
					previousIsSpace = false;
				}
			}
			return editedText;
		}

		this.code = code.toString().trim();
		this.content = content.toString().trim();

		// this.code = this.removePeriod(code.toString().trim());
		// this.content = this.removeDoubleSpace(content.toString().trim());
	}

	hasContent() {
		return this.content!="";
	}

	getContent() {
		return this.content;
	}

	setContent(content) {
		this.content = this.removeDoubleSpace(content.toString().trim());
	}

	hasCode() {
		return this.code!="";
	}

	getCode() {
		return this.code;
	}

	setCode(code) {
		this.code = this.removePeriod(code.toString().trim());
	}

	getOutputString() {
		Warnings.addData(this.code, this.content);
		let code = this.removePeriod(this.code);
		let content = this.removeDoubleSpace(this.content);
		return code == "" ? content : code + ";" + content;
		// return this.code == "" ? this.content : this.code + ";" + this.content;
	}
}
