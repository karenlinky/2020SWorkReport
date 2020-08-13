// noTag.js

class NoTag extends Mode{
	constructor(Option) {
		super (Option);
	}

	getOutput(showTags) {
		return this.Option.getOutput();
	}
}
