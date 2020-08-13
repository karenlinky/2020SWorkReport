//option.js

class Option {
	constructor (line) {
		this.code = "";
		this.content = line.trim();
		line = line.trim();

		if (!line.includes(";") && !line.includes("\t")) {
			return;
		}

		for (let letterCount = 1; letterCount < line.length - 1; letterCount++) {
			if (line[letterCount]==";" || line[letterCount]=="\t") {
				this.code = line.substring(0, letterCount).trim().replace(/\./gi, "");
				this.content = line.substring(letterCount+1).trim();
				break;
			}
		}
	}

	getCode() {
		return this.code;
	}

	getContent() {
		return this.content;
	}

	getOutput() {
		return this.content;
	}
}
