// arrayWithProbeList

class ArrayWithProbeList extends OutputText {
	constructor(isEMCFavor) {
		super();
		this.isEMCFavor = isEMCFavor;
	}

	addOption(content, probe, code) {
		this.list.push(new ArrayWithProbe(content, probe, code));

		if (this.isEMCFavor) {
			this.list.push(new EMCFav(content, code));
		}
	}

	getOutputString() {
		let output = "";
		let code = "";
		if (this.list.length == 0) {
			return "";
		}

		for (let optionCount = 0; optionCount < this.list.length; optionCount++) {
			code = this.list[optionCount].getCode();
			if (this.isEMCFavor) {
				output += "---Q" + code;
				output += optionCount % 2 == 0 ? "A---\n" : "B---\n";
				output += this.list[optionCount].getOutputString();
				output += optionCount % 2 == 0 ? "\n\n" : "\n\n\n\n\n";
			} else {
				output += "---Q" + code + "---\n";
				output += this.list[optionCount].getOutputString();
				output += "\n\n\n\n\n"
			}
		}
		return output;
	}
}
