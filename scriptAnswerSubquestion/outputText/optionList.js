// optionList.js

class OptionList extends OutputText {
	constructor() {
		super();
	}

	addOption(content, code="") {
		let contentCap = content.toUpperCase();
		if (contentCap == "OR") {
			return;
		} else if (contentCap.length <= 4 && contentCap.includes("OR")) {
			if (contentCap.substring(0,2) == "OR") {
				if (!isAlphabet(contentCap[2])) {
					return;
				}
			} else if (contentCap.substring(1,3) == "OR") {
				if (!isAlphabet(contentCap[0])) {
					return;
				} else if (contentCap.length > 3) {
					if (!isAlphabet(contentCap[3])) {
						return;
					}
				}
			} else {
				if (!isAlphabet(contentCap[1])) {
					return;
				}
			}
		}
		this.list.push(new Option(content, code));
	}

	removeOption(index) {
		if (this.list.length <= index) {
			return;
		}
		delete this.list[index];
		this.list.splice(index, 1);
	}

	// getOptions() {
	// 	return this.list;
	// }

	getLength() {
		return this.list.length;
	}

	hasContent(index) {
		if (this.list.length <= index) {
			return false;
		}
		return this.list[index].hasContent();
	}

	getContent(index) {
		if (this.listLength <= index) {
			return "";
		}
		return this.list[index].getContent();
	}

	setContent(index, content) {
		if (this.list.length <= index) {
			return;
		}
		this.list[index].setContent(content);
	}

	hasCode(index) {
		if (this.list.length <= index) {
			return false;
		}
		return this.list[index].hasCode();
	}

	getCode(index) {
		if (this.list.length <= index) {
			return "";
		}
		return this.list[index].getCode();
	}

	setCode(index, code) {
		if (this.list.length <= index) {
			return;
		}
		this.list[index].setCode(code);
	}

	getOutputString() {
		let output = "";

		if (this.list.length==0) {
			return "";
		}

		for (let optionCount = 0; optionCount < this.list.length; optionCount++) {
			if (!this.list[optionCount].hasContent()) {
				delete this.list[optionCount];
				this.list.splice(optionCount, 1);
				optionCount--;
			}
		}

		if (this.list.length==0) {
			return "";
		}

		output = this.list[0].getOutputString();

		for (let optionCount = 1; optionCount < this.list.length; optionCount++) {
			output += "\n" + this.list[optionCount].getOutputString();
		}

		return output;
	}
}
