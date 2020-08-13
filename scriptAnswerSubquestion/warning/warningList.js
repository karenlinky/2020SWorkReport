//warningList.js

class WarningList {
	constructor() {
		this.semicolon = new Semicolon();

		this.reset = function () {
			this.semicolon.reset();
		}
	}

	addData(code, content) {
		this.semicolon.addData(code, content);
	}

	getWarning() {
		let warning = this.semicolon.getWarningAndReset();
		return warning;
	}
}
