//semicolon.js

class Semicolon extends Warning {
	constructor() {
		super();
	}

	addData(code, content) {
		let numSemicolon = content.split(";").length - 1;
		if (numSemicolon == 0) {
			return;
		}

		code = code.toString();
		if (this.data.hasOwnProperty(code)) {
			this.data[code] += numSemicolon;
		} else {
			this.data[code] = numSemicolon;
		}
	}

	getWarningAndReset() {
		const keys = Object.keys(this.data);
		let warning = "";
		let code = "";
		if (keys.length==0) {
			return "";
		}
		for (let propCount = 0; propCount < keys.length; propCount++) {
			code = keys[propCount];
			warning += code == "" ? "Unknown_Code" : code;
			warning += ": " + this.data[code] + " semicolon" + (this.data[code] > 1 ? "s" : "") + " found.";
			warning += propCount < keys.length - 1 ? "\n" : "";
		}

		this.reset();

		return warning;
	}
}
