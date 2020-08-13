//modeText.js

class ModeText {
	constructor (mode, text) {
		// this.mode = mode;
		this.optionList = [];

		this.setOptionListByLine = function(mode, line) {
			if (line == "") {
				return;
			}

			switch (mode) {
				case value.phone:
				this.optionList.push(new Phone (new Option(line)));
				break;
				case value.emailText:
				this.optionList.push(new EmailText (new Option(line)));
				break;
				case value.email:
				this.optionList.push(new Email (new Option(line)));
				break;
				case value.text:
				this.optionList.push(new Text (new Option(line)));
				break;
				case value.none:
				this.optionList.push(new NoTag (new Option(line)));
				break;
			}
			// this.optionList.push(new Phone (new Option(line)));
		}


		this.setOptionList = function(mode, text) {
			let line = "";

			for (let letterCount = 0; letterCount < text.length; letterCount++) {
				if (text[letterCount]=="\n") {
					this.setOptionListByLine(mode, line.trim());
					line = "";
				} else {
					line += text[letterCount];
				}
			}

			if (line != "") {
				this.setOptionListByLine(mode, line.trim());
			}
		}

		this.setOptionList (mode, text);
	}

	getLength() {
		return this.optionList.length;
	}

	getOption(index) {
		if (index >= this.optionList.length) {
			return;
		}
		return this.optionList[index];
	}

	// getCode(index) {
	// 	if (index >= this.optionList.length) {
	// 		return "";
	// 	}
	// 	return this.optionList[index].getCode();
	// }
}
