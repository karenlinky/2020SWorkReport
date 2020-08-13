// text.js

class Text extends Mode{
	constructor(Option) {
		super (Option);
	}

	getOutput(showTags) {
		return showTags ? "<t-o>" + this.Option.getOutput() + "</t-o>" : this.Option.getOutput();
	}
}
