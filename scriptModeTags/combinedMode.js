//combinedMode.js

class CombinedMode {
	constructor () {
		this.optionList = [];

		this.addModeToListByOption = function(NewOption) {
			let Option;
			let code = NewOption.getCode();
			for (let optionCount = 0; optionCount < this.optionList.length; optionCount++) {
				Option = this.optionList[optionCount];
				if (Option.canAdd(code)) {
					this.optionList[optionCount].addOption(NewOption);
					return;
				}
			}
			this.optionList.push(new CombinedOption (NewOption));
		}
	}

	addModeToList(MT) {
		for (let optionCount = 0; optionCount < MT.getLength(); optionCount++) {
			this.addModeToListByOption(MT.getOption(optionCount));
		}

		for (let optionCount = 0; optionCount < this.optionList.length; optionCount++) {
			this.optionList[optionCount].resetOptionAdded();
		}
	}

	getOutput() {
		let output = "";
		for (let optionCount = 0; optionCount < this.optionList.length; optionCount++) {
			output += this.optionList[optionCount].getOutput();
			output += optionCount == this.optionList.length - 1 ? "" : "\n";
		}
		return output;
	}
}
