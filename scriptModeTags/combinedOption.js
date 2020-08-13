//combinedOption.js

class CombinedOption {
	constructor (NewOption) {
		this.code = NewOption.getCode();
		this.optionAdded = true;
		this.optionList = [NewOption];

		this.checkSameOptionText = function() {
			if (this.optionList.length == 0) {
				return true;
			}
			return !this.optionList.some((Option) => Option.getContent() != this.optionList[0].getContent());
		}
	}

	// compareCode(code) {
	// 	return this.code == code;
	// }

	resetOptionAdded() {
		this.optionAdded = false;
	}

	// getOptionAdded() {
	// 	return this.optionAdded;
	// }

	canAdd(code) {
		return this.code == code && !this.optionAdded;
	}

	addOption(Option) {
		this.optionList.push(Option);
		this.optionAdded = true;
	}

	getOutput() {
		let output = this.code == "" ? "" : this.code + ";";
		let showTags = !this.checkSameOptionText();

		if (!showTags) {
			output += this.optionList[0].getOutput(false);
			return output;
		}

		for (let optionCount = 0; optionCount < this.optionList.length; optionCount++) {
			output += this.optionList[optionCount].getOutput(true);
		}
		return output;
	}
}
