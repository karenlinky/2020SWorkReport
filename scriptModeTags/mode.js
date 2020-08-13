// mode.js

class Mode {
	constructor(Option) {
		this.Option = Option;
	}

	getCode() {
		return this.Option.getCode();
	}

	getContent() {
		return this.Option.getContent();
	}
}
